'use strict';

/* Controllers */
angular.module('GO.controllers').
		controller('ModelController', ['$scope', '$stateParams', 'Store', 'Model', '$state', function($scope, $stateParams, Store, Model, $state) {

				$scope.modelName = $stateParams.modelName;

				$scope.$state = $state;

				$scope.fieldSetStore = new Store(
						'Intermesh/customFields/fieldSet/store',
						new Model(
								'fieldset',
								'Intermesh/customFields/fieldSet'
								),
						{
							limit: 0,
							where: [{
								modelName: $scope.modelName
							}]

						}
				);

				$scope.fieldSetStore.load();

				$scope.dragControlListeners = {
					orderChanged: function(event) {						
						$scope.fieldSetStore.saveSortOrder('Intermesh/CustomFields/FieldSet/SaveSort');
					}
				};
				
				
				$scope.fieldStore = new Store(
						'Intermesh/customFields/field/store',
						new Model(
								'field',
								'Intermesh/customFields/field'
								),
						{
							limit: 0
						}
				);
		
		
				
				$scope.onDelete = function(result){					
					$state.go("customfields.model", $stateParams);
						
				};

			}]);


