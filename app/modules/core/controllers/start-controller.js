'use strict';

angular.module('GO.controllers')
		.controller('StartController', ['$scope', 'Modules', '$http', 'Utils', function($scope, Modules, $http, Utils) {
				Modules.getModules().then(function(modules){$scope.modules = modules;});
		
				$scope.modulesService = Modules;
				
				$scope.logout = function() {
					//for "remember my login"
					delete localStorage.authorizationToken;

					var url = Utils.url('intermesh/auth/auth/logout');

					$http.post(url, {ajax: 1})
							.success(function(data, status, header) {
//								$state.go('login');
								
								//make sure page is cleared
								document.location = "";
							});
				};
				
			}]);