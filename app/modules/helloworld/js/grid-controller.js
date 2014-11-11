'use strict';

/* Controllers */
angular.module('GO.controllers').
		controller('GridController', ['$scope', 'Store', function ($scope, Store) {

				$scope.gridOptions = {};
				
				
				/**
				* @ngdoc property
				* @name infiniteScrollPercentage
				* @propertyOf ui.grid.class:GridOptions
				* @description This setting controls at what percentage of the scroll more data
				* is requested by the infinite scroll
				*/
				$scope.gridOptions.infiniteScrollPercentage = 15;

				$scope.gridOptions.columnDefs = [
					{name: 'id', width: 50, field: 'attributes.id'},
					{name: 'name', width: 100, field: 'attributes.name'},
					{name: 'company', width: 100, field: 'attributes.company.attribute.name'},
				];

				$scope.gridOptions.onRegisterApi = function (gridApi) {					
					gridApi.infiniteScroll.on.needLoadMoreData($scope, function () {
						
						
						$scope.store.nextPage().then(function(){
							$scope.gridOptions.data = $scope.store.items;
							
							gridApi.infiniteScroll.dataLoaded();
						});
								
					});
				};
				$scope.store = new Store(
						'contacts',
						{
							returnAttributes: "id,name,thumbUrl,company.name"
						});

				

				$scope.gridOptions.data = $scope.store.items;
				$scope.store.load();

//				$http.get('/data/10000_complex.json')
//						.success(function (data) {
//							$scope.gridOptions.data = data;
//						});

			}]);


