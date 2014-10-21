//- app/modules/common/routes.js
export default function routes($urlRouterProvider, $stateProvider) {
  'use strict';

  return $stateProvider
    .state('root',{
      abstract: true,
      content: {
        title: 'Home1'
      },
      views:{
        "": {
          templateUrl: "modules/common/partials/main.html"
        },
        "header": {
          templateUrl: "modules/common/partials/header.html",
          controller: 'HeaderController as hc'
        },
        "sidebar": {
          templateUrl: "modules/common/partials/sidebar.html"
        }
      }
    })
    .state('root.settings', {
      url: '/settings',
      access: {allowAnonymous: false},
      templateUrl: 'modules/common/partials/settings.html',
      controller: 'SettingsController as sc',
      content: {
        title: 'Settings',
        subtitle: 'User settings'
      }
    });

}
