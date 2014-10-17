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
				.directive('autofocus', ['$timeout',function($timeout) {
					return {
						scope: {
							trigger: '@focus',			
						    autofocus: '='
            
						},
						link: function(scope, element) {							
							
							if(scope.autofocus!==false){							
								scope.$watch('trigger', function(value) {
										$timeout(function() {
											element[0].focus();
										});
								});
							}
						}
					};
				}]);