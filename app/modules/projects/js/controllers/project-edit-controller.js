'use strict';

angular.module('GO.controllers').
		controller('ProjectEditController', ['$scope', '$state', '$stateParams', 'Utils', '$http', '$q','Alerts', 'Translate', function($scope, $state, $stateParams, Utils, $http, $q, Alerts, Translate) {

//				var defaultPhotoUrl = "";

				$scope.cancel = function() {
					if ($scope.project.id) {

						$scope.project.resetAttributes();

						$state.go('projects.project.detail', {projectId: $scope.contact.id});
					} else
					{
						$state.go('^');
					}
				};


				if($scope.onSettingsPage) {
					$scope.save = function() {

						$scope.project.save()
								.success(function(result) {
										$scope.projectForm.$setPristine();
								
										Alerts.addAlert(Translate.t("Your changes have been saved"), "info");
								});
					};
				}

				$scope.project.readIf($stateParams.projectId).then(function() {

				});
			}]);