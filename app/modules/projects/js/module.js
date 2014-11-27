'use strict';

angular.module('GO').
	//Register the app
	config(['modulesProvider', function (modulesProvider) {
			modulesProvider.addModule('projects', 'Projects', 'fa-tasks');
		}]).
	config(['$stateProvider', function ($stateProvider) {

			// Now set up the states
			$stateProvider
				.state('projects', {
					url: "/projects",
					templateUrl: 'modules/projects/partials/main.html',
					controller: 'ProjectController'
				})
				.state('projects.edit', {
					url: "/edit/{projectId:[0-9]*}",
					templateUrl: 'modules/projects/partials/project-edit.html',
					controller: 'ProjectEditController'
				})
				.state('projects.project.detail', {
					url: "/detail/{projectId:[0-9]*}",
					templateUrl: 'modules/projects/partials/project-detail.html',
					controller: 'ProjectDetailController'
				});
		}]);