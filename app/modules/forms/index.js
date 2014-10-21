//- app/modules/forms/index.js
import routes from './routes';

let moduleName = 'analyticsApp.forms';
let formsModule = angular.module(moduleName, []);

formsModule.config(routes);

export default moduleName;

