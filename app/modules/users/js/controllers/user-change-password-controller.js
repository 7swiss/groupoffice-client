'use strict';

angular.module('GO.controllers').
		controller('UserChangePasswordController', ['Model', '$scope', '$state', '$stateParams', 'Store', '$http', 'Utils', 'StoreSelectModal','Alerts','Translate', function (Model, $scope, $state, $stateParams, Store, $http, Utils, StoreSelectModal, Alerts, Translate) {


				$scope.user = new Model(
						'auth/users'
						);

				$scope.user.read("current").then(function () {

				});


				$scope.save = function () {
					$scope.user.save()
							.success(function (result) {
								$scope.userChangePasswordForm.$setPristine();
						
								Alerts.addAlert(Translate.t("Your password has been changed"), "info");
							});
				};


				
			}]);
