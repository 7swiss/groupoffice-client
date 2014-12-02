'use strict';

/* Controllers */
angular.module('GO.controllers').
		controller('EmailController', ['$scope', '$state', 'Translate', 'Store', 'Model', 'Tags', 'CustomFields','Modules', 'PanelSwitcher','$sce','$http','Utils','$timeout', function($scope, $state, Translate, Store, Model, Tags, CustomFields, Modules, PanelSwitcher, $sce, $http, Utils, $timeout) {

				$scope.pageTitle = Translate.t('E-mail');

				/* For mobiles, switch list and details on state */
			
				$scope.panelSwitcher = new PanelSwitcher($scope, 'email');

				$scope.store = new Store(
						'email/accounts/2/threads',{
							limit: 10
						}
						);
				
				$scope.store.loadData = function(data){
					
					//for debug
//					for(var i=0,c=data.length;i<c;i++){
//						data[i].excerpt = null;
//					}
					
					Store.prototype.loadData.call(this, data);
					
					for(var i = 0, c = this.items.length; i < c; i++){
						if(this.items[i].excerpt === null){
							this.items[i].controllerRoute = 'email/accounts/2/messages';
							this.items[i].read(this.items[i].id,{returnAttributes:'threadId,body,excerpt'}, true).success(function(data){

							}.bind(this));
						}
					}
					
					
				}.bind($scope.store);
				
				
				
				//Todo put in service
				$scope.sync = {
					text: "Waiting...",
					percentage:100,
					active: true
				};
				
				var fetcher = function(){
					
					$scope.sync.active = true;
					
					$http.get(Utils.url('email/sync/2'))
							.success(function(result) {					
								
								$scope.sync.text = result.dbCount+"/"+result.imapCount;
								$scope.sync.percentage = parseInt((result.dbCount / result.imapCount) * 100);
						
								if(result.dbCount < result.imapCount){
									fetcher();
								}else
								{
									$scope.sync.active = false;
									$scope.sync.text = "Waiting...";
									
									$timeout(function(){
										fetcher();
									}.bind(this), 10000);
								}
								

							}.bind(this));
					
				};
				
				fetcher();
				


				//Will be used in child scope. We define it here so we can access
				//the properties if needed in the future.
				//Child scopes automatically inherit properties of the parents but
				//not the other way around.
//				$scope.message = new Model(
//						'email/accounts/1/mailbox/INBOX/messages'
//						);


				
			}]);


