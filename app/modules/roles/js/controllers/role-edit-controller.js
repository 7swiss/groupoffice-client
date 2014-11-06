'use strict';

angular.module('GO.controllers').
		controller('RoleEditController', ['Model', '$scope', '$state', '$stateParams', 'Store', '$http', 'Utils', '$modal', '$log', 'StoreSelectModal', function (Model, $scope, $state, $stateParams, Store, $http, Utils, $modal, $log, StoreSelectModal) {

				$scope.role.read($stateParams.roleId);

				$scope.storeSelectModal = new StoreSelectModal(
						new Store('auth/roles/'+$stateParams.roleId+'/users',{availableOnly: 1}),
						'modules/roles/partials/multi-select-users.html',
						function (selected) {
							$scope.role.attributes.users = $scope.role.attributes.users.concat(selected);
						}
				);
		
//				$scope.usersStore = new Store(
//								'auth/roles/'+$stateParams.roleId+'/users'
//								);
			}]);