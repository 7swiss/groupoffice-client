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

						var draggedModel = $scope.fieldStore.items[event.source.index];
						
						var droppedModel = $scope.fieldStore.items[event.dest.index];
						
						draggedModel.attributes.sortOrder = droppedModel.attributes.sortOrder;
						draggedModel.attributes.resort = true;
						draggedModel.save();
						

					}
				};

			}]);
