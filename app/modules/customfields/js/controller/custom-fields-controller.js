'use strict';

/* Controllers */
angular.module('GO.controllers').

				controller('CustomFieldsController', ['$scope', '$state', '$http', 'Translate', 'Utils', function($scope,$state, $http, Translate, Utils) {

						$scope.pageTitle = Translate.t('Custom fields');
						
						$scope.models = [];
						
						$scope.$state = $state;
						
						$http.get(Utils.url("intermesh/customFields/model/getModelNames")).then(function(response){
							
		
							$scope.models = response.data.results;
						});

					
					}]);


