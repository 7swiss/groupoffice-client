'use strict';

angular.module('GO.controllers').
		controller('UserChangePasswordController', ['Model', '$scope', '$state', '$stateParams', 'Store', '$http', 'Utils', 'StoreSelectModal', function (Model, $scope, $state, $stateParams, Store, $http, Utils, StoreSelectModal) {


				$scope.user = new Model(
						'auth/users'
						);

				$scope.user.read("current").then(function () {

				});


				$scope.save = function () {
					$scope.user.save()
							.success(function (result) {
								$scope.userChangePasswordForm.$setPristine();
							});
				};


				
			}]);
