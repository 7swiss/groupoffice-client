'use strict';

angular.module('GO').
		
		config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {


				// Now set up the states
				$stateProvider
						.state('message', {
							url: "/message/{timelineItemId:[0-9]*}",							
							controller: 'MessageController',
							template: '<div ng-init="openModal()"></div>'
						});
			}]);
