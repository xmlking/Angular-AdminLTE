//- app/modules/app.js
/**
 * loads sub modules and wraps them up into the main module
 * this file should be used for top-level module definitions only
 */

import './vendor';
import {Diary} from 'diary/diary';
import {ConsoleReporter} from 'diary/reporters/console';

import commonModule from './common/index';
import homeModule from './home/index';
import dashboardModule from './dashboard/index';
import chartsModule from './charts/index';
import uiModule from './UI/index';
import formsModule from './forms/index';
import tablesModule from './tables/index';
import examplesModule from './examples/index';

// @if env='TEST'
import testEnvModule from './test.env';
// @endif
// @if env='DEV'
import devEnvModule from './dev.env';
// @endif
// @if optimize
import templateModule from './templates';
// @endif


let mainModule = angular.module('analyticsApp',
  [
    // 3rd party modules
    'ui.router',
    'ui.bootstrap',
    'ngAnimate',
    'ngSanitize',
    'restangular',
    'angularMoment',
    'angular-growl',
    'angular-loading-bar',
    'angular-data.DSCacheFactory',

     // App sub-modules
    commonModule,
    homeModule,
    dashboardModule,
    chartsModule,
    uiModule,
    formsModule,
    tablesModule,
    examplesModule
  ]);

mainModule.config(($stateProvider, $urlRouterProvider, growlProvider, $httpProvider, DSCacheFactoryProvider) => {
    'use strict';

    // enable html5Mode for pushstate ('#'-less URLs)
    // $locationProvider.html5Mode(true);

    $httpProvider.defaults.withCredentials = true;
    $httpProvider.defaults.useXDomain = true;
    delete $httpProvider.defaults.headers.common['X-Requested-With'];

    // This sets a global timeout for growl messages.
    growlProvider.globalTimeToLive({success: 2000, error: 5000, warning: 2000, info: 2000});
    //growlProvider.globalEnableHtml(true);

    // optionally set cache defaults
    DSCacheFactoryProvider.setCacheDefaults({
        maxAge: 3600000,
        deleteOnExpire: 'aggressive'
    });

    // Logger
    Diary.reporter( new ConsoleReporter({
        console: window.console
    }));

});

mainModule.run(($rootScope, $http, $log, growl, $state, $stateParams, DSCacheFactory, AuthenticationService, AuthorizationService) => {
    'use strict';

    console.table(DSCacheFactory.info());

    // Create default cache
    new DSCacheFactory('defaultCache', {
        maxAge: 900000, // Items added to this cache expire after 15 minutes.
        cacheFlushInterval: 6000000, // This cache will clear itself every hour.
        deleteOnExpire: 'aggressive' // Items will be deleted from this cache right when they expire.
    });
    //$http.defaults.cache = DSCacheFactory.get('defaultCache');

    $rootScope.$state = $state;
    $rootScope.$stateParams = $stateParams;

    // To access Underscore (Lodash) globally including templates
    $rootScope._ = window._;

    $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {
        // angular.element('#spinner').removeClass('heartbeat').addClass('spinner');

        //For redirecting to view that is requested before 401/403 error fired.
        $rootScope.destinationState = {state: toState, stateParams: toParams};
        //To be used for UI back button //won't work when page is reloaded.
        $rootScope.previousState = {state: fromState, stateParams: fromParams};

        let allowAnonymous = (
            typeof toState.access === 'undefined' ||
            typeof toState.access.allowAnonymous === 'undefined') ? true : toState.access.allowAnonymous;

        if (!allowAnonymous) {
            let authorizedRoles = toState.access.roles;
            if (!AuthorizationService.isAuthorized(authorizedRoles)) {
                event.preventDefault();
                if (AuthorizationService.isAuthenticated()) {
                    // user is not allowed
                    AuthenticationService.notAuthorized();
                } else {
                    // user is not logged in
                    AuthenticationService.notAuthenticated();
                }
                return;
            }
        }
        //has to be last statement in this event handler.
        $rootScope.spinner = true;
    });

    $rootScope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) { // jshint unused: false
        $rootScope.spinner = false;
        $rootScope.destinationState = false;

    });

    $rootScope.$on('$stateChangeError', function (event, toState, toParams, fromState, fromParams, error) {
        growl.error('State changed error :( =', {ttl: 10000});
        $log.error('Some service has failed: ', error.config ? error.config.url : error);
        // angular.element('#spinner').removeClass('spinner').addClass('heartbeat');
    });

    // back button function called from back button's ng-click='back()'
    $rootScope.back = function () {
        $state.go($rootScope.previousState.state.name, $rootScope.previousState.stateParams);
        $rootScope.previousState = false;
    };
});

//remaining App sub-modules
//mainModule.requires.push(experimentsModule);

// @if env='TEST'
mainModule.requires.push(testEnvModule);
// @endif
// @if env='DEV'
mainModule.requires.push(devEnvModule);
// @endif
// @if optimize
mainModule.requires.push('templates');
// @endif


export default mainModule;
