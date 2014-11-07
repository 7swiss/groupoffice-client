'use strict';

angular.module('GO').
				//Register the module
				config(['modulesProvider', function(modulesProvider) {
						modulesProvider.addModule('contacts', 'Contacts', 'fa-book');
					}]).
				config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
						
						$urlRouterProvider.when('/contacts/contact/{id}', '/contacts/contact/{id}/detail');

						// Now set up the states
						$stateProvider
										.state('contacts', {
											url: "/contacts",
											templateUrl: 'modules/contacts/partials/main.html',
											controller: 'ContactController'
										})
										
										
										
										.state('contacts.contact', {
											url: "/contact/{contactId:[0-9]*}",
											templateUrl: 'modules/contacts/partials/contact.html'
										})
										.state('contacts.contact.detail', {
											url: "/detail",
											templateUrl: 'modules/contacts/partials/contact-detail.html',
											controller: 'ContactDetailController'
										})
										
										.state('contacts.edit', {
											url: "/edit/{contactId:[0-9]*}",
											templateUrl: 'modules/contacts/partials/contact-edit.html',
											controller: 'ContactEditController'
										})
										.state('contacts.createCompany', {
											url: "/createCompany",
											templateUrl: 'modules/contacts/partials/contact-edit.html',
											controller: 'ContactEditController'
										})
										
										.state('contacts.contact.files', {
											url: "/files",
											templateUrl: 'modules/contacts/partials/contact-files.html',
											controller: 'ContactFilesController'
										})
										
										.state('contacts.contact.timeline', {
											url: "/comments",
											templateUrl: 'modules/contacts/partials/contact-timeline.html',
											controller: 'ContactTimelinesController'
										})
										.state('contacts.contact.timeline.edit', {
											url: "/edit/{timelineItemId:[0-9]*}",
											controller: "ContactTimelineController",
											template: '<div ng-init="openModal()"></div>'
										})
										.state('contacts.contact.timeline.message', {
											url: "/message/{messageId:[0-9]*}",							
											controller: 'MessageController',
											template: '<div ng-init="openModal()"></div>'
										})
										
										.state("settings.contacts",{
											url: '/settings/contacts',											
											controller: 'ContactController',
											template:'<div ui-view></div>'
										})
										
										.state("settings.contacts.editProfile",{
											url: '/{contactId:[0-9]*}',
											templateUrl: 'modules/contacts/partials/contact-edit.html',
											controller: 'ContactEditController'
										});
					}]);