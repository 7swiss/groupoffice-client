'use strict';

/* Controllers */
angular.module('GO.controllers').
		controller('HelloWorldController', ['$scope', function($scope) {

				//Set's the title in the header bar
				$scope.pageTitle = "Hello world";
			}]);