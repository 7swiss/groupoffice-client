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
						$scope.fieldStore.saveSortOrder('Intermesh/CustomFields/Field/SaveSort');
					}
				};

			}]);
