'use strict';

/* Controllers */
angular.module('GO.controllers').

				controller('ApiBrowseController', ['Store', '$scope', '$http', 'Utils', function(Store, $scope, $http, Utils) {

						$scope.pageTitle = 'API browser';


						$http.get(Utils.url("intermesh/apiBrowser/browse/controllers"))
										.success(function(data) {

											console.log(data);

											$scope.controllers = data.results;
						});

						$scope.getParams=[{
							name: '',
							value:''
						}];

						$scope.json ='';

						$scope.response="";

						$scope.requestMethod="GET";
						
						$scope.setAction = function(action){
							$scope.response="";
							$scope.getParams=[];
							for(var i=0,max=action.getParams.length;i<max;i++){
								$scope.getParams.push({
									name:action.getParams[i].name,
									value:action.getParams[i].defaultValue
								});
							}
							
							$scope.route = action.route;
						};

						$scope.request = function(requestMethod){

							var json = $scope.json != '' ? angular.fromJson($scope.json) : {};
							
							console.log(json);
							
							var params = {};
							for(var i=0;i<$scope.getParams.length;i++){
								if($scope.getParams[i].name !== ""){
									params[$scope.getParams[i].name]=$scope.getParams[i].value;
								}
							}
							

							if(requestMethod==="GET"){

								$http.get(Utils.url($scope.route, params))
											.success(function(data) {
												//console.log(data);
												$scope.response = data;
								});

							}else
							{
								$http.post(Utils.url($scope.route, params), json)
											.success(function(data) {
												//console.log(data);
												$scope.response = data;
								});
							}
						};

					}]);