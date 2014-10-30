

GO.isEmpty = function(v) {				
			return v === "" || 
				v === 0  ||
				v === null ||
				angular.isUndefined(v);
		};

 angular.module('GO').run(function($rootScope) {
        $rootScope.isEmpty = GO.isEmpty;
    });
	