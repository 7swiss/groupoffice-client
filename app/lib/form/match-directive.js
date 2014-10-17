'use strict';

/**
 * @ngdoc directive
 * @name GO.core.match
 * @element input
 * @function
 *
 * @description
 * Match two password fields
 *
 * @example

	 <example module="GO.core">
     <file name="index.html">
			<form name="userForm"  novalidate>
				<input type="password" ng-model="password" autocomplete="off" />
				<input type="password" name="passwordConfirm" ng-model="passwordConfirm"  im-match="password" autocomplete="off" />
				<p style="color:red" ng-show="userForm.passwordConfirm.$error.imMatch">The passwords don't match.</p>
			</form>
		</file>
	 </example>
 */
angular.module('GO.form')
    .directive('imMatch', function () {
        return {
            require: 'ngModel',
            restrict: 'A',
            scope: {
                imMatch: '='
            },
            link: function(scope, elem, attrs, ctrl) {
                scope.$watch(function() {
                    return (ctrl.$pristine && angular.isUndefined(ctrl.$modelValue)) || scope.imMatch === ctrl.$modelValue;
                }, function(currentValue) {
                    ctrl.$setValidity('imMatch', currentValue);
                });
            }
        };
    });