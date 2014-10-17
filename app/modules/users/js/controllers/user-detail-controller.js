'use strict';

angular.module('GO.controllers').
				controller('UserDetailController', ['Model', '$scope', '$state', '$stateParams', function(Model, $scope, $state, $stateParams) {

						//Model is defined in the parent scope of UsersController
						$scope.user.read($stateParams.userId);
					}]);