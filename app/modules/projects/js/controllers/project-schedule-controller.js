'use strict';

angular.module('GO.controllers').
	controller('ProjectScheduleController', ['$scope', '$stateParams', 'Utils', 'ShareModal', function ($scope, $stateParams, Utils, ShareModal) {

			//Project model is defined in the parent scope of ProjectController			
			$scope.project.read($stateParams.projectId).then(function () {

			});

		}]);