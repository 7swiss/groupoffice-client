
angular.module('GO.form')
		.directive('imSubmit', [
			function() {

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