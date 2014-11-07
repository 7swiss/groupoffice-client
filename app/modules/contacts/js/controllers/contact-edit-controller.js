'use strict';

angular.module('GO.controllers').
		controller('ContactEditController', ['$scope', '$state', '$stateParams', 'Utils', '$http', '$q','Alerts', 'Translate', function($scope, $state, $stateParams, Utils, $http, $q, Alerts, Translate) {

//				var defaultPhotoUrl = "";

				$scope.cancel = function() {
					if ($scope.contact.attributes.id) {

						$scope.contact.resetAttributes();

						$state.go('contacts.contact', {contactId: $scope.contact.attributes.id});
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
						$scope.contact.attributes.isCompany = true;
					}

					if(!$scope.contact.attributes.isCompany){
						$scope.contact.attributes.name = $scope.contact.attributes.firstName;

						if ($scope.contact.attributes.middleName !== "") {
							$scope.contact.attributes.name += " " + $scope.contact.attributes.middleName;
						}

						if ($scope.contact.attributes.lastName !== "") {
							$scope.contact.attributes.name += " " + $scope.contact.attributes.lastName;
						}
					}
				});


				/* Multiple fields */
				$scope.addEmailAddress = function() {
					$scope.contact.attributes.emailAddresses.push({attributes: {type: "work"}});
				};

				$scope.addPhoneNumber = function() {
					$scope.contact.attributes.phoneNumbers.push({attributes: {type: "work,voice"}});
				};
				
				$scope.addAddress = function() {
					$scope.contact.attributes.addresses.push({attributes: {type: "work"}});
				};
				
				$scope.addDate = function() {
					$scope.contact.attributes.dates.push({attributes: {type: "anniversary", date: new Date()}});
				};



				/* End multiple fields */




				$scope.changeFullName = function() {
					
					if($scope.contact.attributes.name) {
						var parts = $scope.contact.attributes.name.split(' ');

						$scope.contact.attributes.firstName = parts.shift();

						if (parts.length > 1) {
							$scope.contact.attributes.middleName = parts.shift();
						} else
						{
							$scope.contact.attributes.middleName = "";
						}

						$scope.contact.attributes.lastName = parts.join(' ');
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