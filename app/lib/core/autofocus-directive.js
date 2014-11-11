'use strict';

/**
 * @ngdoc directive
 * @name GO.core.autofocus
 * @element input
 * @function
 *
 * @description
 * Put autofocus on an input. The standard autofocus attribute doesn't work on
 * firefox
 *
 * @example
    <example module="GO.core">
     <file name="index.html">
      <input ng-Model="text" autofocus>
		 </file>
		</example>
 */

angular.module('GO.core')
				.directive('goAutofocus', ['$timeout',function($timeout) {
					return {
						scope: {
						    goAutofocus: '='            
						},
						link: function(scope, element) {
						
							scope.$watch('goAutofocus', function(value) {
								if(value || angular.isUndefined(value)){								
									$timeout(function() {
										element[0].focus();
									}, 500); //Delay to allow transition. Wierd stuff happens when you use transition (at least with transform: translateX and autofocus at the same time.
								}
							});

						}
					};
				}]);