/**
 * @ngdoc filter
 * @name GO.core.Translate:t
 * @kind function
 *
 * @description
 * Translates a string into the configured language
 *
 * @param {string} text Text to translate
 * @returns {string} Translated text.
 *
 *
 *
 * @example

	 <example module="myTranslatedModule">
		<file name="index.html">
			<div ng-controller="TranslateController">
				<p>Try the translate service...</p>
				<button ng-click="translate('Yes');">Translate 'Yes' into Dutch.</button>
				<button ng-click="translate('No');">Translate 'No' into Dutch.</button>


				<p>You can also use a filter:<br /><br />

				Yes in Dutch is: {{"Yes" | t}}</p>
			</div>
		</file>
    <file name="script.js">
			angular.module('myTranslatedModule', ["GO.core"])
				.config(['TranslateProvider', function(TranslateProvider) {
						TranslateProvider.setLanguage('nl');

						TranslateProvider.addTranslations('nl', {
							'Yes': 'Ja',
							'No': 'Nee'
						});
					}])
				.controller('TranslateController', ['$scope', 'Translate', function($scope, Translate) {
						$scope.translate = function(msg) {
							alert(Translate.t(msg));
						};
					}]);
		 </file>
	 </example>


 */

angular.module('GO.core')
				.filter('t', ['Translate',function(Translate) {
						return function(key) {
							return Translate.t(key);
						};
					}]);

