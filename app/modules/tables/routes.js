//- app/modules/tables/routes.js
export default function routes($stateProvider) {
  'use strict';

  return $stateProvider
    .state('root.tables', {
      url: '/tables',
      abstract: true,
      content: {
        title: 'Tables'
      }
    })
    .state('root.tables.simple', {
      url: '/simple',
      content: {
        title: 'Simple Tables',
        subtitle: 'preview of simple tables'
      },
      views: {
        "@root": {
          templateUrl: "modules/tables/partials/simple.html"
        }
      }
    })
    .state('root.tables.data', {
      url: '/data',
      content: {
        title: 'Data Tables',
        subtitle: 'advanced tables'
      },
      views: {
        "@root": {
          templateUrl: "modules/tables/partials/data.html"
        }
      }
    });
}
