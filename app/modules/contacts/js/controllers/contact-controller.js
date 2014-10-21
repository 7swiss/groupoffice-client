'use strict';

/* Controllers */
angular.module('GO.controllers').
		controller('ContactController', ['$scope', '$state', 'Translate', 'Store', 'Model', 'Tags', 'CustomFields','Modules', function($scope, $state, Translate, Store, Model, Tags, CustomFields, Modules) {

				$scope.pageTitle = Translate.t('Contacts');

				/* For mobiles, switch list and details on state */
				$scope.showList = function() {
					return $state.is('contacts');
				};

				$scope.store = new Store(
						'Intermesh/Contacts/contact/store',
						new Model(
								'contact',
								'Intermesh/Contacts/contact'
								),
						{
							returnAttributes: "id,name,photoFilePath,company.name"
						});


				//Will be used in child scope. We define it here so we can access
				//the properties if needed in the future.
				//Child scopes automatically inherit properties of the parents but
				//not the other way around.
				$scope.contact = new Model(
						'contact',
						'Intermesh/Contacts/contact',
						{
							returnAttributes: "*,emailAddresses,phoneNumbers,dates,addresses[*, formatted],tags,customfields,company,employees[id, name, photoFilePath]"
						});




				/* Select options for detail and edit controller */

				$scope.emailAddressOptions = [{
						value: 'work',
						label: Translate.t('Work')
					}, {
						value: 'home',
						label: Translate.t('Home')
					}, {
						value: 'billing',
						label: Translate.t('Billing')
					}, {
						value: 'other',
						label: Translate.t('Other')
					}];


				$scope.phoneNumberOptions = [{
						value: 'work,voice',
						label: Translate.t('Phone') + ' <i class="fa fa-users"></i>'
					}, {
						value: 'work,cell',
						label: Translate.t('Mobile') + ' <i class="fa fa-users"></i>'
					}, {
						value: 'home,voice',
						label: Translate.t('Phone') + ' <i class="fa fa-home"></i>'
					}, {
						value: 'home,cell',
						label: Translate.t('Mobile') + ' <i class="fa fa-home"></i>'
					}];

				$scope.dateOptions = [{
						value: 'birthday',
						label: Translate.t('Birthday')
					}, {
						value: 'anniversary',
						label: Translate.t('Anniversary')
					}, {
						value: 'other',
						label: Translate.t('Other')
					}];


				$scope.findDateLabel = function(type) {

					for (var i = 0, l = $scope.dateOptions.length; i < l; i++) {
						if ($scope.dateOptions[i].value === type) {
							return $scope.dateOptions[i].label;
						}
					}

					return type;
				};

				/* End select options for detail and edit controller */




				$scope.save = function() {

					$scope.contact.save()
							.success(function(result) {
								//success

								$scope.syncWithStore(true);


								$state.go('contacts.contact', {contactId: $scope.contact.attributes.id});

							})
							.error(function(result) {

								//error
								for (var attributeName in result.model.validationErrors) {
//															MessageBox.alert(Translate.t(result.model.validationErrors[attributeName].code));
								}
							});
				};


				$scope.syncWithStore = function(reloadStore) {
					var index = $scope.store.findIndexByAttribute('id', $scope.contact.attributes.id);

					if (index > -1) {
						$scope.store.items[index].attributes = angular.copy($scope.contact.attributes);
					} else if (reloadStore) {
						$scope.store.reload();
					}
				};



				/* filter panel */

				$scope.customFilters = {};
				var defaultFilters = {
					gender: null,
					tags: []
				};

				$scope.filters = angular.copy(defaultFilters);

				$scope.genderFilterOptions = [
					{
						value: null,
						label: Translate.t('Disabled')
					}, {
						value: "M",
						label: Translate.t('Male')
					}, {
						value: "F",
						label: Translate.t('Female')
					}];

				$scope.resetFilters = function() {
					$scope.customFilters = {};
					$scope.filters = angular.copy(defaultFilters);
				};
				
			
				$scope.closeSidePanelCallback = function() {
					
				
					var where = CustomFields.filterModelToWhereParameter($scope.customFilters);

					var tags = [];

					var l = $scope.filters.tags.length;

					if (l) {
						for (var i = 0; i < l; i++) {
							tags.push($scope.filters.tags[i].attributes.id);
						}

						where.push(['IN', 'tagLink.tagId', tags]);
					}

					if ($scope.filters.gender) {
						where.push({gender: $scope.filters.gender});
					}

					$scope.store.loadParams.where = where;


					$scope.store.reset();
					$scope.store.load();

				};


				var Tabs = function(){
					this.left = true;
					this.tabIndex = 0;
				};
				
				Tabs.prototype.switch = function(tabIndex){
					this.left = this.tabIndex < tabIndex;					
					this.tabIndex = tabIndex;
				};

				$scope.tabs = new Tabs();
				
			
				$scope.hasProjects = Modules.getModule('projects') !== false;

				
			}]);


