'use strict';

/* Controllers */
angular.module('GO.controllers')
		.controller('FieldSetController', ['$scope', '$modal', '$state', '$stateParams', function($scope, $modal, $state, $stateParams){
				$scope.openModal = function(){
					$modal.open({
						templateUrl: 'modules/customfields/partials/field-set.html',
						controller: 'FieldSetModalController',
						resolve: {
							fieldStore: function(){
								return $scope.fieldStore;
							}
						}
					}).result.then(function(result) {

						if (result) {
							
							$scope.fieldStore.reload();
							
							return $state.go("^");
						}
					}, function(){
						return $state.go("^");
					});
				};
		}])
		
		.controller('FieldSetModalController', ['$scope', 'Model', 'MessageBox', 'Translate','$stateParams', '$state', 'fieldStore', function($scope, Model, MessageBox, Translate, $stateParams, $state, fieldStore) {

				var fieldset = fieldStore.findModelByAttribute('id', $stateParams.fieldSetId);
		
				if(fieldset){
					$scope.fieldset = fieldset;
				}else
				{
					$scope.fieldset = new Model(
							'fieldset',
							'intermesh/customFields/fieldSet'
							);

					$scope.fieldset.loadForm($stateParams.fieldSetId);
				}

	

				$scope.save = function() {
					$scope.fieldset.save({
						modelName: $stateParams.modelName
					})
							.success(function(result) {	
								
								$scope.$close(result);
				
							});
				};


				$scope.cancel = function() {

					if ($scope.fieldset.attributes.id) {
						$scope.fieldset.resetAttributes();
					}

					$scope.$dismiss();
				};


			}]);
