//- app/modules/examples/index.js
import routes from './routes';

let moduleName = 'analyticsApp.examples';
let examplesModule = angular.module(moduleName, []);

examplesModule.config(routes);

export default moduleName;

