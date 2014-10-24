
 angular.module('GO').run(function($rootScope) {
        $rootScope.isEmpty = function(v) {				
			return v === "" || 
				v === 0  ||
				v === null ||
				angular.isUndefined(v);
		};
    });
	