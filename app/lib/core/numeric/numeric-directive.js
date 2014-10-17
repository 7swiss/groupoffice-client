angular.module('GO.core').directive('imNumeric', function($filter, $locale) {
    return {
        restrict: 'A',
        require: 'ngModel',
        link: function(scope, element, attr, ngModel) {
			
			element.addClass('im-numeric');
			
			//Autoselect value
			element.bind('focus', function(event, el){				
				event.target.select();
			});
         
            var decN = scope.$eval(attr.decimalPlaces); // this is the decimal-places attribute
 
         
            // http://stackoverflow.com/questions/10454518/javascript-how-to-retrieve-the-number-of-decimals-of-a-string-number
            function theDecimalPlaces(num) {
                   var match = (''+num).match(/(?:\.(\d+))?(?:[eE]([+-]?\d+))?$/);
                   if (!match) { return 0; }
                      return Math.max(
                       0,
                       // Number of digits right of decimal point.
                       (match[1] ? match[1].length : 0)
                       // Adjust for scientific notation.
                       - (match[2] ? +match[2] : 0));
            }
         
            function fromUser(text) {			
				
				if(text === ""){
					//empty text means clear the value
					return null;
				}
				
                var x = text.split($locale.NUMBER_FORMATS.GROUP_SEP).join('');
                var y = x.split($locale.NUMBER_FORMATS.DECIMAL_SEP).join('.');
                                            
                return Number(y); // return a model-centric value from user input y
            }
 
            function toUser(n) {
                return $filter('number')(n, decN); // locale-aware formatting
            }
         
            ngModel.$parsers.push(fromUser);
            ngModel.$formatters.push(toUser);
         
            element.bind('blur', function() {
                element.val(toUser(ngModel.$modelValue));
            });
         
            element.bind('focus', function() {            
                var n = ngModel.$modelValue;
                var formattedN = $filter('number')(n, theDecimalPlaces(n));
                element.val(formattedN);
            });
         
        } // link
    }; // return
}); // module