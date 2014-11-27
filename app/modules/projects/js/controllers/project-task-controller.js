'use strict';

angular.module('GO.controllers').
	controller('ProjectTaskController', ['$scope', '$stateParams', 'Utils', 'ShareModal', function ($scope, $stateParams, Utils, ShareModal) {

			//Project model is defined in the parent scope of ProjectController			
			$scope.project.read($stateParams.projectId).then(function () {

			});

		}]);