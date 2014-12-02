'use strict';

/* Controllers */
angular.module('GO.controllers').
		controller('ContactController', ['$scope', '$state', 'Translate', 'Store', 'Model', 'Tags', 'CustomFields','Modules', 'PanelSwitcher', function($scope, $state, Translate, Store, Model, Tags, CustomFields, Modules, PanelSwitcher) {

				$scope.pageTitle = Translate.t('Contacts');

				/* For mobiles, switch list and details on state */
			
				$scope.panelSwitcher = new PanelSwitcher($scope, 'contacts');

				$scope.store = new Store(
						'contacts',
						{
							returnAttributes: "id,name,thumbUrl,company.name"
						});
						
				$scope.store.load();


				//Will be used in child scope. We define it here so we can access
				//the properties if needed in the future.
				//Child scopes automatically inherit properties of the parents but
				//not the other way around.
				$scope.contact = new Model(
						'contacts',
						{
							returnAttributes: "*,thumbUrl,emailAddresses,phoneNumbers,dates,addresses[*, formatted],tags,customfields,company,employees[id, name, photoFilePath]"
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
						//label: Translate.t('Phone') + ' <i class="fa fa-users"></i>'
						label: Translate.t('Phone') + ' ' + Translate.t('Work')
					}, {
						value: 'work,cell',
						//label: Translate.t('Mobile') + ' <i class="fa fa-users"></i>'
						label: Translate.t('Mobile') + ' ' + Translate.t('Work')
					}, {
						value: 'home,voice',
//						label: Translate.t('Phone') + ' <i class="fa fa-home"></i>'
						label: Translate.t('Phone') + ' ' + Translate.t('Home')
					}, {
						value: 'home,cell',
//						label: Translate.t('Mobile') + ' <i class="fa fa-home"></i>'
						label: Translate.t('Mobile') + ' ' + Translate.t('Home')
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

				$scope.onSettingsPage = $state.is("settings.contacts.editProfile");


				$scope.save = function() {

					$scope.contact.save()
							.success(function(result) {
								//success

								
								$scope.syncWithStore(true);
								$state.go('contacts.contact.detail', {contactId: $scope.contact.id});
								

							});
				};


				$scope.syncWithStore = function(reloadStore) {
					var index = $scope.store.findIndexByAttribute('id', $scope.contact.id);

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
					
					
					$scope.isFilterActive = false;
				};
				
			
				$scope.closeSidePanelCallback = function() {
				
					var where = CustomFields.filterModelToWhereParameter($scope.customFilters);

					var tags = [];

					var l = $scope.filters.tags.length;

					if (l) {
						for (var i = 0; i < l; i++) {
							tags.push($scope.filters.tags[i].id);
						}

						where.push(['IN', 'tagLink.tagId', tags]);
					}

					if ($scope.filters.gender) {
						where.push({gender: $scope.filters.gender});
					}
					
					
					if($scope.filters.age){
						if($scope.filters.age.lt){		

							var date = new Date();
							date.setYear(date.getFullYear() - $scope.filters.age.lt);
							date.setHours(0);
							date.setMinutes(0);
							date.setSeconds(0);

							where.push(['AND', '>=',{"dates.date": date.toIntermeshApiFormat()}]);
						}

						if($scope.filters.age.gt){	

							var date = new Date();						
							date.setYear(date.getFullYear() - $scope.filters.age.gt);
							date.setHours(0);
							date.setMinutes(0);
							date.setSeconds(0);

							where.push(['AND', '<=',{"dates.date": date.toIntermeshApiFormat()}]);
						}
					}

					$scope.store.loadParams.where = where;

					$scope.isFilterActive = where.length > 0;

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
				
			
//				$scope.hasProjects = Modules.getModule('projects') !== false;
				
				
				Modules.getModule('contacts').then(function(module){
					$scope.contactsModule = module;
				});

				
			}]);


