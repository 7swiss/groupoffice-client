'use strict';

angular.module('GO.controllers').
		controller('ContactDetailController', ['$scope', '$stateParams', 'Utils', 'ShareModal',function($scope, $stateParams, Utils, ShareModal) {

				//Sharing dialog
				$scope.shareModal = new ShareModal(
						[{
							name:'readAccess',
							label: 'Read'
						},{
							name:'uploadAccess',
							label: 'Upload files'
						},{
							name:'editAccess',
							label: 'Edit'
						},{
							name:'deleteAccess',
							label: 'Delete'
						}],
						'\\Intermesh\\Modules\\Contacts\\Model\\Contact'
					);
			
							
				//Contact model is defined in the parent scope of ContactsController			
				$scope.contact.read($stateParams.contactId).then(function() {
					if ($scope.contact.attributes.photoFilePath) {
						$scope.photoUrl = Utils.url('Intermesh/Contacts/contact/thumb', {
							w: 75,
							h: 100,
							zoomCrop: 1,
							contactId: $scope.contact.attributes.id
						});
					} else
					{
						$scope.photoUrl = "";
					}
				});

			}]);