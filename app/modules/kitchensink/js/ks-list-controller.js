'use strict';

/* Controllers */
angular.module('GO.controllers').
		controller('KsListController', ['$scope', 'Store', function ($scope, Store) {

				$scope.store = new Store(
						'contacts',
						{
							returnAttributes: "id,name"
						});

			}]);


