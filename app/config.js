//- app/config.js
/**
 * configure RequireJS
 * prefer named modules to long paths, especially for version/dependency  mgt of 3rd party libraries
 */
var require = {
  // alias libraries paths
  // bower:js  //TODO: wiredep paths from bower.json. bower-requirejs ???
  paths: {
    'requireLib': '../../bower_components/requirejs/require',
    'text': '../../bower_components/requirejs-text/text',
    'async': '../../bower_components/requirejs-plugins/src/async',
    'es6-shim': '../../bower_components/es6-shim/es6-shim',
    'reflect': '../../bower_components/harmony-reflect/reflect',
    'angular': '../../bower_components/angular/angular',
    'lodash.compat': '../../bower_components/lodash/dist/lodash.compat',
    'restangular': '../../bower_components/restangular/dist/restangular',
    'angular-growl': '../../bower_components/angular-growl-v2/build/angular-growl',
    'angular-ui-router': '../../bower_components/angular-ui-router/release/angular-ui-router',
    'http-auth-interceptor': '../../bower_components/angular-http-auth/src/http-auth-interceptor',
    'angular-animate': '../../bower_components/angular-animate/angular-animate',
    'angular-sanitize': '../../bower_components/angular-sanitize/angular-sanitize',
    'angular-mocks':    '../../bower_components/angular-mocks/angular-mocks',
    'angular-bootstrap': '../../bower_components/angular-bootstrap/ui-bootstrap-tpls',
    'AngularGM': '../../bower_components/AngularGM/angular-gm',
    'angular-cache': '../../bower_components/angular-cache/dist/angular-cache',
    'angular-file-upload': '../../bower_components/ng-file-upload/angular-file-upload',
    'angular-loading-bar': '../../bower_components/angular-loading-bar/build/loading-bar',
    'angular-bootstrap-colorpicker': '../../bower_components/angular-bootstrap-colorpicker/js/bootstrap-colorpicker-module',
    'angular-ui-calendar': '../../bower_components/angular-ui-calendar/src/calendar',
    'angular-slimscroll': '../../bower_components/angular-slimscroll/angular-slimscroll',
    'jquery-slimscroll': '../../bower_components/slimscroll/jquery.slimscroll',
    'fullcalendar': '../../bower_components/fullcalendar/fullcalendar',
    'jquery': '../../bower_components/jquery/dist/jquery',
    'jquery-ui': '../../bower_components/jquery-ui/ui/jquery-ui',
    'ng-table': '../../bower_components/ng-table/ng-table',
    'sockjs': '../../bower_components/bower-sockjs-client/sockjs',
    'stomp': '../../bower_components/stomp-websocket/lib/stomp',
    'term': '../../bower_components/term/src/term',
    'iCheck': '../../bower_components/iCheck/icheck',
    'moment': '../../bower_components/moment/moment',
    'raphael': '../../bower_components/raphael/raphael',
    'morrisjs': '../../bower_components/morrisjs/morris',
    'angular-moment': '../../bower_components/angular-moment/angular-moment',
    'angular-ui-sortable': '../../bower_components/angular-ui-sortable/sortable',
    'd3': '../../bower_components/d3/d3',
    'nvd3' :'../../bower_components/nvd3/nv.d3',
    'angularjs-nvd3-directives': '../../bower_components/angularjs-nvd3-directives/dist/angularjs-nvd3-directives',
    'traceur-runtime': '../../node_modules/traceur/bin/traceur-runtime'
  },
  // endbower

  /**
   * for libs that either do not support AMD out of the box, or
   * require some fine tuning to dependency mgt'
   */
  shim: {
    'angular': {exports: 'angular'},
    'angular-animate': {deps: ['angular']},
    'angular-sanitize': {deps: ['angular']},
    'angular-cache': {deps: ['angular']},
    'lodash.compat': {exports: '_'},
    'restangular': {deps: ['angular', 'lodash.compat']},
    'angular-ui-router': {deps: ['angular']},
    'http-auth-interceptor': {deps: ['angular']},
    'angular-bootstrap': {deps: ['angular']},
    'angular-growl': {deps: ['angular']},
    'angular-truncate': {deps: ['angular']},
    'ng-table': {deps: ['angular']},
    'AngularGM': {deps: ['angular']},
    'reflect': {deps: ['es6-shim'],exports: 'Reflect'},
    'templates': {deps: ['angular']},
    'angular-loading-bar': {deps: ['angular']},
    'angular-file-upload': {deps: ['angular']},
    'angular-bootstrap-colorpicker': {deps: ['angular']},
    'angular-moment': {deps: ['angular','moment']},
    'angular-ui-calendar': {deps: ['angular','fullcalendar','jquery-ui']},
    'fullcalendar': {deps: ['jquery']},
    'jquery-slimscroll': {deps: ['jquery']},
    'nvd3': {deps: ['d3']},
    'angularjs-nvd3-directives': {deps: ['angular','nvd3']},
    'angular-slimscroll':{deps: ['angular','jquery-slimscroll']},
    'angular-ui-sortable':{deps: ['angular','jquery-ui']},
    'jquery-ui': {deps: ['jquery']},
    'morrisjs':  {deps: ['raphael','jquery']},
    'iCheck': {deps: ['jquery']}
  }
};
