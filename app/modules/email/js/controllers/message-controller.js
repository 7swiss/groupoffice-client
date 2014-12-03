'use strict';

angular.module('GO.controllers')
				.controller('MessageController', ['$scope', '$state', '$stateParams', 'EmailMessage','Store','$sce', function($scope, $state, $stateParams, EmailMessage,Store, $sce) {
						
						

//						$scope.message.afterDelete = function(message, result) {
//							$scope.store.remove($scope.store.findIndexByAttribute("uid", $scope.message.uid));
//							$state.go('messages');
//						};						

						$scope.toggleMessageFlag = function(){							
							var lastMessage = $scope.threadStore.items[0];
							$scope.lastMessage.flagged = !lastMessage.flagged;
							$scope.lastMessage.save();
						};
						
//						$scope.message.read($stateParams.uid).then(function(data){

							//Mark message as read after 3s.
//							if($scope.message.seen==false){
//								$timeout(function(){
//									$scope.message.toggleFlag("seen", false).then(function(data){								
//										var storeMessage = $scope.store.findSingleByAttribute("uid", $scope.message.uid);
//										storeMessage["seen"] = true;
//									});
//								}, 3000);
//							}
							
//						});		
						
						
						$scope.threadStore = new Store('email/accounts/'+$stateParams.accountId+'/folders/'+$stateParams.folderId+'/threads/'+$stateParams.threadId, {limit: 5});
						
						$scope.threadStore.createModel = function(){
							return new EmailMessage('email/accounts/'+$stateParams.accountId+'/folders/'+$stateParams.folderId+'/messages');
						};
						
						$scope.threadStore.loadData = function(data){
							
//							console.log(data);
							
							//Avoid ng-sanitize errors because we sanitize on the server
							for(var i=0,c=data.length;i<c;i++){
								data[i].body = $sce.trustAsHtml(data[i].body);
								data[i].quote = $sce.trustAsHtml(data[i].quote);
							}
					
							Store.prototype.loadData.call(this, data);
							
						}.bind($scope.threadStore);
					
						$scope.threadStore.load().then(function(data){
							
							//set the last message so we can do flag and seen operations on that message.
							$scope.lastMessage = $scope.threadStore.items[0];	
//							$scope.lastMessage.$controllerRoute = 'email/accounts/'+$stateParams.accountId+'/folders/'+$stateParams.folderId+'/messages';							
						});
					}]);
				
