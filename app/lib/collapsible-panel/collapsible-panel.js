'use strict';

/**
 * @ngdoc directive
 * @name GO.sidePanel:imSidePanel
 * @element im-side-panel
 *
 * @description
 * Create a slide in panel on the left.
 *
 
 * @param {boolean} isActive Expression that returns true when panel should activate.
 * @param {string} title The panel title
 *
 * @example
   <example module="SidePanelExample">
	<file name="index.html">

	   <a class="btn btn-primary" ng-click="sidePanelActive=true">Open panel</a>

	   <im-side-panel is-active="sideBarActive" on-open='openSidePanel()' on-close='closeSidePanel()'>

			<div class="im-side-nav-title">{{'Filters'| t}}

				<div class="im-side-nav-buttons">
					<a ng-click="resetFilters()" tooltip="{{'Reset' | t}}" tooltip-placement='bottom'><i class="fa fa-undo"></i></a>
					<a ng-click="imSideNav.close()" tooltip="{{'Close' | t}}" tooltip-placement='bottom'><i class="fa fa-times"></i></a>
				</div>
			</div>

			<div class="go-scrollable-panel">

				<h4>{{'Tags'| t}}</h4>
				<ul class="list-group">
					<label class="list-group-item" ng-class="{selected: tag.attributes.checked}" ng-repeat="tag in tagStore.items" im-infinite-use-window="true">
						<input type="checkbox" ng-model="tag.attributes.checked"> {{tag.attributes.name}}
					</label>  
				</ul>

				<im-custom-fields-filter im-server-model="IPE\Modules\Contacts\Model\ContactCustomFields" im-model="customFilters"></im-custom-fields-filter>
			</div>
		</im-side-panel>
	</file>
	<file name="script.js">
		angular.module('SidePanelExample', [])
			.controller('SidePanelExampleController', ['$scope', function($scope) {
					$scope.sidePanelActive = false;
				}]);
	 </file>
   </example>
 */
angular.module('GO.collapsiblePanel', []).
		directive('goCollapsiblePanel', ['$compile', function($compile) {

				return {
					scope: {
						isActive: '=',
						onOpen: '&?',
						onClose: '&?',
						collapseFrom: '=?'
					},
					transclude: true,
					restrict: 'E',
					link: function(scope, element, attr) {
						
						if(!scope.collapseFrom){
							scope.collapseFrom = 'lg';
						}
						
						var mask = angular.element('<div class="go-mask" ng-class="{active: isActive}"></div>');
						element.append(mask);
						$compile(mask)(scope);								

						scope.isActive = false;

						scope.$watch('isActive', function(newValue, oldValue) {
					
							if(newValue){	
								
								if(scope.onOpen){
									scope.onOpen();
								}

								mask.bind('click', scope.close);
							}else
							{
								if(oldValue){
									mask.unbind('click', scope.close);

									if(scope.onClose){						
										scope.onClose();
									}
								}
							}							
						});
						
						scope.close = function() {		
						
							
							scope.$apply(function(){
								scope.isActive = false;
							});
						
						};
						
						scope.$parent.imSideNav = scope;

					},
					template: '<div class="go-col collapse-{{collapseFrom}}" ng-class="{active: isActive}"><ng-transclude></ng-transclude></div>'
				};
			}]);