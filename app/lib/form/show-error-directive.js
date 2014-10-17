/*ng-class=\"{ in: isOpen(), fade: animation() }*/
angular.module('GO.form')
		.directive('imShowError', ['Translate', '$parse', '$sce','$timeout',
			function(Translate, $parse, $sce, $timeout) {

				return {
					// restrict to an element tag type.
					restrict: 'E',
					// create a copy of the scope, inheriting the data
					scope: {
						'for': '@',
						imModel: '=?'
					},
					// require that the element is a child of form
					require: '^form',
					template: '\
							<div class="error-balloon bottom" ng-class="{active: hasErrors()}">\
								<div class="error-balloon-arrow"></div>\
								<div class="error-balloon-inner">\
									<div class="error" ng-if="invalid" ng-repeat="(errorKey, invalid) in formEl.$error" ng-bind-html="showError(errorKey)"></div>\
								</div>\
							</div>\
						',

					// executed as the controller for the directive
					controller: function($scope, $element, $attrs) {
						$scope.form = $element.controller("form");


						$scope.formEl = $scope.form[$attrs.for];
						
						if(!$scope.formEl)
							throw $attrs.for+' form element not found!';

						var serverError = null;
						var messages = {};
						
						if( $attrs.imMessages){
							var messagesGetter = $parse($attrs.imMessages);
							
							messages = messagesGetter();
						}
						
						$scope.hasErrors = function(){			
			
							return !$scope.formEl.$valid && ($scope.formEl.$dirty || $scope.form.submitted);
						};

						if ($scope.imModel) {
							
							$scope.$watch('imModel.validationErrors["' + $attrs.for + '"]', function(newValue, oldValue) {


								if (newValue) {
									
									
									
									serverError = newValue;
									
									var currentValue = $scope.imModel.attributes[$attrs.for];

									$scope.formEl.$setValidity('server', false);									
									
									var unregister = $scope.$watch('imModel.attributes["' + $attrs.for + '"]', function(newValue, oldValue) {
										
										if(currentValue !== newValue){
											
											//clear server error when user inputs a new value
											
											
											$timeout(function(){
												$scope.formEl.$setValidity('server', true);
												serverError = null;
												delete $scope.imModel.validationErrors[$attrs.for];				


												unregister();
											});
										}
									});									
									
								}
							});
						}

						var getServerError = function() {
							
							if(messages[serverError.code]){
								return messages[serverError.code];
							}

							switch (serverError.code) {
								case 'unique':
									return Translate.t('This name is already taken'); //TODO Custom error messages
									
								case 'required':									
									return Translate.t('This field is required');
									
								case 'weakPassword':
									//	{"code":"weakPassword","info":[{"minLength":6},{"requireUpperCase":true},["requireNumber"],["requireSpecialChars"]]}	
									var msg = Translate.t('The password is not strong enough.');
									
									msg += "<ul>";
									if(serverError.info.minLength){
										msg += '<li>'+Translate.t("It must be at least {minLength} characters long.").replace(
												'{minLength}', serverError.info.minLength)+'</li>';
									}
									
									if(serverError.info.minUniqueChars){
										msg += '<li>'+Translate.t("It must be at least {minUniqueChars} unique characters.").replace(
												'{minUniqueChars}', serverError.info.minUniqueChars)+'</li>';
									}
									
									if(serverError.info.requireUpperCase){
										msg += '<li>'+Translate.t("It must have an uppercase character.")+'</li>';
									}
									
									if(serverError.info.requireLowerCase){
										msg += '<li>'+Translate.t("It must have a lowercase character.")+'</li>';
									}
									
									if(serverError.info.requireSpecialChars){
										msg += '<li>'+Translate.t("It must have a special character like '!@#$%^&*()'.")+'</li>';
									}
									
									if(serverError.info.requireNumber){
										msg += '<li>'+Translate.t("It must have a number in it.")+'</li>';
									}
									
									msg += "</ul>";
									
									
									return $sce.trustAsHtml(msg);
									
									
								default:
									return angular.toJson(serverError);
							}

						};

						$scope.showError = function(errorKey) {
							
							if(messages[errorKey]){
								return messages[errorKey];
							}

							switch (errorKey) {
								case 'required':
									return Translate.t('This field is required');
									
								case 'imMatch':
									return Translate.t('The values don\'t match');
									
								case 'email':
									return Translate.t('The e-mail address is invalid');

								case 'server':

									return getServerError();

									break;

								default:
									return errorKey;
							}

						};

					}
				};
			}
		]);