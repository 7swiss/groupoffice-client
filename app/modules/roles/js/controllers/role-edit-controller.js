'use strict';

angular.module('GO.controllers').
		controller('RoleEditController', ['Model', '$scope', '$state', '$stateParams', 'Store', '$http', 'Utils', '$modal', '$log', 'StoreSelectModal', function (Model, $scope, $state, $stateParams, Store, $http, Utils, $modal, $log, StoreSelectModal) {

				$scope.role.loadForm($stateParams.roleId);

				$scope.storeSelectModal = new StoreSelectModal(
						new Store('intermesh/auth/role/availableUsers',
								new Model('role'),
								{
									roleId: $stateParams.roleId
								}),
						'multiSelectUsers.html',
						function (selected) {
							$scope.role.attributes.users = $scope.role.attributes.users.concat(selected);
						}
				);
		
				$scope.usersStore = new Store(
								'intermesh/auth/role/users',
								new Model('user'),
								{
									roleId: $stateParams.roleId
								});			
			}]);