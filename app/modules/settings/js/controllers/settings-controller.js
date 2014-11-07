'use strict';

/* Controllers */
angular.module('GO.controllers').
		controller('SettingsController', ['$scope', '$state', 'Translate', 'Store', 'Model', 'MessageBox', function($scope, $state, Translate, Store, Model, MessageBox) {

				$scope.pageTitle = Translate.t('Settings');


				//TODO add settins provider to register these
				$scope.settingsPages = [{
						sref:'settings.changePassword',
						title: 'Change password',
						icon: 'fa fa-lock'
				}
				,{
						sref:'settings.contacts.editProfile({contactId: "current"})',
						title: 'Edit profile',
						icon: 'fa fa-user'
				}
			];

				
			}]);