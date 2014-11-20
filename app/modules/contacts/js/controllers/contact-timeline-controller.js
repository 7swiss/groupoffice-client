'use strict';

angular.module('GO.controllers').
		controller('ContactTimelinesController', ['Model', '$scope', '$stateParams', 'Utils', 'ShareModal','Store', '$state', function(Model, $scope, $stateParams, Utils, ShareModal, Store, $state) {
		
				//Contact model is defined in the parent scope of ContactsController			
				$scope.contact.readIf($stateParams.contactId).then(function() {
					
				});
				
				$scope.timelineStore =  new Store(
						'contacts/'+$stateParams.contactId+'/timeline',
						{
							limit: 5,
							returnAttributes: '*, authorThumbUrl, owner.username'
						});
						
				$scope.timelineStore.load();
			
			}]);
		