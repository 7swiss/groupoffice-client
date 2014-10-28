'use strict';
/**
 * @ngdoc service
 * @name GO.customFields
 *
 * @description
 * Common utilities
 */
angular.module('GO.customFields')		
		.directive('imCustomFieldsDetail', ['$templateCache', function($templateCache) {

				$templateCache.put('customfield-text-detail.html',
						'<dl ng-if="!$root.isEmpty(imModel.attributes.customfields.attributes[field.attributes.databaseName])">\
							<dt>{{field.attributes.name}}</dt>\
							<dd>{{imModel.attributes.customfields.attributes[field.attributes.databaseName]}}</dd>\
						</dl>');

				$templateCache.put('customfield-textarea-detail.html',
						'<dl ng-if="!$root.isEmpty(imModel.attributes.customfields.attributes[field.attributes.databaseName])">\
							<dt>{{field.attributes.name}}</dt>\
							<dd><pre>{{imModel.attributes.customfields.attributes[field.attributes.databaseName]}}</pre></dd>\
						</dl>');
				
				$templateCache.put('customfield-select-detail.html',
						'<dl ng-if="!$root.isEmpty(imModel.attributes.customfields.attributes[field.attributes.databaseName])">\
							<dt>{{field.attributes.name}}</dt>\
							<dd>{{imModel.attributes.customfields.attributes[field.attributes.databaseName]}}</dd>\
						</dl>');
						
				$templateCache.put('customfield-checkbox-detail.html',
						'<dl>\
							<dt>&nbsp;</dt><dd><i class="fa" ng-class="{\'fa-square-o\': !imModel.attributes.customfields.attributes[field.attributes.databaseName],\'fa-check-square-o\': imModel.attributes.customfields.attributes[field.attributes.databaseName]}"></i> {{field.attributes.name}}</dd>\
						</dl>');
						
				$templateCache.put('customfield-date-detail.html',
						'<dl ng-if="!$root.isEmpty(imModel.attributes.customfields.attributes[field.attributes.databaseName])">\
							<dt>{{field.attributes.name}}</dt>\
							<dd>{{imModel.attributes.customfields.attributes[field.attributes.databaseName] | date:\'longDate\'}}</dd>\
						</dl>');
						
				$templateCache.put('customfield-datetime.html',
						'TODO!');
						
						
				$templateCache.put('customfield-number-detail.html',
						'<dl ng-if="!$root.isEmpty(imModel.attributes.customfields.attributes[field.attributes.databaseName])">\
							<dt>{{field.attributes.name}}</dt>\
							<dd>{{imModel.attributes.customfields.attributes[field.attributes.databaseName] | number}}</dd>\
						</dl>');

				return {
					restrict: 'E',
					scope: {
						imModel: '=',
						imServerModel: '@'
					},
					controller: ['$scope','$element','$attrs','$transclude', 'CustomFields', function($scope, $element, $attrs, $transclude, CustomFields) {

						$scope.customFieldSetStore = CustomFields.getFieldSetStore($attrs.imServerModel);
						
						$scope.datePickerOpened = {};
						
						$scope.openDatePicker = function(id, $event) {
							$event.preventDefault();
							$event.stopPropagation();

							$scope.datePickerOpened[id] = true;
						};

					}],
					template: '<div class="go-card"  ng-repeat="fieldSet in customFieldSetStore.items">\
							<h1>{{fieldSet.attributes.name}}</h1>\
								<ng-include ng-repeat="field in fieldSet.attributes.fields" src="\'customfield-\'+field.attributes.type+\'-detail.html\'"></ng-include>\
							</div>'
				};
			}]);

	