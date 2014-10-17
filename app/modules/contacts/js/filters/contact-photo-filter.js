angular.module('GO.filters').filter('contactPhoto', ['Utils', function(Utils) {
	return function(params) {
		
		var defaults ={
			w: 75,
			h: 100,
			zoomCrop:1
		};
		
		angular.extend(defaults, params);
		
		return Utils.url('Intermesh/Contacts/contact/thumb',defaults);			
	};
}]);


