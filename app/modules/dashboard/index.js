//- app/modules/dashboard/index.js
import routes from './routes';
import 'angular-ui-calendar';
import 'angular-bootstrap-colorpicker';
import 'angular-file-upload';
import 'angular-slimscroll';
import 'angularjs-nvd3-directives';

import {toggle,treeview, btn,widget} from './elements/AdminLTEDirectives';
//import {barChart, lineChart, donutChart, areaChart} from './elements/MorrisDirectives';
import ICheckDirective  from './elements/ICheckDirective';
import BreadcrumbsDirective from './elements/BreadcrumbsDirective';
import DashboardController from './controllers/DashboardController';
import TodoController from './controllers/TodoController';
import ChartsController from './controllers/ChartsController';

let moduleName = 'analyticsApp.dashboard';
let dashboardModule = angular.module(moduleName,
  [
    'ui.calendar',
    'colorpicker.module',
    'angularFileUpload',
    'ui.slimscroll',
    'ui.sortable',
    'nvd3ChartDirectives'
  ]);

dashboardModule.controller('DashboardController', DashboardController);
dashboardModule.controller('TodoController', TodoController);
dashboardModule.controller('ChartsController', ChartsController);
dashboardModule.directive('sumoBreadcrumbs', BreadcrumbsDirective);
dashboardModule.directive('toggle', toggle);
dashboardModule.directive('treeview', treeview);
dashboardModule.directive('btn', btn);
dashboardModule.directive('widget', widget);
//dashboardModule.directive('barchart', barChart);
//dashboardModule.directive('linechart', lineChart);
//dashboardModule.directive('donutchart', donutChart);
//dashboardModule.directive('areachart', areaChart);
dashboardModule.directive('icheck', ICheckDirective);

dashboardModule.constant('amTimeAgoConfig', {
  withoutSuffix: true
});

dashboardModule.config(routes);

export default moduleName;


