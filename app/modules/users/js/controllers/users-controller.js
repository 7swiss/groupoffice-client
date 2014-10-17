'use strict';

/* Controllers */
angular.module('GO.controllers').
		controller('UsersController', ['$scope', '$state', 'Translate', 'Store', 'Model', 'MessageBox', function($scope, $state, Translate, Store, Model, MessageBox) {

				$scope.pageTitle = Translate.t('User management');


				$scope.contentActive = function() {
					return !$state.is('users');
				};

				$scope.store = new Store(
						'intermesh/auth/user/store',
						new Model(
								'user',
								'intermesh/auth/user'
								)
						);
				$scope.store.returnAttributes = 'id,username,email,createdAt';


				//Will be used in child scope. We define it here so we can access
				//the properties if needed in the future.
				//Child scopes automatically inherit properties of the parents but
				//not the other way around.
				$scope.user = new Model(
						'user',
						'intermesh/auth/user',
						{
							returnAttributes: '*,roles,contact.*'
						});

				$scope.syncWithStore = function(reloadStore) {
					var index = $scope.store.findIndexByAttribute('id', $scope.user.attributes.id);

					if (index > -1) {
						$scope.store.items[index].attributes = angular.copy($scope.user.attributes);
					} else if (reloadStore) {
						$scope.store.reload();
					}
				};


				
			}]);