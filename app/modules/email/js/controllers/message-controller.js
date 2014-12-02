'use strict';

angular.module('GO.controllers')
				.controller('MessageController', ['$scope', '$state', '$stateParams', '$timeout','Store','$sce', function($scope, $state, $stateParams, $timeout,Store, $sce) {
						
						

//						$scope.message.afterDelete = function(message, result) {
//							$scope.store.remove($scope.store.findIndexByAttribute("uid", $scope.message.uid));
//							$state.go('messages');
//						};						

//						$scope.toggleMessageFlag = function(flag){
//							
//							//set the seen flag (mark as read). When done then update the store of the list
//							$scope.message.toggleFlag(flag).then(function(data){								
//								var storeMessage = $scope.store.findSingleByAttribute("uid", $scope.message.uid);
//								storeMessage[flag] = $scope.message[flag];
//							});
//						};
						
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
						
						
						$scope.threadStore = new Store('email/accounts/2/threads/'+$stateParams.threadId, {limit: 5});
						
						$scope.threadStore.loadData = function(data){
							
//							console.log(data);
							
							//Avoid ng-sanitize errors because we sanitize on the server
							for(var i=0,c=data.length;i<c;i++){
								data[i].body = $sce.trustAsHtml(data[i].body);
								data[i].quote = $sce.trustAsHtml(data[i].quote);
							}
					
							Store.prototype.loadData.call(this, data);
							
						}.bind($scope.threadStore);
					

					}]);
				
