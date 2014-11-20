'use strict';

/* Controllers */
angular.module('GO.controllers').
		controller('EmailController', ['$scope', '$state', 'Translate', 'Store', 'Model', 'Tags', 'CustomFields','Modules', 'PanelSwitcher','$sce', function($scope, $state, Translate, Store, Model, Tags, CustomFields, Modules, PanelSwitcher, $sce) {

				$scope.pageTitle = Translate.t('E-mail');

				/* For mobiles, switch list and details on state */
			
				$scope.panelSwitcher = new PanelSwitcher($scope, 'email');

				$scope.store = new Store(
						'email/accounts/2/threads',{
							limit: 10
						}
						);
				
				


				//Will be used in child scope. We define it here so we can access
				//the properties if needed in the future.
				//Child scopes automatically inherit properties of the parents but
				//not the other way around.
//				$scope.message = new Model(
//						'email/accounts/1/mailbox/INBOX/messages'
//						);


				
			}]);


