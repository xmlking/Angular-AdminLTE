//- app/modules/common/index.js
import routes from './routes';
import {LoginController,LoginModalController} from './controllers/LoginController';
import HeaderController from './controllers/HeaderController';
import SettingsController from './controllers/SettingsController';
import {AUTH_CONFIG, AUTH_EVENTS, AuthenticationService} from './services/AuthenticationService';
import {AuthorizationService} from './services/AuthorizationService';
import UserService from './services/UserService';
import hasPermission from './elements/hasPermission';
import AuthInterceptor from './utils/AuthInterceptor';
import {EBUS_CONFIG, EventBus} from '../reactive/EventBus';
import {BackoffStrategy, Retry} from '../resiliency/Retry';
import {isProxySupported} from './utils/util';

let moduleName = 'analyticsApp.common';
let commonModule = angular.module(moduleName,
  [
    // 3rd party modules
    'http-auth-interceptor-buffer'
  ]);

commonModule.service('UserService', UserService);
commonModule.service('AuthenticationService', AuthenticationService);
commonModule.service('AuthorizationService', AuthorizationService);
//commonModule.factory('AuthInterceptor',AuthInterceptor);
commonModule.service('$eventBus', EventBus);

commonModule.directive('hasPermission',hasPermission);
commonModule.controller('HeaderController', HeaderController);
commonModule.controller('LoginController', LoginController);
commonModule.controller('LoginModalController', LoginModalController);
commonModule.controller('SettingsController', SettingsController);

commonModule.config(routes);
commonModule.config( ($httpProvider) => {
  'use strict';

  $httpProvider.interceptors.push(AuthInterceptor);
  //$httpProvider.responseInterceptors.push('AuthInterceptor');

  AUTH_CONFIG.BASE_URL = 'http://ve7d00000010:8080/apiApp';
  AUTH_CONFIG.LOGIN_URL = AUTH_CONFIG.BASE_URL + '/j_spring_security_check';
  AUTH_CONFIG.LOGOUT_URL = AUTH_CONFIG.BASE_URL + '/logout';
  AUTH_CONFIG.PROFILE_URL = AUTH_CONFIG.BASE_URL + '/login/currentUser';

  EBUS_CONFIG.BASE_URL = 'http://ve7d00000010:8080/apiApp/stomp';
});

commonModule.run(($rootScope, $eventBus) => {
  'use strict';

  var eventBus =  $eventBus;

  if(isProxySupported()) {
    // retryableEventBus with Reflect API
    // ***only works with firefox & Chrome < v38 as of now***
    //TODO eventBus = Retry.proxify($eventBus);
  }

  if (typeof Object.observe === 'function') {
    Object.observe(eventBus, (changes)=> {
      $rootScope.$apply();  //notify readyState watchers
    }, ['update']);
  } else {
    console.warn('O.o() not supported');
  }

  let onDisconnectListener = error => {
    console.log('in onDisconnectListener - Error: ',error);
    console.error(`SockJS closed.........readyState: ${eventBus.readyState.description}` );
    console.info(`Attempting to reconnect`);
    eventBus.open(true,onDisconnectListener);
  };

  let openConnection  = () =>
    eventBus.open(true,onDisconnectListener)
      .catch( (error) => { console.error( 'Error: ', error); });

  // reconnect STOMP client after loginSuccess, to get new authenticated connection.
  $rootScope.$on(AUTH_EVENTS.loginSuccess , () => {
    eventBus.close()
      .then((msg) => {console.log('reconnection STOMP after loginSuccess');})
      .then(openConnection);
  });

  // STOMP connection will be closed automatically when user logout.
  // but when `onDisconnectListener` is used, it reconnect automatically.
  // Manually closing STOMP connections ensures there will be no tangling WebSocket connections to server.
  $rootScope.$on(AUTH_EVENTS.logoutSuccess, () => {
    eventBus.close();
  });

  // auto open
  openConnection();


});

export default moduleName;
