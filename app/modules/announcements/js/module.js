'use strict';

angular.module('GO').
				//Register the module
				config(['modulesProvider', function(modulesProvider) {
						modulesProvider.addModule('announcements', 'Announcements', 'fa-newspaper-o');
					}]).
						
				config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
						
						
						// Now set up the states
						$stateProvider
										.state('announcements', {
											url: "/announcements",
											templateUrl: 'modules/announcements/partials/main.html',
											controller: 'AnnouncementsController'
										})
								
										.state('announcements.edit', {
											url: "/edit/{announcementId:[0-9]*}",
											controller: "AnnouncementEditController",
											template: '<div ng-init="openModal()"></div>'
										});
									}]);