import {Diary} from 'diary/diary';
import {AuthenticationService as AuthenticationServiceClass} from '../services/AuthenticationService';
import UserServiceClass from '../services/UserService';
import {AUTH_EVENTS} from '../services/AuthenticationService';
var modalInstance;

class LoginController {

    constructor($scope, $rootScope, growl, $modal, $state, UserService:UserServiceClass, AuthenticationService:AuthenticationServiceClass) {
        this.$rootScope = $rootScope;
        this.growl = growl;
        this.logger = Diary.logger('LoginController');
        this.$modal = $modal;
        this.$state = $state;
        this.UserService = UserService;
        this.AuthenticationService = AuthenticationService;

        this.loginDialogOpened = false;

        $scope.$on(AUTH_EVENTS.notAuthenticated, () => {
            //Prevent multiple login dialog popups when multiple 401 events fired.
            if (!this.loginDialogOpened) {
                this.growl.warning('LOGIN_REQUIRED');
                UserService.clear();
                $state.go('home');
                this.login();
            }
        });

        $scope.$on(AUTH_EVENTS.sessionTimeout, () => {
            //Prevent multiple login dialog popups when multiple sessionTimeout events fired.
            if (!this.loginDialogOpened) {
                this.growl.warning('SESSION_TIMEOUT');
                UserService.clear();
                $state.go('home');
                this.login();
            }
        });

        // when user not logged-in or has no permission
        $scope.$on(AUTH_EVENTS.notAuthorized, () => {
            //Prevent multiple login dialog popups when multiple 403 events fired.
            if (!this.loginDialogOpened) {
                growl.error('You are not authorized to access this page');
                this.login();
            }
        });

        $scope.$on(AUTH_EVENTS.loginSuccess, () => {
            this.growl.success('LOGIN_SUCCESS');
            console.log('destination State', $scope.destinationState);
            // redirect to view that is requested before 401/403 error occurred.
            // https://github.com/witoldsz/angular-http-auth/issues/46
            if ($scope.destinationState) {
                this.logger.info(`redirecting to destination: ${$scope.destinationState.state.name}`);
                $state.go($scope.destinationState.state.name, $scope.destinationState.stateParams);
            }
        });

        $scope.$on(AUTH_EVENTS.loginCancelled, () => {
            this.growl.warning('LOGIN_CANCELLED');
        });

        $scope.$on(AUTH_EVENTS.logoutSuccess, () => {
            this.growl.warning('LOGOUT_SUCCESS');
            this.$state.go('home');
        });

    }

    // TODO move these three methods to a directive
    isLoggedIn() {
        return this.UserService.isLoggedIn();
    }

    getUsername() {
        return this.UserService.getUsername();
    }

    getCurrentUser() {
        return this.UserService.currentUserFromCache();
    }

    login() {
        modalInstance = this.$modal.open({
            templateUrl: 'views/common/login.html',
            controller: 'LoginModalController',
            backdrop: true,
            keyboard: true,
            windowClass: 'modal-login'
        });

        modalInstance.opened.then(() => {
            this.logger.info('Login modal opened');
            this.loginDialogOpened = true;
        });

        modalInstance.result.then((result) => {
            this.logger.warn(`got result: ${result} from LoginModalController...`);
            this.loginDialogOpened = false;
        }).catch(err => {
            this.logger.warn('login Modal dismissed', err);
            this.loginDialogOpened = false;
        });
    }

    logout() {
        this.logger.warn('in logout');
        this.AuthenticationService.logout()
            .then(() => {
                this.AuthenticationService.logoutSuccess();//TODO can we pass this event internally to AuthenticationService?
            })
            .catch((err)  => {
                this.logger.error(err);
                this.growl.error(`${err.config.url} not accessible`, {ttl: 8000});
            });
    }

}

class LoginModalController {

    constructor($scope, growl, AuthenticationService) {
        this.$scope = $scope;
        this.growl = growl;
        this.logger = Diary.logger('LoginModalController');
        this.AuthenticationService = AuthenticationService;
        // Define the initial form data.
        this.$scope.credentials = { //TODO: formAutofillFix for angular forms!
            username: '',
            password: '',
            rememberMe: false
        };
    }

    submit(credentials) {
        this.AuthenticationService.login(credentials).
            then((result) => {
                this.AuthenticationService.loginSuccess(); //TODO can we pass this event internally to AuthenticationService?
                modalInstance.close(result);
            }).
            catch((err)  => {
                this.logger.error(err);
                this.growl.error(err.message, {ttl: 8000});
            });
    }

    cancel() {
        this.AuthenticationService.loginCancelled();
        modalInstance.dismiss('cancel');
    }

}

export { LoginController, LoginModalController };
