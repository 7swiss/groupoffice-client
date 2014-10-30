'use strict';


angular.module('GO.controllers')

				.controller('LoginController', ['$scope', '$http', '$state', 'Utils', 'MessageBox','Translate', function($scope, $http, $state, Utils, MessageBox, Translate) {
						$scope.master = $scope.user = {
							username: '',
							password: '',
							remember: false
						};

						$scope.config = {url: Utils.baseUrl || "http://localhost/groupoffice-server/html/"};

						$scope.login = function(user) {

							//We set the base Group-Office URL given from the form.
							Utils.setBaseUrl($scope.config.url);

							var url = Utils.url('intermesh/auth/auth/login');

							$http.post(url, user)
											.success(function(data, status, header) {

												if (!data.success) {
													MessageBox.alert(Translate.t(data.errors[0]), Translate.t('Login failed'));
													
//													$scope.loginForm.username.$setValidity('badLogin', false);
											
												} else {
													
													//Returned when remember is enabled. We create an interceptor that adds the token.
//													if(data.authorizationToken){
//														localStorage.authorizationToken = data.authorizationToken;
//														//$http.defaults.headers.common.Authorization = 'Bearer '+data.token;
//													}
													
													//Set the security token returned by Group-Office that must be used in all requests to prevent
													//Cross site scripting attacks
//													Utils.setDefaultParams({
//														securityToken: data.securityToken
//													});

													$state.go('start');
												}
											});
						};

						$scope.reset = function() {
							$scope.user = angular.copy($scope.master);
						};
					}]);