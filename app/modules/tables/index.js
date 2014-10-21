//- app/modules/tables/index.js
import routes from './routes';

let moduleName = 'analyticsApp.tables';
let tablesModule = angular.module(moduleName, []);

tablesModule.config(routes);

export default moduleName;

