'use strict';

/* Controllers */
angular.module('GO.controllers').
		controller('EmailController', ['$scope', '$state', 'Translate', 'Store', 'Model', 'Tags', 'CustomFields','Modules', 'PanelSwitcher','$sce','$http','Utils','$timeout', function($scope, $state, Translate, Store, Model, Tags, CustomFields, Modules, PanelSwitcher, $sce, $http, Utils, $timeout) {

				$scope.pageTitle = Translate.t('E-mail');

				/* For mobiles, switch list and details on state */
			
				$scope.panelSwitcher = new PanelSwitcher($scope, 'email');

				$scope.accountStore = new Store(
						'email/accounts',{
							limit: 0,
							returnAttributes: '*,folders'
						}
						);
				
				
				$scope.accountStore.load().then(function(data){
					
					var firstAccount = data.store.items[0];
					
					$state.go('email.folder', {accountId: firstAccount.id, folderId: firstAccount.folders[0].id});
				});
			}]);


