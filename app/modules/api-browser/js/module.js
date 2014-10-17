'use strict';

angular.module('GO').
				//Register the app
				config(['modulesProvider',function(modulesProvider) {
						modulesProvider.addModule('apibrowser', 'API Browser','fa-database');
					}]).

				config(['$stateProvider', function($stateProvider) {

						//
						// Now set up the states
						$stateProvider
										.state('apibrowser', {
											url: "/apibrowser",
											templateUrl: 'modules/api-browser/partials/main.html',
											controller: 'ApiBrowseController'
										});
					}]);