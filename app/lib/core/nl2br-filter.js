angular.module('GO.core')
		.filter('nl2br', ['$sce', function($sce) {
			return function(msg) {
				var msg = (msg + '').replace(/([^>\r\n]?)(\r\n|\n\r|\r|\n)/g, '$1<br />$2');
				return $sce.trustAsHtml(msg);
			};
		}]);