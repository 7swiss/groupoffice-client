'use strict';

/* Controllers */
angular.module('GO.controllers').
		controller('KsLoadmaskController', ['$scope', '$timeout', function ($scope, $timeout) {

				
				$scope.showMask = false;
				$scope.showMask2s = function(){
					$scope.showMask = true;
					
					$timeout(function(){
						$scope.showMask = false;
					}, 2000);
				};

			}]);




