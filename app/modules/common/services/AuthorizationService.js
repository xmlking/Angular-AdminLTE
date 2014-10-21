
export const USER_ROLES =
{
	all: '*',
	any: '?',
	USER:           'ROLE_USER',
	DATA_ADMIN:     'ROLE_DATA_ADMIN',
	IT_ADMIN:       'ROLE_IT_ADMIN',
	BUSINESS_ADMIN: 'ROLE_BUSINESS_ADMIN',
	SWITCH_USER:    'ROLE_SWITCH_USER',
	SUPER_ADMIN:    'ROLE_SUPER_ADMIN'
};


//TODO: Any JS lib to build DAG Data Structure from string?
//`ROLE_SUPERADMIN > ROLE_SWITCH_USER
//ROLE_SWITCH_USER > ROLE_BUSINESS_ADMIN
//ROLE_BUSINESS_ADMIN > ROLE_IT_ADMIN
//ROLE_BUSINESS_ADMIN > ROLE_DATA_ADMIN
//ROLE_IT_ADMIN > ROLE_USER
//ROLE_DATA_ADMIN > ROLE_USER`

//support hierarchical roles
const USER_ROLE_HIERARCHIE =
	{
		ROLE_USER:           ['ROLE_USER'],
		ROLE_DATA_ADMIN:     ['ROLE_DATA_ADMIN','ROLE_USER'],
		ROLE_IT_ADMIN:       ['ROLE_IT_ADMIN','ROLE_USER'],
		ROLE_BUSINESS_ADMIN: ['ROLE_BUSINESS_ADMIN','ROLE_IT_ADMIN','ROLE_DATA_ADMIN','ROLE_USER'],
		ROLE_SWITCH_USER:    ['ROLE_SWITCH_USER','ROLE_BUSINESS_ADMIN','ROLE_IT_ADMIN','ROLE_DATA_ADMIN','ROLE_USER'],
		ROLE_SUPER_ADMIN:    ['ROLE_SUPER_ADMIN','ROLE_SWITCH_USER','ROLE_BUSINESS_ADMIN','ROLE_IT_ADMIN','ROLE_DATA_ADMIN','ROLE_USER']
	};

export class AuthorizationService {

	constructor($rootScope, UserService) {
		this.$rootScope = $rootScope;
		this.UserService = UserService;
	}

	isAuthenticated() {
		//console.info('in isAuthenticated');
		return this.UserService.isLoggedIn();
	}

	isAuthorized(authorizedRoles) {
		if(!this.isAuthenticated()) {
			return false;
		}
		//undefined authorizedRoles means allow any role.
		if(typeof authorizedRoles === 'undefined') {
			return true;
		}

		if (!angular.isArray(authorizedRoles)) {
			authorizedRoles = [authorizedRoles];
		}

		let  currentUser = this.UserService.currentUserFromCache();

		let authorities = currentUser.authorities.map( x =>  x.authority );
		let expandedAuthorities = _.flatten(authorities.map( x => USER_ROLE_HIERARCHIE[x] ));

		var intersection = _.intersection(expandedAuthorities , authorizedRoles);//Match any of the authorized Roles

		return (this.isAuthenticated() && intersection.length > 0);
	}

	async isAuthorized1(authorizedRoles) {
		if(!this.isAuthenticated()) {
			return false;
		}
		//undefined authorizedRoles means allow any role.
		if(typeof authorizedRoles === 'undefined') {
			return true;
		}

		if (!angular.isArray(authorizedRoles)) {
			authorizedRoles = [authorizedRoles];
		}
		let  currentUser = await this.UserService.currentUser();

		let authorities = new Set([for (x of currentUser.authorities) x.authority]); //TODO expandedAuthorities: flatMap in ES6?

		var intersection =  [for (x of authorizedRoles) if (authorities.has(x)) x]; //Match any of the authorized Roles

		return (this.isAuthenticated() && intersection.length > 0);
	}
}

