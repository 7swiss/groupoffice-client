'use strict';

angular.module('GO.MultiSelectField', ['GO.core'])

		.directive('imMultiSelectField', ['$templateCache', '$http', 'Utils',function($templateCache, $http, Utils) {

			$templateCache.put("imMultiSelectField.html",
					'<div class="im-multiselect-field form-control">\
						<ul class="im-multiselect-list">\
							<li ng-if="!model.attributes.markDeleted" ng-repeat="model in modelAttribute">{{getModelAttributeDisplayName(model)}} <a ng-click="model.attributes.markDeleted=true"><i class="fa fa-trash-o"></i></a></li>\
						</ul>\
						\
						<input class="im-multiselect-input" type="text" ng-model="input" placeholder="{{inputPlaceholder}}" typeahead="model as model.typeahead.text for model in getModels()" typeahead-loading="typeaheadLoading" typeahead-on-select="addModel($item, $model, $label)" im-keypress="{13: \'addNewModel($event)\'}">\
						<i ng-show="typeaheadLoading" class="fa fa-refresh"></i>\
					</div>');

			return {
				restrict: 'E',
				scope: {
					modelAttribute: '=', //contact.attributes.tags
					modelAttributeDisplayName: '@', //name
					inputPlaceholder: '@', //Add tags...
					storeRoute: '@', //"IPE/addressbook/tag/store",
//					maxEntries: '@'
				},
				link: function(scope, element, attrs) {
					
//					var max;
//					if(attrs.maxEntries){
//						max = parseInt(attrs.maxEntries);
//					}else
//					{
//						max = -1;
//					}
					
//					console.log(scope.modelAttribute.length);


//					scope.isInputEnabled = function(){						
//						return max < 0 || !scope.modelAttribute || max > scope.modelAttribute.length;
//					};
					

					scope.input = "";
					scope.typeaheadLoading=false;
					
					scope.addModel = function($item) {

						if(!isSelected($item)){
							scope.modelAttribute.push($item);
						}
						
						scope.input="";
					};
					
					var isSelected = function(item){
						for(var i = 0, l = scope.modelAttribute.length; i < l; i++){
							if(scope.modelAttribute[i].attributes[scope.modelAttributeDisplayName] === item.attributes[scope.modelAttributeDisplayName]){
								return true;
							}
						}
						
						return false;
						
					};

					scope.addNewModel = function($event) {
						
						$event.preventDefault();
						
						if(attrs.autoCreate === "true"){
							var value = $event.target.value.trim();

							if(value !== ""){
								
								var newItem = {
									attributes: {									
									}
								};

								newItem.attribute[scope.modelAttributeDisplayName] = value;
								
								scope.modelAttribute.push(newItem);
							}
						}

						$event.target.value = "";
					};
					
					//Helper function for the template so we can have a variable display name
					scope.getModelAttributeDisplayName = function (model){
						return model.attributes[scope.modelAttributeDisplayName];
					};


					scope.getModels = function() {
						return $http.get(Utils.url(attrs.storeRoute, {searchQuery: scope.input}))
								.then(function(data) {
									
									//we need a generic property for the template so we will create model.typeahade.text based on the given modelAttributeDisplayName attribute
									for(var i=0, l = data.data.results.length; i<l; i++){
										data.data.results[i].typeahead = {text: data.data.results[i]['attributes'][scope.modelAttributeDisplayName]};
									}
									
									return data.data.results;
								});

					};

				},
				templateUrl: 'imMultiSelectField.html'
			};
		}]);