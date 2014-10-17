'use strict';

angular.module('GO.tabs')

		.directive('imTabView', [function () {


				return {
					restrict: 'A',
					require: "^imTabs",
					link: function (scope, element, attrs, imTabs) {						
						//when tabs are switched this element is the entering view.
						var cls = imTabs.left ? 'left' : 'right';						
						element.addClass('go-tab-view im-animate '+cls);						
						
						//register this view element as the leaving view for when the user clicks on the next tab link
						imTabs.leavingView = element;
					}
				};
			}]);