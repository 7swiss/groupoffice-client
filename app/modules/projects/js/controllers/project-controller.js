'use strict';

/* Controllers */
angular.module('GO.controllers').
		controller('ProjectController', ['$scope', '$state', 'Translate', 'Store', 'Model', 'Tags', 'CustomFields','Modules', 'PanelSwitcher', function($scope, $state, Translate, Store, Model, Tags, CustomFields, Modules, PanelSwitcher) {

			$scope.pageTitle = Translate.t('Projects');

			/* For mobiles, switch list and details on state */
			$scope.panelSwitcher = new PanelSwitcher($scope, 'projects');

			$scope.store = new Store('projects',{returnAttributes: "id,name"});

			//Will be used in child scope. We define it here so we can access the properties if needed in the future.
			//Child scopes automatically inherit properties of the parents but not the other way around.
			$scope.project = new Model('projects',{returnAttributes: "*,"});


//				$scope.onSettingsPage = $state.is("settings.contacts.editProfile");


			$scope.save = function() {
				$scope.project.save()
					.success(function(result) {
						//success
						$scope.syncWithStore(true);
						$state.go('projects.project.detail', {projectId: $scope.project.id});
					});
			};

			$scope.syncWithStore = function(reloadStore) {
				var index = $scope.store.findIndexByAttribute('id', $scope.project.id);

				if (index > -1) {
					$scope.store.items[index].attributes = angular.copy($scope.project.attributes);
				} else if (reloadStore) {
					$scope.store.reload();
				}
			};


//				/* filter panel */
//
//				$scope.customFilters = {};
//				var defaultFilters = {
//					gender: null,
//					tags: []
//				};
//
//				$scope.filters = angular.copy(defaultFilters);
//
//				$scope.genderFilterOptions = [
//					{
//						value: null,
//						label: Translate.t('Disabled')
//					}, {
//						value: "M",
//						label: Translate.t('Male')
//					}, {
//						value: "F",
//						label: Translate.t('Female')
//					}];

				$scope.resetFilters = function() {
					$scope.customFilters = {};
					$scope.filters = angular.copy(defaultFilters);
					$scope.isFilterActive = false;
				};
				
			
//				$scope.closeSidePanelCallback = function() {
//				
//					var where = CustomFields.filterModelToWhereParameter($scope.customFilters);
//
//					var tags = [];
//
//					var l = $scope.filters.tags.length;
//
//					if (l) {
//						for (var i = 0; i < l; i++) {
//							tags.push($scope.filters.tags[i].id);
//						}
//
//						where.push(['IN', 'tagLink.tagId', tags]);
//					}
//
//					if ($scope.filters.gender) {
//						where.push({gender: $scope.filters.gender});
//					}
//					
//					
//					if($scope.filters.age){
//						if($scope.filters.age.lt){		
//
//							var date = new Date();
//							date.setYear(date.getFullYear() - $scope.filters.age.lt);
//							date.setHours(0);
//							date.setMinutes(0);
//							date.setSeconds(0);
//
//							where.push(['AND', '>=',{"dates.date": date.toIntermeshApiFormat()}]);
//						}
//
//						if($scope.filters.age.gt){	
//
//							var date = new Date();						
//							date.setYear(date.getFullYear() - $scope.filters.age.gt);
//							date.setHours(0);
//							date.setMinutes(0);
//							date.setSeconds(0);
//
//							where.push(['AND', '<=',{"dates.date": date.toIntermeshApiFormat()}]);
//						}
//					}
//
//					$scope.store.loadParams.where = where;
//
//					$scope.isFilterActive = where.length > 0;
//
//					$scope.store.reset();
//					$scope.store.load();
//
//				};
//
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
								
				Modules.getModule('projects').then(function(module){
					$scope.projectsModule = module;
				});

				
			}]);


