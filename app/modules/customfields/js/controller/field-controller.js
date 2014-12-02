'use strict';

/* Controllers */
angular.module('GO.controllers')
		.controller('FieldController', ['$scope', '$modal', '$state', '$stateParams', function($scope, $modal, $state, $stateParams){
				$scope.openModal = function(){
					$modal.open({
						templateUrl: 'modules/customfields/partials/field.html',
						controller: 'FieldModalController',
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
		
		.controller('FieldModalController', ['$scope', 'Model', 'MessageBox', 'Translate','$stateParams', '$state', 'fieldStore', function($scope, Model, MessageBox, Translate, $stateParams, $state, fieldStore) {

				var field = fieldStore.findModelByAttribute('id', $stateParams.fieldId);
		
				if(field){
					$scope.field = field;
				}else
				{
					$scope.field = new Model(
							'CustomFields/fieldsets/'+encodeURI($stateParams.modelName)+'/fields'
							);

					
				}
				
				$scope.field.read($stateParams.fieldId).then(function(){
						
						if(!$scope.field.data){
							$scope.field.data = {};
						}
						
						if(!$scope.field.data.options){
							$scope.field.data.options = [];
						}
					});
				
				

				$scope.customFieldTypes = [
					{
						value: 'text',
						label: 'Text field'
					}, {
						value: 'textarea',
						label: 'Text area'
					}, {
						value: 'select',
						label: 'Select'
					}, {
						value: 'checkbox',
						label: 'Check box'
					}, {
						value: 'date',
						label: 'Date'
					}, {
						value: 'datetime',
						label: 'Date & time'
					}, {
						value: 'number',
						label: 'Number'
					}
				];

				$scope.save = function() {
					$scope.field.save({
						fieldSetId: $stateParams.fieldSetId
					})
							.success(function(result) {	
								
								$scope.$close(result);
				
							});
				};

				$scope.cancel = function() {

					if ($scope.field.id) {
						$scope.field.resetAttributes();
					}

					$scope.$dismiss();
				};


			}]);
