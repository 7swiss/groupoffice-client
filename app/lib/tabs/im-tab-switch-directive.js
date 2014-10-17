'use strict';

angular.module('GO.tabs')

		.directive('imTabSwitch', [function () {
				return {
					restrict: 'A',
//			priority: 0,
					require: "^imTabs",
					scope:true,
					link: function (scope, element, attrs, imTabs) {
						var tabIndex = imTabs.getNextTabIndex();
						
						element.on('click', function(){
							imTabs.switch(tabIndex);
						});
						
						//not working
//						element.attr("ui-sref-active", "active");
						
					}
				};
			}]);