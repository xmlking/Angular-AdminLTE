import {AUTH_CONFIG} from './common/services/AuthenticationService';
import {EBUS_CONFIG} from './reactive/EventBus';

let moduleName = 'analyticsApp.dev.env';
let devEnvModule = angular.module(moduleName, []);

devEnvModule.config( () => {
    'use strict';
    console.log('in devEnvModule... ');
    AUTH_CONFIG.BASE_URL = 'http://localhost:8080/apiApp';
    AUTH_CONFIG.LOGIN_URL = AUTH_CONFIG.BASE_URL + '/j_spring_security_check';
    AUTH_CONFIG.LOGOUT_URL = AUTH_CONFIG.BASE_URL + '/logout';
    AUTH_CONFIG.PROFILE_URL = AUTH_CONFIG.BASE_URL + '/login/currentUser';
    EBUS_CONFIG.BASE_URL = 'http://localhost:8080/apiApp/stomp';
});

export default moduleName;
