//- app/modules/examples/routes.js
export default function routes($stateProvider) {
  'use strict';

  return $stateProvider
    .state('root.examples', {
      url: '/examples',
      abstract: true,
      content: {
        title: 'Examples'
      }
    })
    .state('root.examples.invoice', {
      url: '/invoice',
      content: {
        title: 'Invoice',
        subtitle: '#007612'
      },
      views: {
        "@root": {
          templateUrl: "modules/examples/partials/invoice.html"
        }
      }
    })
    .state('root.examples.404', {
      url: '/404',
      content: {
        title: '404',
        subtitle: 'Error Page'
      },
      views: {
        "@root": {
          templateUrl: "modules/examples/partials/404.html"
        }
      }
    })
    .state('root.examples.500', {
      url: '/500',
      content: {
        title: '500',
        subtitle: 'Error Page'
      },
      views: {
        "@root": {
          templateUrl: "modules/examples/partials/500.html"
        }
      }
    })
  .state('root.examples.blank', {
    url: '/blank',
    content: {
      title: 'Blank page',
      subtitle: 'it all starts here'
    },
    views: {
      "@root": {
        templateUrl: "modules/examples/partials/blank.html"
      }
    }
  });
}
