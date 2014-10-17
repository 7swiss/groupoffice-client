angular.module('GO.filters').filter('encodeURIComponent',['$window',function($window) {
  
		return $window.encodeURIComponent;
  }]);