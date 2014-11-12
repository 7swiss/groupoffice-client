'use strict';


angular.module('GO').
				//Register the app
				config(['modulesProvider', function(modulesProvider) {
						modulesProvider.addModule('settings', 'Settings', 'fa-gear');
					}]).
				config(['$stateProvider', function($stateProvider) {

						// Now set up the states
						$stateProvider
										.state('settings', {
											url: "/modules/settings",
											templateUrl: 'modules/settings/partials/main.html',
											controller: 'SettingsController'
										})
										.state('settings.accounts', {
											url: "/accounts",
											templateUrl: 'modules/settings/partials/accounts.html',
											controller: 'AccountsController'
										});
					}]);