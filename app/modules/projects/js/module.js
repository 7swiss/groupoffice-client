'use strict';

angular.module('GO').
				//Register the app
				config(['modulesProvider',function(modulesProvider) {
						modulesProvider.addModule('projects', 'Projects','fa-tasks');
					}]).

				config(['$stateProvider', function($stateProvider) {

						// Now set up the states
						$stateProvider
							.state('projects', {
								url: "/Projects",
								templateUrl: 'modules/projects/partials/main.html',
								controller: 'ProjectController'
							})
							.state('projects.edit', {
								url: "/Projects/edit/{projectId:[0-9]*}",
								controller: 'ProjectEditController',
								template: '<div ng-init="openModal()"></div>'
							});
					}]);