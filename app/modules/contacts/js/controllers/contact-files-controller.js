'use strict';

angular.module('GO.controllers').
		controller('ContactFilesController', ['Model', '$scope', '$stateParams', 'Utils', 'ShareModal','Store', '$state', function(Model, $scope, $stateParams, Utils, ShareModal, Store, $state) {
		
				//Contact model is defined in the parent scope of ContactsController			
				$scope.contact.readIf($stateParams.contactId).then(function() {
					
				});
				
				$scope.filesStore =  new Store(
						'contacts/'+$stateParams.contactId+'/files',
						{
							returnAttributes: 'id,name'
						});
						
				$scope.filesStore.load();
				
				$scope.flowInit = {
					target: Utils.url('upload'),
					permanentErrors: [404, 500, 501],
					maxChunkRetries: 1,
					chunkRetryInterval: 5000,
					simultaneousUploads: 4
				};
				
				$scope.uploadSuccess = function($file, $message){
					var result = angular.fromJson($message);			
					
//					console.log(result);
//					$scope.filesStore.items.push(result.data.file);

					var file = new Model('contacts/'+$stateParams.contactId+'/files');
					file.attributes.name = result.file;
					file.attributes.tempPath = result.file;
					
					file.save();
					
					
					$scope.filesStore.items.push(file);
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
		
		