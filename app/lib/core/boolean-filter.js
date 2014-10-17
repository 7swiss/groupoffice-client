angular.module('GO.filters').filter('boolean', ['Translate', function(Translate) {
	return function(boolean) {
				return boolean ? Translate.t('Yes') : Translate.t('No');
	};
}]);
