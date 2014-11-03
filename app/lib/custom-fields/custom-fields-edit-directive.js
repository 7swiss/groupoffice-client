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
						
						tpl +=  '<div class="go-card"><h1>'+fieldSet.attributes.name+'</h1>';
				
						for(var n = 0, cl = fieldSet.attributes.fields.length; n < cl; n++){
							var field = fieldSet.attributes.fields[n];
							tpl += buildFunctions[field.attributes.type](field);
						}
								
						tpl += '</div>';
						
					}
					
					return tpl;
							
							
				};
				
				var buildFunctions = {
					text: function(field){
						return '<div class="form-group">\
							<label for="'+field.attributes.databaseName+'">'+field.attributes.name+'</label>\
								<input id="'+field.attributes.databaseName+'" name="'+field.attributes.databaseName+'" type="text" maxlength="'+field.attributes.data.maxLength+'" ng-model="imModel.attributes.customfields.attributes[\''+field.attributes.databaseName+'\']" placeholder="'+field.attributes.placeholder+'" ng-required="'+(field.attributes.required ? 'true' : 'false')+'" class="form-control" />\
								<im-show-error for="'+field.attributes.databaseName+'" im-model="imModel.attributes.customfields"></im-show-error>\
						</div>';
					},
					
					textarea: function(field){
						return '<div class="form-group">\
							<label for="'+field.attributes.databaseName+'">'+field.attributes.name+'</label>\
								<textarea id="'+field.attributes.databaseName+'" name="'+field.attributes.databaseName+'" maxlength="'+field.attributes.data.maxLength+'" ng-model="imModel.attributes.customfields.attributes[\''+field.attributes.databaseName+'\']" placeholder="'+field.attributes.placeholder+'" ng=required="'+(field.attributes.required ? 'true' : 'false')+'" class="form-control" msd-elastic="\n"></textarea>\
								<im-show-error for="'+field.attributes.databaseName+'" im-model="imModel.attributes.customfields"></im-show-error>\
						</div>';
					},
					
					select: function(field){
						return '<div class="form-group">\
							<label for="'+field.attributes.databaseName+'">'+field.attributes.name+'</label>\\n\
						<select class="form-control" ng-model="imModel[field.attributes.databaseName]" ng-options="option.value as option.label for option in field.attributes.data.options"></select>\
								<!--<ui-select name="'+field.attributes.databaseName+'" ng-model="imModel.attributes.customfields.attributes[\''+field.attributes.databaseName+'\']">\
											<ui-select-match class="ab-multi-input-select" placeholder="{{field.attributes.placeHolder}}">{{$select.selected.value}}</ui-select-match>\
											<ui-select-choices repeat="item.value as item in field.attributes.data.options | filter: $select.search">\
												<div ng-bind-html="item.value | highlight: $select.search"></div>\
											</ui-select-choices>\
										</ui-select>-->\
								<im-show-error for="'+field.attributes.databaseName+'" im-model="imModel.attributes.customfields"></im-show-error>\
						</div>';
					},
					
					checkbox: function(field){
						return '<div class="form-group"><div class="checkbox">\
							<label>\
								<input id="cf_{{field.attributes.id}}" type="checkbox" ng-model="imModel.attributes.customfields.attributes[\''+field.attributes.databaseName+'\']" /> '+field.attributes.name+'\
							</label>\
						</div></div>';
					},
					
					date: function(field){
						return '<div class="form-group">\
							<label for="'+field.attributes.databaseName+'">'+field.attributes.name+'</label>\
							<div class="input-group" style="width:300px">\
								<input name="'+field.attributes.databaseName+'" id="cf_{{field.attributes.id}}" type="text" class="form-control"  ng-model="imModel.attributes.customfields.attributes[\''+field.attributes.databaseName+'\']" datepicker-popup="dd-MM-yyyy" is-open="datePickerOpened[field.attributes.id]" close-text="{{\'Close\' | t}}" ng-click="openDatePicker(field.attributes.id, $event)" />\
								<!--<span class="input-group-btn">\
									<button type="button" class="btn btn-default" ng-click="openDatePicker(field.attributes.id, $event)"><i class="fa fa-calendar"></i></button>\
								</span>-->\
							<im-show-error for="'+field.attributes.databaseName+'" im-model="imModel.attributes.customfields"></im-show-error></div>\
						</div>';
					},
					number: function(field){
						return '<div class="form-group">\
							<label for="'+field.attributes.databaseName+'">'+field.attributes.name+'</label>\
								<input im-numeric id="cf_{{field.attributes.id}}" name="'+field.attributes.databaseName+'" type="text" ng-model="imModel.attributes.customfields.attributes[\''+field.attributes.databaseName+'\']" placeholder="{{field.attributes.placeholder}}" ng-required="field.attributes.required" class="form-control" />\
								<im-show-error for="'+field.attributes.databaseName+'" im-model="imModel.attributes.customfields"></im-show-error>\
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