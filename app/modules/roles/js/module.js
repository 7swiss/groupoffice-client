'use strict';


angular.module('GO').
				//Register the app
				config(['modulesProvider',function(modulesProvider) {												
						modulesProvider.addModule('roles', 'Role management', 'fa-group');
					}]).
				
				config(['$stateProvider', function($stateProvider) {

						//
						// Now set up the states
						$stateProvider
										.state('roles', {
											url: "/roles",
											templateUrl: 'modules/roles/partials/main.html',
											controller: 'RolesController'
										})
										.state('roles.edit', {
											url: "/roles/edit/{roleId:[0-9]*}",
											templateUrl: 'modules/roles/partials/role-edit.html',
											controller: 'RoleEditController'
										});
					}]);