'use strict';
/**
 * @ngdoc service
 * @name GO.customFields
 *
 * @description
 * Common utilities
 */
angular.module('GO.customFields')
		.directive('imCustomFieldsFilter', ['$templateCache', function($templateCache) {

				$templateCache.put('customfield-filtertext.html',
						'<div class="form-group">\
							<label class="control-label" for="cf_{{field.attributes.id}}">{{field.attributes.name}}</label>\
							<input id="cf_filter_{{field.attributes.id}}" type="text" maxlength="{{field.attributes.data.maxLength}}" ng-model="imModel[field.attributes.databaseName]" class="form-control" />\
						</div>');

				$templateCache.put('customfield-filtertextarea.html',
						'<div class="form-group">\
							<label class="control-label" for="cf_{{field.attributes.id}}">{{field.attributes.name}}</label>\
							<input id="cf_filter_{{field.attributes.id}}" type="text" maxlength="{{field.attributes.data.maxLength}}" ng-model="imModel[field.attributes.databaseName]" class="form-control" />\
						</div>');

				$templateCache.put('customfield-filterselect.html',
						'<div class="form-group">\
							<label class="control-label">{{field.attributes.name}}</label>\
							\
								<ui-select ng-model="imModel[field.attributes.databaseName]">\
									<ui-select-match class="ab-multi-input-select" placeholder="{{field.attributes.placeHolder}}">{{$select.selected.value}}</ui-select-match>\
									<ui-select-choices repeat="item.value as item in field.attributes.data.options | filter: $select.search">\
										<div ng-bind-html="item.value | highlight: $select.search"></div>\
									</ui-select-choices>\
								</ui-select>\
							\
						</div>');

				$templateCache.put('customfield-filtercheckbox.html',
						'<div class="form-group">\
							<label class="control-label">{{field.attributes.name}}</label>\
							\
								<ui-select ng-model="imModel[field.attributes.databaseName]">\
											<ui-select-match class="ab-multi-input-select" placeholder="{{field.attributes.placeHolder}}">{{$select.selected.label}}</ui-select-match>\
											<ui-select-choices repeat="item.value as item in checkBoxSelectOptions | filter: $select.search">\
												<div ng-bind-html="item.label | highlight: $select.search"></div>\
											</ui-select-choices>\
										</ui-select>\
							\
						</div>');

				$templateCache.put('customfield-filterdate.html',
						'<div class="form-group">\
							<label class="control-label" for="cf_{{field.attributes.id}}_gt">{{field.attributes.name}}</label>\
							<div class="input-group" style="width:330px">\
								<div class="input-group-addon">&gt;=</div>\
								<input id="cf_filter_{{field.attributes.id}}_gt" type="text" class="form-control" ng-model="imModel[field.attributes.databaseName].gt" datepicker-popup="dd-MM-yyyy" is-open="datePickerOpened[field.attributes.id+\'_gt\']" close-text="Close" />\
								<span class="input-group-btn">\
									<button type="button" class="btn btn-default" ng-click="openDatePicker(field.attributes.id+\'_gt\', $event)"><i class="fa fa-calendar"></i></button>\
								</span>\
							</div>\
							<div class="input-group" style="width:330px">\
								<div class="input-group-addon">&lt;=</div>\
								<input id="cf_filter_{{field.attributes.id}}_gt" type="text" class="form-control" ng-model="imModel[field.attributes.databaseName].lt" datepicker-popup="dd-MM-yyyy" is-open="datePickerOpened[field.attributes.id+\'_lt\']" close-text="Close" />\
								<span class="input-group-btn">\
									<button type="button" class="btn btn-default" ng-click="openDatePicker(field.attributes.id+\'_lt\', $event)"><i class="fa fa-calendar"></i></button>\
								</span>\
							</div>\
						</div>');

				$templateCache.put('customfield-filterdatetime.html',
						'TODO!');


				$templateCache.put('customfield-filternumber.html',
						'<div class="form-group">\
							<label class="control-label" for="cf_{{field.attributes.id}}">{{field.attributes.name}}</label>\
							<div class="input-group">\
								<div class="input-group-addon">&gt;=</div>\
								<input im-numeric id="cf_filter_{{field.attributes.id}}" type="text" ng-model="imModel[field.attributes.databaseName].gt" class="form-control" />\
							</div>\
							<div class="input-group">\
								<div class="input-group-addon">&lt;=</div>\
								<input im-numeric id="cf_filter_{{field.attributes.id}}" type="text" ng-model="imModel[field.attributes.databaseName].lt" class="form-control" />\
							</div>\
						</div>');

				return {
					restrict: 'E',
					scope: {
						imModel: "=",
						imServerModel: '@'
					},
					controller: ['$scope', '$attrs', 'CustomFields', 'Translate', function($scope, $attrs, CustomFields, Translate) {

							$scope.customFieldSetStore = CustomFields.getFieldSetStore($attrs.imServerModel);

							$scope.datePickerOpened = {};
							
							$scope.checkBoxSelectOptions = [
								{value:null, label: Translate.t("Disabled")},
								{value:true, label: Translate.t("Checked")},
								{value:false, label: Translate.t("UnChecked")}
							];

							$scope.openDatePicker = function(id, $event) {
								$event.preventDefault();
								$event.stopPropagation();

								$scope.datePickerOpened[id] = true;
							};
						}],
					template: '<fieldset ng-repeat="fieldSet in customFieldSetStore.items"><legend>{{fieldSet.attributes.name}}</legend><ng-include ng-if="field.attributes.filterable" ng-repeat="field in fieldSet.attributes.fields" src="\'customfield-filter\'+field.attributes.type+\'.html\'"></ng-include></fieldset>'
				};
			}]);

	