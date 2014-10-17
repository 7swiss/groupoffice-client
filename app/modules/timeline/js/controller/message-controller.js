'use strict';

/* Controllers */
angular.module('GO.controllers')
		.controller('MessageController', ['$scope', '$modal', '$state', '$stateParams', '$rootScope', function ($scope, $modal, $state, $stateParams, $rootScope) {
				$scope.openModal = function () {
					var modalInstance = $modal.open({
//						windowClass: 'im-modal-without-animation',
						templateUrl: 'modules/timeline/partials/message.html',
						controller: 'MessageModalController',
						size: 'lg'
					});
					
					var dismiss = true;
							
					modalInstance.result.then(function (result) {
						
						dismiss = false;
						
						if(result !== 'stay'){
							return $state.go("^");
						}

					}, function (result) {
						
						dismiss = false;
						
						
						return $state.go("^");
					});
					
					
					
					//when back is pressed or another link				
					var unsubscribe = $rootScope.$on('$stateChangeStart',
						function (event, toState, toParams, fromState, fromParams) {

							unsubscribe();
							
							if(dismiss){
								modalInstance.close('stay');
							}
							
							
						});
				};
				
				
			}])

		.controller('MessageModalController', ['$scope', 'Model', 'MessageBox', 'Translate', '$stateParams', '$state', function ($scope, Model, MessageBox, Translate, $stateParams, $state) {


				$scope.message = new Model(
						'message',
						'intermesh/imap/message', {
							returnAttributes: "from,to,cc,subject,date,html,references[id,date,from],attachments[*,url]"
						}
				);

				$scope.message.read($stateParams.messageId).then(function () {

				});

				$scope.cancel = function () {


					$scope.$dismiss();
				};


			}]);
