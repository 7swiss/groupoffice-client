'use strict';

/* Controllers */
angular.module('GO.controllers').

				controller('RolesController', ['$scope', '$state', 'Translate', 'Store','Model','PanelSwitcher', function($scope, $state, Translate, Store, Model, PanelSwitcher) {

						$scope.pageTitle = Translate.t('Role management');

						$scope.panelSwitcher = new PanelSwitcher($scope, 'roles');

						$scope.store = new Store(
								'auth/roles'
								);


						//Will be used in child scope. We define it here so we can access
						//the properties if needed in the future.
						//Child scopes automatically inherit properties of the parents but
						//not the other way around.
						$scope.role = new Model(
								'auth/roles',
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
							var index = $scope.store.findIndexByAttribute('id', $scope.role.id);
														
							if(index > -1){
								$scope.store.items[index].attributes = angular.copy($scope.role.attributes);
							}else if(reloadStore){												
								$scope.store.reload();
							}
						};
					}]);