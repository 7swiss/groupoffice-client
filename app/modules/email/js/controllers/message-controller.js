'use strict';

angular.module('GO.controllers')
				.controller('MessageController', ['$scope', '$state', '$stateParams', '$timeout','Store','$sce', function($scope, $state, $stateParams, $timeout,Store, $sce) {
						
						

//						$scope.message.afterDelete = function(message, result) {
//							$scope.store.remove($scope.store.findIndexByAttribute("uid", $scope.message.attributes.uid));
//							$state.go('messages');
//						};						

//						$scope.toggleMessageFlag = function(flag){
//							
//							//set the seen flag (mark as read). When done then update the store of the list
//							$scope.message.toggleFlag(flag).then(function(data){								
//								var storeMessage = $scope.store.findSingleByAttribute("uid", $scope.message.attributes.uid);
//								storeMessage[flag] = $scope.message.attributes[flag];
//							});
//						};
						
//						$scope.message.read($stateParams.uid).then(function(data){

							//Mark message as read after 3s.
//							if($scope.message.attributes.seen==false){
//								$timeout(function(){
//									$scope.message.toggleFlag("seen", false).then(function(data){								
//										var storeMessage = $scope.store.findSingleByAttribute("uid", $scope.message.attributes.uid);
//										storeMessage["seen"] = true;
//									});
//								}, 3000);
//							}
							
//						});		
						
						
						$scope.threadStore = new Store('email/accounts/2/threads/'+$stateParams.threadId, {limit: 5});
						
						$scope.threadStore.onLoad = function(data){

							//Avoid ng-sanitize errors because we sanitize on the server
							for(var i=0,c=data.length;i<c;i++){
								data[i].attributes.body = $sce.trustAsHtml(data[i].attributes.body);
								data[i].attributes.quote = $sce.trustAsHtml(data[i].attributes.quote);
							}
							
							return data;
						};
						
//						$scope.threadStore.load();

					}]);
				
