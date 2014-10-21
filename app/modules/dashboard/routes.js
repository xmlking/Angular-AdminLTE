//- app/modules/dashboard/routes.js
export default function routes($stateProvider) {
  'use strict';

  return $stateProvider
    .state('root.dashboard', {
      url: '/dashboard',
      access: {allowAnonymous: true},
      templateUrl: 'modules/dashboard/partials/dashboard.html',
      controller: 'DashboardController as dc',
      content: {
        title: 'Dashboard',
        subtitle: 'Control panel'
      }
    })
    .state('root.widgets', {
      url: '/widgets',
      templateUrl: 'modules/dashboard/partials/widgets.html',
      content: {
        title: 'Widgets',
        subtitle: 'Preview page'
      }
    })
    .state('root.calendar', {
      url: '/calendar',
      templateUrl: 'modules/dashboard/partials/calendar.html',
      content: {
        title: 'Calendar',
        subtitle: 'Control panel'
      }
    })
    .state('root.mailbox', {
      url: '/mailbox',
      templateUrl: 'modules/dashboard/partials/mailbox.html',
      content: {
        title: 'Mailbox',
        subtitle: 'mail page'
      }
    });
}
