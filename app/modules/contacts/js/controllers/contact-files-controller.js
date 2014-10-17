'use strict';

angular.module('GO.controllers').
		controller('ContactFilesController', ['Model', '$scope', '$stateParams', 'Utils', 'ShareModal','Store', '$state', function(Model, $scope, $stateParams, Utils, ShareModal, Store, $state) {
		
				//Contact model is defined in the parent scope of ContactsController			
				$scope.contact.readIf($stateParams.contactId).then(function() {
					
				});
				
				$scope.filesStore =  new Store(
						'intermesh/contacts/files/store',
						new Model(
								'file',
								'Intermesh/Contacts/files'
								),
						{
							modelId: $stateParams.contactId,
							returnAttributes: 'id,name'
						});
						
				$scope.filesStore.load();
				
				$scope.flowInit = {
					target: Utils.url('intermesh/contacts/files/upload',{modelId: $stateParams.contactId}),
					permanentErrors: [404, 500, 501],
					maxChunkRetries: 1,
					chunkRetryInterval: 5000,
					simultaneousUploads: 4
				};
				
				$scope.uploadSuccess = function($file, $message){
//					var result = angular.fromJson($message);					
//					$scope.filesStore.items.push(result.data.file);
				};
				
				
				
				$scope.renameFile = function($event, file){
					$event.stopPropagation();
					$event.preventDefault();
					
					file.rename = true;
				};
				
				$scope.saveFile = function($event, file){
					
					$event.stopPropagation();
					$event.preventDefault();
					
					file.save().then(function(){
						file.rename=false;
					});
					
				};
			}]);
		
		