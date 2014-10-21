//- app/modules/UI/routes.js
export default function routes($urlRouterProvider, $stateProvider) {
  'use strict';

  return $stateProvider
    .state('root.ui', {
      url: '/UI',
      abstract: true,
      content: {
        title: 'UI'
      }
    })
    .state('root.ui.general', {
      url: '/general',
      content: {
        title: 'General UI',
        subtitle: 'Preview of UI elements'
      },
      views: {
        "@root": {
          templateUrl: "modules/UI/partials/general.html"
        }
      }
    })
    .state('root.ui.icons', {
      url: '/icons',
      content: {
        title: 'Icons',
        subtitle: 'a set of beautiful icons'
      },
      views: {
        "@root": {
          templateUrl: "modules/UI/partials/icons.html"
        }
      }
    })
    .state('root.ui.buttons', {
      url: '/buttons',
      content: {
        title: 'Buttons',
        subtitle: 'Control panel'
      },
      views: {
        "@root": {
          templateUrl: "modules/UI/partials/buttons.html"
        }
      }
    })
  .state('root.ui.sliders', {
    url: '/sliders',
    content: {
      title: 'Sliders',
      subtitle: 'range sliders'
    },
    views: {
      "@root": {
        templateUrl: "modules/UI/partials/sliders.html"
      }
    }
  })
  .state('root.ui.timeline', {
    url: '/timeline',
    content: {
      title: 'Timeline',
      subtitle: 'example'
    },
    views: {
      "@root": {
        templateUrl: "modules/UI/partials/timeline.html"
      }
    }
  });
}
