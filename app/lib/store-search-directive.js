'use strict';

angular.module('GO.directives')

				.directive('goStoreSearch', function() {
					return {
						restrict: 'E',
						scope: {
							store: '=store'
						},
						templateUrl: 'partials/store/search.html'
					};
				});


