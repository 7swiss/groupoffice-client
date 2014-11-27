'use strict';

angular.module('GO.controllers').
		controller('ProjectDetailController', ['$scope', '$stateParams', 'Utils', 'ShareModal',function($scope, $stateParams, Utils, ShareModal) {

				//Sharing dialog
				$scope.shareModal = new ShareModal(
						[{
							name:'readAccess',
							label: 'Read'
						},{
							name:'editAccess',
							label: 'Edit'
						},{
							name:'deleteAccess',
							label: 'Delete'
						}],
						'\\Intermesh\\Modules\\Projects\\Model\\Project'
					);
			
							
				//Project model is defined in the parent scope of ProjectController			
				$scope.project.read($stateParams.contactId).then(function() {

				});
				
	
			}]);