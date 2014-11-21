'use strict';

angular.module('GO.tabs')

		.directive('goTabSwitch', [function () {
				return {
					restrict: 'A',
//			priority: 0,
					require: "^goTabs",
					scope:true,
					link: function (scope, element, attrs, goTabs) {
						var tabIndex = goTabs.getNextTabIndex();
						
						element.on('click', function(){
							goTabs.switch(tabIndex);
						});
						
						//not working
//						element.attr("ui-sref-active", "active");
						
					}
				};
			}]);