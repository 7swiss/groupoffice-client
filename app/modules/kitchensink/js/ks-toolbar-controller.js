'use strict';

/* Controllers */
angular.module('GO.controllers').
		controller('KsToolbarController', ['$scope', 'Alerts', function ($scope, Alerts) {

				
				
				$scope.addAlert = Alerts.addAlert;

			}]);


