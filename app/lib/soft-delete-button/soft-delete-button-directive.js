'use strict';

/**
 * @ngdoc directive
 * @name GO.softDeleteButton:imSoftDeleteButton
 * @element im-soft-delete-button
 *
 * @description
 * A button to soft delete an item. The item won't be deleted permanently but a 'deleted' flag will be set.
 *
 
 * @param {Model} imModel The GO.data:Model that this button is for.
 * @param {string} imSize The size of the button. sm, lg or xs
 * @param {expression} imDisabled The expression to evaluate if the button should be disabled.
 * @param {function} imOnDelete Function to call when the model is deleted
 * @param {function} imOnUnDelete Function to call when the model is undeleted
 *
 * @example
   <example module="SoftDeleteButtonExample">
	<file name="index.html">

	   <im-soft-delete-button 
					im-on-delete="syncWithStore();" 
					im-on-un-delete="syncWithStore();" 
					im-disabled="!contact.permissions.deleteAccess" 
					im-model="contact" 
					im-size="sm">
				</im-soft-delete-button>
	</file>
   </example>
 */
angular.module('GO.softDeleteButton',['GO.data']).
		directive('imSoftDeleteButton', ['MessageBox', 'Translate', function(MessageBox,Translate) {

				return {
					restrict: 'E',
					scope: {
						imModel: '=',
						imSize: '@',
						imOnDelete: '&?',
						imOnUnDelete: '&?',
						imDisabled: '=?'
					},
					compile: function(element, attrs){
						if (!attrs.imSize) { attrs.imSize = 'xs'; }					
					},
					controller: function($scope){
						$scope.delete = function($event){
							
							$event.stopPropagation(); 
							$event.preventDefault();
							
							$scope.imModel.delete().then(function(result){
								if($scope.imOnDelete){
									$scope.imOnDelete({result: result});
								}
							}, function(result){								
								for (var attributeName in result.model.validationErrors) {
									MessageBox.alert(Translate.t(result.model.validationErrors[attributeName].code));
								}
							});
						};

						
						$scope.unDelete = function($event){
							
							$event.stopPropagation(); 
							$event.preventDefault();
							
							$scope.imModel.unDelete().then(function(result){
								if($scope.imOnUnDelete){
									$scope.imOnUnDelete({result: result});
								}
							});
						};
					},
					template: '<span ng-disabled="imDisabled" ng-if="!imModel.attributes.deleted" class="btn btn-{{imSize}} btn-danger im-soft-delete-btn" ng-click="delete($event);" tooltip="{{\'Delete\' | t}}" tooltip-placement="left">\
						<i class="fa fa-trash-o"></i>\
					</span>\
					\
					<span ng-disabled="imDisabled" ng-if="imModel.attributes.deleted" class="btn btn-{{imSize}} btn-primary im-soft-delete-btn" ng-click="unDelete($event);" tooltip="{{\'Undo delete\' | t}}" tooltip-placement="left">\
						<i class="fa fa-undo"></i>\
					</span>\
					'
				};
			}]);
		