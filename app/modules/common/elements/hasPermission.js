'use strict';
import {AUTH_EVENTS} from '../services/AuthenticationService';

export default function hasPermission(AuthorizationService) {
	return {
		link: function(scope, element, attrs) {

			if(!angular.isString(attrs.hasPermission)) {
				throw 'hasPermission value must be a string';
			}

			var value = attrs.hasPermission.trim();
			var notPermissionFlag = value[0] === '!';
			if(notPermissionFlag) {
				value = value.slice(1).trim();
			}

			function toggleVisibilityBasedOnPermission() {
				var hasPermission = AuthorizationService.isAuthorized(value);

				if(hasPermission && !notPermissionFlag || !hasPermission && notPermissionFlag) {
					(element[0].tagName === 'DIV') ? element.removeClass('ng-hide') : element.removeClass('disabled');
					//element.removeClass('disabled');
				}
				else {
					(element[0].tagName === 'DIV') ? element.addClass('ng-hide') : element.addClass('disabled');
					//element.addClass('disabled');
				}
			}
			toggleVisibilityBasedOnPermission();
			scope.$on(AUTH_EVENTS.loginSuccess, toggleVisibilityBasedOnPermission);
			scope.$on(AUTH_EVENTS.notAuthenticated, toggleVisibilityBasedOnPermission);
			scope.$on(AUTH_EVENTS.logoutSuccess, toggleVisibilityBasedOnPermission);
		}
	};
}