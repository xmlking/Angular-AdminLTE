/**
 * AuthInterceptor Factory
 * 401 Unauthorized — The user is not logged in
 * 403 Forbidden — The user is logged in but isn’t allowed access
 * 419 Authentication Timeout (non standard) — Session has expired
 * 440 Login Timeout (Microsoft only) — Session has expired
 * @returns {{responseError: responseError}}
 */
import {AUTH_EVENTS} from '../services/AuthenticationService';

export default function AuthInterceptor($rootScope, $q, httpBuffer) {
	'use strict';
	return {
		responseError: function (rejection) {
			if (rejection.status === 401 && !rejection.config.ignoreAuthModule) {
				let deferred = $q.defer();
				httpBuffer.append(rejection.config, deferred);
				//$rootScope.$broadcast(AUTH_EVENTS.loginRequired, rejection);
				$rootScope.$broadcast(AUTH_EVENTS.notAuthenticated, rejection);
				return deferred.promise;
			}
			if (rejection.status === 419 || rejection.status === 440) {
				$rootScope.$broadcast(AUTH_EVENTS.sessionTimeout, rejection);
			}
			if (rejection.status === 403 && !rejection.config.ignoreAuthModule) {
				let deferred2 = $q.defer();
				httpBuffer.append(rejection.config, deferred2);
				$rootScope.$broadcast(AUTH_EVENTS.notAuthorized, rejection);
				return deferred2.promise;
			}
			// otherwise, default behaviour
			return $q.reject(rejection);
		}
	};
}

