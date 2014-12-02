'use strict';
/**
 * @ngdoc service
 * @name GO.customFields
 *
 * @description
 * Common utilities
 */
angular.module('GO.customFields')
		.directive('imCustomFieldsEdit', ['$templateCache', '$compile','CustomFields', function($templateCache, $compile, CustomFields) {


				var buildTemplate = function(customFieldSetStore){
					var tpl = '';
					for(var i = 0, l = customFieldSetStore.items.length; i < l; i++){
						
						var fieldSet = customFieldSetStore.items[i];
						
						tpl +=  '<div class="go-card"><h1>'+fieldSet.name+'</h1>';
				
						for(var n = 0, cl = fieldSet.fields.length; n < cl; n++){
							var field = fieldSet.fields[n];
							tpl += buildFunctions[field.type](field);
						}
								
						tpl += '</div>';
						
					}
					
					return tpl;
							
							
				};
				
				var buildFunctions = {
					text: function(field){
						return '<div class="form-group">\
							<label for="'+field.databaseName+'">'+field.name+'</label>\
								<input id="'+field.databaseName+'" name="'+field.databaseName+'" type="text" maxlength="'+field.data.maxLength+'" ng-model="imModel.customfields[\''+field.databaseName+'\']" placeholder="'+field.placeholder+'" ng-required="'+(field.required ? 'true' : 'false')+'" class="form-control" />\
								<im-show-error for="'+field.databaseName+'" im-model="imModel.customfields"></im-show-error>\
						</div>';
					},
					
					textarea: function(field){
						return '<div class="form-group">\
							<label for="'+field.databaseName+'">'+field.name+'</label>\
								<textarea id="'+field.databaseName+'" name="'+field.databaseName+'" maxlength="'+field.data.maxLength+'" ng-model="imModel.customfields[\''+field.databaseName+'\']" placeholder="'+field.placeholder+'" ng=required="'+(field.required ? 'true' : 'false')+'" class="form-control" msd-elastic="\n"></textarea>\
								<im-show-error for="'+field.databaseName+'" im-model="imModel.customfields"></im-show-error>\
						</div>';
					},
					
					select: function(field){
						return '<div class="form-group">\
							<label for="'+field.databaseName+'">'+field.name+'</label>\\n\
						<select class="form-control" ng-model="imModel[field.databaseName]" ng-options="option.value as option.label for option in field.data.options"></select>\
								<!--<ui-select name="'+field.databaseName+'" ng-model="imModel.customfields[\''+field.databaseName+'\']">\
											<ui-select-match class="ab-multi-input-select" placeholder="{{field.placeHolder}}">{{$select.selected.value}}</ui-select-match>\
											<ui-select-choices repeat="item.value as item in field.data.options | filter: $select.search">\
												<div ng-bind-html="item.value | highlight: $select.search"></div>\
											</ui-select-choices>\
										</ui-select>-->\
								<im-show-error for="'+field.databaseName+'" im-model="imModel.customfields"></im-show-error>\
						</div>';
					},
					
					checkbox: function(field){
						return '<div class="form-group"><div class="checkbox">\
							<label>\
								<input id="cf_{{field.id}}" type="checkbox" ng-model="imModel.customfields[\''+field.databaseName+'\']" /> '+field.name+'\
							</label>\
						</div></div>';
					},
					
					date: function(field){
						return '<div class="form-group">\
							<label for="'+field.databaseName+'">'+field.name+'</label>\
							<div class="input-group" style="width:300px">\
								<input name="'+field.databaseName+'" id="cf_{{field.id}}" type="text" class="form-control"  ng-model="imModel.customfields[\''+field.databaseName+'\']" datepicker-popup="dd-MM-yyyy" is-open="datePickerOpened[field.id]" close-text="{{\'Close\' | goT}}" ng-click="openDatePicker(field.id, $event)" />\
								<!--<span class="input-group-btn">\
									<button type="button" class="btn btn-default" ng-click="openDatePicker(field.id, $event)"><i class="fa fa-calendar"></i></button>\
								</span>-->\
							<im-show-error for="'+field.databaseName+'" im-model="imModel.customfields"></im-show-error></div>\
						</div>';
					},
					number: function(field){
						return '<div class="form-group">\
							<label for="'+field.databaseName+'">'+field.name+'</label>\
								<input im-numeric id="cf_{{field.id}}" name="'+field.databaseName+'" type="text" ng-model="imModel.customfields[\''+field.databaseName+'\']" placeholder="{{field.placeholder}}" ng-required="field.required" class="form-control" />\
								<im-show-error for="'+field.databaseName+'" im-model="imModel.customfields"></im-show-error>\
						</div>';
					}
				};

				return {
					restrict: 'E',
					scope: {
						imModel: '=',
						imServerModel: '@'
					},
					link: function(scope, element, attrs){

						var customFieldSetStore = CustomFields.getFieldSetStore(attrs.imServerModel);
						//TODO load is called twice now
						customFieldSetStore.promise.then(function(){
						
							var tpl  = buildTemplate(customFieldSetStore);


							element.html(tpl);
							$compile(element.contents())(scope);
						});
					},
					controller: ['$scope','$element','$attrs','$transclude', function($scope, $element, $attrs, $transclude, CustomFields) {

						
						
						$scope.datePickerOpened = {};
				
						$scope.openDatePicker = function(id, $event) {
							$event.preventDefault();
							$event.stopPropagation();

							$scope.datePickerOpened[id] = true;
						};
						
					

					}]
					
				};		
			}]);