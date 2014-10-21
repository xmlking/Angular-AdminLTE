import {AUTH_CONFIG} from './AuthenticationService';
import {Diary} from 'diary/diary';

const USER_KEY = '_currentUser';
const IS_LOGGED_IN = '_isLoggedIn';
const USERNAME = '_username';

const _userCache = Symbol('user', true);

export default class UserService {

	constructor($q, $log, Restangular, DSCacheFactory) {
		this.$q = $q;
		this.Restangular = Restangular;
        this.logger = Diary.logger('UserService');

		this[_userCache] = new DSCacheFactory('userCache', {
			capacity: 5, // This cache can hold 5 items
			storageMode: 'sessionStorage', // This cache will sync itself with sessionStorage
			verifyIntegrity: true  // Full synchronization with sessionStorage on every operation
		});
	}

	currentUser() {
		var promise = new Promise((resolve, reject) => {
            this.logger.info('in currentUser');
			let _currentUser = this[_userCache].get(USER_KEY);
			if (_currentUser) {
				resolve(_currentUser);
			} else {
                this.Restangular.oneUrl('UserProfile', AUTH_CONFIG.PROFILE_URL).get().then(userProfile => {
//                this.Restangular.one('login', 'currentUser').get().then(user => {
					this[_userCache].put(IS_LOGGED_IN, true);
					this[_userCache].put(USER_KEY, userProfile);
					this[_userCache].put(USERNAME, userProfile.username);
					resolve(userProfile);
				}).catch(err => {
                    this.logger.error(err);
					reject(err);
				});
			}
		});
		//need to wrap in $q.when as we are sending ES6 promise.
		//$q.then method automatically triggers the angular digest cycle where "ES6 promise is not"
		return this.$q.when(promise);
	}

	currentUserFromCache() {
		return this[_userCache].get(USER_KEY);
	}

	isLoggedIn() {
		return this[_userCache].get(IS_LOGGED_IN) || false;
	}

	getUsername() {
		return this[_userCache].get(USERNAME) || false;
	}

	/**
	 * destroy session
	 */
	clear() {
		this[_userCache].removeAll();
	}

}
