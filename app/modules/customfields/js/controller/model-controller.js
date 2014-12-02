'use strict';

/* Controllers */
angular.module('GO.controllers').
		controller('ModelController', ['$scope', '$stateParams', 'Store', 'Model', '$state', function($scope, $stateParams, Store, Model, $state) {

				$scope.modelName = $stateParams.modelName;

				$scope.$state = $state;

				$scope.fieldSetStore = new Store(
						'CustomFields/fieldsets/'+encodeURI($stateParams.modelName),
						{
							limit: 0
						}
				);

				$scope.fieldSetStore.load();

				$scope.dragControlListeners = {
					orderChanged: function(event) {						
						var draggedModel = $scope.fieldStore.items[event.dest.index];
						
						var droppedModel = $scope.fieldStore.items[event.dest.index + 1];
						
						draggedModel.sortOrder = droppedModel.sortOrder;
						draggedModel.resort = true;
						draggedModel.save();
					}
				};
				
				
				$scope.fieldStore = new Store(
						'CustomFields/fieldsets/'+encodeURI($stateParams.modelName)+'/fields',						
						{
							limit: 0
						}
				);
		
		
				
				$scope.onDelete = function(result){					
					$state.go("customfields.model", $stateParams);
						
				};

			}]);


