'use strict';

/* Controllers */
angular.module('GO.controllers').
		controller('SettingsController', ['$scope', '$state', 'Translate', 'Store', 'Model', 'MessageBox', 'PanelSwitcher', 'settings', function ($scope, $state, Translate, Store, Model, MessageBox, PanelSwitcher, settings) {

				$scope.pageTitle = Translate.t('Settings');

				$scope.panelSwitcher = new PanelSwitcher($scope, 'settings');



				//TODO add settins provider to register these
				$scope.settingsPages = settings;
				
				
						/*[{
						sref: 'settings.changePassword',
						title: 'Change password',
						icon: 'fa fa-lock'
					}
					, {
						sref: 'settings.contacts.editProfile({contactId: "current"})',
						title: 'Edit profile',
						icon: 'fa fa-user'
					}, {
						sref: 'settings.accounts',
						title: 'Accounts',
						icon: 'fa fa-accounts'
					}
				];*/


			}]);