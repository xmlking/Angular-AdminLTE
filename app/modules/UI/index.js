//- app/modules/UI/index.js
import routes from './routes';

let moduleName = 'analyticsApp.ui';
let uiModule = angular.module(moduleName, []);

uiModule.config(routes);

export default moduleName;

