'use strict';

angular.module('GO').
				//Register the app
				config(['modulesProvider',function(modulesProvider) {
						modulesProvider.addModule('notes', 'Notes','fa-edit');
					}]).

				config(['$stateProvider', function($stateProvider) {

						// Now set up the states
						$stateProvider
							.state('notes', {
								url: "/Notes",
								templateUrl: 'modules/notes/partials/main.html',
								controller: 'NoteController'
							})
							.state('notes.edit', {
								url: "/Notes/edit/{noteId:[0-9]*}",
								controller: 'NoteEditController',
								template: '<div ng-init="openModal()"></div>'
							});
					}]);