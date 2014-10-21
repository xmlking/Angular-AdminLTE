'use strict';
import  {serialize} from '../../common/utils/util';

export const AUTH_CONFIG =
{
    //Overwrite them in app.config() in app.js
    BASE_URL: 'http://localhost:8080/<YourBaaS>',
    LOGIN_URL: 'http://localhost:8080/<YourBaaS>/j_spring_security_check',
    LOGOUT_URL: 'http://localhost:8080/<YourBaaS>/logout',
    PROFILE_URL: 'http://localhost:8080/<YourBaaS>/login/currentUser'
};

export const AUTH_EVENTS =
	{
		loginSuccess: 'auth-login-success',
		loginFailed: 'auth-login-failed',
		loginCancelled: 'auth-login-cancelled',
		logoutSuccess: 'auth-logout-success',
		sessionTimeout: 'auth-session-timeout',
		notAuthenticated: 'auth-not-authenticated',
		notAuthorized: 'auth-not-authorized'
	};

export class AuthenticationService {

	constructor($q, $http, $sanitize, UserService, $rootScope, httpBuffer) {
		this.$q = $q;
		this.$http = $http;
		this.$sanitize = $sanitize;
		this.UserService = UserService;
		this.$rootScope = $rootScope;
		this.httpBuffer = httpBuffer;
	}

	_sanitizeCredentials(credentials) {
		return {
			j_username: this.$sanitize(credentials.username),
			j_password: this.$sanitize(credentials.password),
			_spring_security_remember_me: credentials.rememberMe,
			ajax: true
		};
	}

	login(credentials) {

		this.UserService.clear();
		//Parametrize params from json
		let transformRequest = data => {
			return serialize(data); //return $.param(data);
		};
        let headers = { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'};
		let _login = this.$http.post(AUTH_CONFIG.LOGIN_URL, this._sanitizeCredentials(credentials), {timeout: 10000, headers: headers, transformRequest: transformRequest});

		var promise = new Promise((resolve, reject) => {
			_login.success((data, status, headers, config) => { // jshint unused: false
				/*data: {success: true, username: 'admin'} or
				 {error: 'Sorry, we were not able to find a user with that username and password.'}*/
				if (data.hasOwnProperty('error')) {
					reject(new Error(data.error));
				} else {
                    // no error , lets set auth status and pre-populate userProfile.
                    this.UserService.currentUser().then( (user) => {
                        resolve(true);
                    });
                }
			}).error((data, status, headers, config) => {// jshint unused: false
				reject(new Error(data));
			});
		});
		return this.$q.when(promise);
	}

	logout() {
		return this.$http({ method: 'POST', url: AUTH_CONFIG.LOGOUT_URL, params: {'ajax': true}});
	}

	/**
	 * Call this function to indicate that authentication was successful and trigger a
	 * retry of all deferred requests.
	 * @param data an optional argument to pass on to $broadcast which may be useful for
	 * example if you need to pass through details of the user that was logged in
	 */
	loginSuccess(data, configUpdater) {
		var updater = configUpdater || function(config) {return config;};
		this.$rootScope.$broadcast(AUTH_EVENTS.loginSuccess, data);
		this.httpBuffer.retryAll(updater);
	}

	logoutSuccess(data) {
		this.UserService.clear();
		this.$rootScope.$broadcast(AUTH_EVENTS.logoutSuccess, data);
	}

	/**
	 * Call this function to indicate that authentication should not proceed.
	 * All deferred requests will be abandoned or rejected (if reason is provided).
	 * @param data an optional argument to pass on to $broadcast.
	 * @param reason if provided, the requests are rejected; abandoned otherwise.
	 */
	loginCancelled(data, reason) {
		this.httpBuffer.rejectAll(reason);
		this.$rootScope.$broadcast(AUTH_EVENTS.loginCancelled, data);
	}

	notAuthorized(data) {
		this.$rootScope.$broadcast(AUTH_EVENTS.notAuthorized, data);
	}

	notAuthenticated(data) {
		this.$rootScope.$broadcast(AUTH_EVENTS.notAuthenticated, data);
	}

}




