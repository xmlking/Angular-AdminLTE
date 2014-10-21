
export default class SettingsController {

	constructor($scope, UserService) {
        console.info('in SettingsController....');

		UserService.currentUser().then( (user) => {
			$scope.currentUser = user;
		});

		$scope.changeTheme = function () {
			//todo
		};
	}
}