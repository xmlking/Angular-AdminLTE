//- app/modules/home/index.js
import routes from './routes';
import HomeController from './controllers/HomeController';

let moduleName = 'analyticsApp.home';
let homeModule = angular.module(moduleName, []);

homeModule.controller('HomeController', HomeController);

homeModule.config(routes);

export default moduleName;
