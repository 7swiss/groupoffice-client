'use strict';

angular.module('GO.controllers').
		controller('ContactEditController', ['$scope', '$state', '$stateParams', 'Utils', '$http', '$q','Alerts', 'Translate', function($scope, $state, $stateParams, Utils, $http, $q, Alerts, Translate) {

//				var defaultPhotoUrl = "";

				$scope.cancel = function() {
					if ($scope.contact.id) {

						$scope.contact.resetAttributes();

						$state.go('contacts.contact.detail', {contactId: $scope.contact.id});
					} else
					{
						$state.go('^');
					}
				};


				if($scope.onSettingsPage) {
					$scope.save = function() {

						$scope.contact.save()
								.success(function(result) {
										$scope.contactForm.$setPristine();
								
										Alerts.addAlert(Translate.t("Your changes have been saved"), "info");
								});
					};
				}

				$scope.contact.readIf($stateParams.contactId).then(function() {
					if($state.is('contacts.createCompany')){
						$scope.contact.isCompany = true;
					}

					if(!$scope.contact.isCompany){
						$scope.contact.name = $scope.contact.firstName;

						if ($scope.contact.middleName !== "") {
							$scope.contact.name += " " + $scope.contact.middleName;
						}

						if ($scope.contact.lastName !== "") {
							$scope.contact.name += " " + $scope.contact.lastName;
						}
					}
				});


				/* Multiple fields */
				$scope.addEmailAddress = function() {
					$scope.contact.emailAddresses.push({attributes: {type: "work"}});
				};

				$scope.addPhoneNumber = function() {
					$scope.contact.phoneNumbers.push({attributes: {type: "work,voice"}});
				};
				
				$scope.addAddress = function() {
					$scope.contact.addresses.push({attributes: {type: "work"}});
				};
				
				$scope.addDate = function() {
					$scope.contact.dates.push({attributes: {type: "anniversary", date: new Date()}});
				};



				/* End multiple fields */




				$scope.changeFullName = function() {
					
					if($scope.contact.name) {
						var parts = $scope.contact.name.split(' ');

						$scope.contact.firstName = parts.shift();

						if (parts.length > 1) {
							$scope.contact.middleName = parts.shift();
						} else
						{
							$scope.contact.middleName = "";
						}

						$scope.contact.lastName = parts.join(' ');
					}
				};

				$scope.toggleName = function(){
					$scope.showNameParts = !$scope.showNameParts;
				};
				$scope.showNameParts = false;



				$scope.dateOpened = {};
				$scope.openDate = function(date, $event) {
					$event.preventDefault();
					$event.stopPropagation();

					date.isOpen = true;
				};
				
				
				
				
				$scope.getCompanies = function(input){
					return $http.get(Utils.url('intermesh/contacts/contact/store', {
						searchQuery: input, 
						where: [{'isCompany': true}],
						returnAttributes:'name,id'
					}))
								.then(function(data) {	
									
																	
									if(!data.data.results.length){
										data.data.results.push({attributes: {'name': input, 'isCompany': true}});
									}
									
									return data.data.results;
								});
				};
				 $scope.datePickerOptions = {
    formatYear: 'yy',
    startingDay: 1
  };

			}]);