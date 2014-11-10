'use strict';

angular.module('GO.loadmask', [])

				.directive('goLoadmask', function() {
					return {
						restrict: 'E',
						scope: {
							active: '=active'
						},
						template: '<div class="go-loadmask" ng-show="active">\
							<div class="go-loadmask-screen"></div>\
							<div class="go-loadmask-msg"><i class="fa fa-spinner go-rotate"></i> {{"Please wait" | t}}...</div>\
						</div>'
					};
				});


