'use strict';

angular.module('GO.controllers').
		controller('ContactTimelinesController', ['Model', '$scope', '$stateParams', 'Utils', 'ShareModal','Store', '$state', function(Model, $scope, $stateParams, Utils, ShareModal, Store, $state) {
		
				//Contact model is defined in the parent scope of ContactsController			
				$scope.contact.readIf($stateParams.contactId).then(function() {
					
				});
				
				$scope.timelineStore =  new Store(
						'intermesh/timeline/item/store',
						new Model(
								'item',
								'intermesh/timeline/item'
								),
						{
							limit: 5,
							where:[{contactId: $stateParams.contactId}],
							returnAttributes: '*, owner.username, imapMessage.*, imapMessage.excerpt, imapMessage.currentUserIsAuthor'
						});
						
				$scope.timelineStore.load();
			
			}]);
		