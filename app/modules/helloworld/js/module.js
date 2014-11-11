'use strict';

angular.module('GO').
		//Register the app
		config(['modulesProvider', function(modulesProvider) {
				modulesProvider.addModule('helloworld', 'Hello world', 'fa-thumbs-o-up');
			}]).
		config(['$stateProvider', function($stateProvider) {

				// Now set up the states
				$stateProvider
						.state('helloworld', {
							url: "/helloworld",
							templateUrl: 'modules/helloworld/partials/main.html',
							controller: "HelloWorldController"
						})
						.state('helloworld.grid', {
							url: "/grid",
							templateUrl: 'modules/helloworld/partials/grid.html',
							controller: "GridController"
						});
			}]);