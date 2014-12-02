'use strict';

angular.module('GO').
				//Register the module
				config(['modulesProvider', 'settingsProvider', function(modulesProvider,  settingsProvider) {
						modulesProvider.addModule('email', 'E-mail', 'fa-envelope-o');
						
						settingsProvider.addPage({
							sref: 'settings.email.editProfile({contactId: "current"})',
							title: 'E-mail',
							icon: 'fa fa-envelope-o'
						});
					}]).
				config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
						
//						$urlRouterProvider.when('/contacts/contact/{id}', '/contacts/contact/{id}/detail');

						// Now set up the states
						$stateProvider
										.state('email', {
											url: "/email",
											templateUrl: 'modules/email/partials/main.html',
											controller: 'EmailController'
										})
										.state('email.folder', {
											url: "/account/{accountId:[0-9]*}/folder/{folderId:[0-9,]*}",
											templateUrl: 'modules/email/partials/folder.html',
											controller: 'FolderController'
										})
										.state('email.folder.message', {
											url: "/message/{threadId:[0-9,]*}",
											templateUrl: 'modules/email/partials/message.html',
											controller: 'MessageController'
										});
										
					}]);