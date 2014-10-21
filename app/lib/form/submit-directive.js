
angular.module('GO.form')
		.directive('imSubmit', ['$log',
			function($log) {

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
							
							form.submitted = true;							
							$element.addClass('submitted');
								
							if($scope.$parent[formName].$valid){
								$scope.imSubmit();
							}else{
								
								//otherwise popups don't show in modal windows.
								$scope.$parent.$digest();
							}
						});

					}
				};
			}
		]);