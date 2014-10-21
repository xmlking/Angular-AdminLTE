//- app/modules/charts/routes.js
export default function routes($urlRouterProvider, $stateProvider) {
  'use strict';

  return $stateProvider
    .state('root.charts', {
      url: '/charts',
      abstract: true,
      content: {
        title: 'Charts'
      }
    })
    .state('root.charts.morris', {
      url: '/morris',
      content: {
        title: 'Morris Charts',
        subtitle: 'Preview sample'
      },
      views: {
        "@root": {
          templateUrl: "modules/charts/partials/morris.html"
        }
      }
    })
    .state('root.charts.flot', {
      url: '/flot',
      content: {
        title: 'Flot Charts',
        subtitle: 'Preview sample'
      },
      views: {
        "@root": {
          templateUrl: "modules/charts/partials/flot.html"
        }
      }
    })
    .state('root.charts.inline', {
      url: '/inline',
      content: {
        title: 'Inline Charts',
        subtitle: 'multiple types of charts'
      },
      views: {
        "@root": {
          templateUrl: "modules/charts/partials/inline.html"
        }
      }
    });
}
