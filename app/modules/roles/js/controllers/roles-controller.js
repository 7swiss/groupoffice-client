'use strict';

/* Controllers */
angular.module('GO.controllers').

				controller('RolesController', ['$scope', '$state', 'Translate', 'Store','Model','MessageBox', function($scope, $state, Translate, Store, Model, MessageBox) {

						$scope.pageTitle = Translate.t('Role management');

						$scope.contentActive = function() {
							return !$state.is('roles');
						};

						$scope.store = new Store(
								'intermesh/auth/role/store',
								new Model(
										'role',
										'intermesh/auth/role'
										)
								);


						//Will be used in child scope. We define it here so we can access
						//the properties if needed in the future.
						//Child scopes automatically inherit properties of the parents but
						//not the other way around.
						$scope.role = new Model(
								'role', 
								'intermesh/auth/role',
								{
									'returnAttributes':'*, modulesWithPermissions[*], users'
								}
								);
						

						$scope.save = function(){
							$scope.role.save()
											.success(function(result){
														//success
														$scope.store.reload();

													});
						};

						$scope.syncWithStore = function(reloadStore){
							var index = $scope.store.findIndexByAttribute('id', $scope.role.attributes.id);
														
							if(index > -1){
								$scope.store.items[index].attributes = angular.copy($scope.role.attributes);
							}else if(reloadStore){												
								$scope.store.reload();
							}
						};
					}]);