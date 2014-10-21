/**
 * Stubbing of HTTP requests for backend-less frontend testing
 */
import 'angular-mocks';

import 'text!../../test/fixtures/sumo_profile.json';
import 'text!../../test/fixtures/businessadmin_profile.json';
import 'text!../../test/fixtures/itadmin_profile.json';
import 'text!../../test/fixtures/dataadmin_profile.json';

import {EBUS_CONFIG} from './reactive/EventBus';

let moduleName = 'analyticsApp.test.env';
let testEnvModule = angular.module(moduleName, ['ngMockE2E']);

testEnvModule.config( () => {
    'use strict';
    console.log('in testEnvModule... ');
    EBUS_CONFIG.BASE_URL = 'http://localhost:8080/apiApp/stomp';
});

testEnvModule.run( ($httpBackend) => {
    'use strict';
    console.log('in testEnvModule... ');
    // Do your mock
    $httpBackend.whenPOST(/\http:\/\/ve7d00000010:8080\/apiApp\/j_spring_security_check/)
        .respond( (method, url, data, headers) => {
            console.log('Received data',method, url, data, headers);
            if(data.contains('j_username=sumo&j_password=demo')) {
                window.username = 'sumo'; // use ngCookies and   $cookies.sessionId = "1234567";?
                return [200, {success: true, username: 'sumo'}];
            } else if(data.contains('j_username=businessadmin&j_password=businessadmin')) {
                window.username = 'businessadmin';
                return [200, {success: true, username: 'businessadmin'}];
            } else if(data.contains('j_username=itadmin&j_password=itadmin')) {
                window.username = 'itadmin';
                return [200, {success: true, username: 'itadmin'}];
            } else if(data.contains('j_username=dataadmin&j_password=dataadmin')) {
                window.username = 'dataadmin';
                return [200, {success: true, username: 'dataadmin'}];
            } else {
                return [200, {error: 'Sorry, we were not able to find a user with that username and password.'}];
            }
        });

    $httpBackend.whenGET(/\http:\/\/ve7d00000010:8080\/apiApp\/login\/currentUser/)
        .respond( (method, url) => {
            console.log('Received URL',url);
            console.log('window.username',window.username);

            if(window.username === 'sumo') {
                return [200, require('text!../../test/fixtures/sumo_profile.json')];
            } else if(window.username === 'businessadmin') {
                return [200, require('text!../../test/fixtures/businessadmin_profile.json')];
            } else if(window.username === 'itadmin') {
                return [200, require('text!../../test/fixtures/itadmin_profile.json')];
            } else if(window.username === 'dataadmin') {
                return [200, require('text!../../test/fixtures/dataadmin_profile.json')];
            } else {
                return [200, {error: 'Sorry, we were not able to find a user with that username and password.'}];
            }
        });

    $httpBackend.whenPOST(/\http:\/\/ve7d00000010:8080\/apiApp\/logout/)
        .respond( () => {
            window.username = undefined;
            return [200, {}];
        });

    // Don't mock the html views
    $httpBackend.whenGET(/views\/\w+.*/).passThrough();

    // For everything else, don't mock
    $httpBackend.whenJSONP('http://www.telize.com/geoip?callback=JSON_CALLBACK').passThrough();
    $httpBackend.whenGET(/^\w+.*/).passThrough();
    $httpBackend.whenPOST(/^\w+.*/).passThrough();
});

export default moduleName;
