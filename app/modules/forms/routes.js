//- app/modules/forms/routes.js
export default function routes($stateProvider) {
  'use strict';

  return $stateProvider
    .state('root.forms', {
      url: '/forms',
      abstract: true,
      content: {
        title: 'Forms'
      }
    })
    .state('root.forms.general', {
      url: '/general',
      content: {
        title: 'General Elements',
        subtitle: 'Preview'
      },
      views: {
        "@root": {
          templateUrl: "modules/forms/partials/general.html"
        }
      }
    })
    .state('root.forms.advanced', {
      url: '/advanced',
      content: {
        title: 'Advanced Elements',
        subtitle: 'Preview'
      },
      views: {
        "@root": {
          templateUrl: "modules/forms/partials/advanced.html"
        }
      }
    })
    .state('root.forms.editors', {
      url: '/editors',
      content: {
        title: 'Text Editors',
        subtitle: 'Advanced form element'
      },
      views: {
        "@root": {
          templateUrl: "modules/forms/partials/editors.html"
        }
      }
    });
}
