
angular.module('GO.form')
		.directive('imSubmit', ['$log','Alerts','Translate',
			function($log, Alerts, Translate) {

				return {
					// restrict to an element tag type.
					restrict: 'A',
					// create a copy of the scope, inheriting the data
					scope: {
						imSubmit: '&'
					},
					// require that the element is a child of form
					require: ['form'],
					// executed as the controller for the directive
					controller: function($scope, $element, $attrs) {
						
						var formName = $element.attr('name');

						if(!formName)
							throw "form must have a name!";
						
						var form = $element.controller("form");
						
						$element.on('submit', function($event){	
							
							//Hack for autocomplete event
							
//							var arr = $element.find('input');						
//							for(var i=0,l=arr.length;i<l;i++){
//								console.log(arr[i]);
//								$log.info("Firing input,change and keydown listeners in im-submit directive to fix autocomplete problem");
//								if(arr[i].autocomplete){
//									arr[i].triggerHandler('input').triggerHandler('change').triggerHandler('keydown');
//								}
//							}
							
	
							
							//ng-submitted was added in angularjs 1.3
							//$submitted too
							//
//							$element.addClass('submitted');
//							form.submitted = true;	
								
							if($scope.$parent[formName].$valid){
								$scope.imSubmit();
							}else{
								
								//otherwise popups don't show in modal windows.
								$scope.$parent.$digest();
								
//								console.log(form);
								
								//find first form element with error and focus it.
								for(var key in form){
									var el = form[key];
									if(angular.isObject(el) && angular.isDefined(el.$valid) && !el.$valid){
										document.forms[form.$name].elements[el.$name].focus();
										break;
									}
								}
								
								//document.forms[$scope.form.$name].elements[$scope.formEl.$name].focus();
								
								Alerts.addAlert(Translate.t("The form contains errors. Please check your input."), "danger");
							}
						});

					}
				};
			}
		]);