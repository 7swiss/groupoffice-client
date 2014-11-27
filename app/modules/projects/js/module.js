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
				.state('projects.project', {
					url: "/project/{projectId:[0-9]*}",
					templateUrl: 'modules/projects/partials/project.html'
				})
				.state('projects.project.details', {
					url: "/details",
					templateUrl: 'modules/projects/partials/project-details.html',
					controller: 'ProjectDetailController'
				})
				.state('projects.project.tasks', {
					url: "/tasks",
					templateUrl: 'modules/projects/partials/project-tasks.html',
					controller: 'ProjectTaskController'
				})
				.state('projects.project.schedules', {
					url: "/schedules",
					templateUrl: 'modules/projects/partials/project-schedules.html',
					controller: 'ProjectScheduleController'
				});
		}]);