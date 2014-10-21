//- app/modules/charts/index.js
import routes from './routes';

let moduleName = 'analyticsApp.charts';
let chartsModule = angular.module(moduleName, []);

chartsModule.config(routes);

export default moduleName;

