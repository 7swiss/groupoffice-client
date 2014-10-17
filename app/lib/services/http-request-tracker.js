'use strict';

angular.module('GO.services')
				.factory('httpRequestTracker', ['$http', function($http) {

						var httpRequestTracker = {};
						httpRequestTracker.hasPendingRequests = function() {
							return $http.pendingRequests.length > 0;
						};

						return httpRequestTracker;
					}]);