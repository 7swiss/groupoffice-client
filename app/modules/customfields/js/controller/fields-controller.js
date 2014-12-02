'use strict';

/* Controllers */
angular.module('GO.controllers').
		controller('FieldsController', ['$scope', '$stateParams', 'Store', 'Model', function($scope, $stateParams, Store, Model) {


				$scope.fieldStore.reset();
				$scope.fieldStore.load({
					where: [{
						fieldSetId: $stateParams.fieldSetId
					}]
				});


				$scope.dragControlListeners = {
					orderChanged: function(event) {						
						
						var draggedModel = $scope.fieldStore.items[event.dest.index];
						
						var droppedModel = $scope.fieldStore.items[event.dest.index + 1];
						
						draggedModel.sortOrder = droppedModel.sortOrder;
						draggedModel.resort = true;
						draggedModel.save();
						

					}
				};

			}]);
