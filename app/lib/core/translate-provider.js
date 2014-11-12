/**
 * @ngdoc service
 * @name GO.core.Translate
 *
 * @description
 * Translate text with this service and provider
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

				Yes in Dutch is: {{"Yes" | goT}}</p>
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
				.provider('Translate', [function TranslateProvider() {

						var translations = {};

						var language = 'nl';

						this.setLanguage = function(lang){
							language=lang;
						};

						this.addTranslations = function(lang, newTranslations) {

							if (!translations[lang])
								translations[lang] = {};

							angular.extend(translations[lang], newTranslations);
						};

						this.$get = [function() {

								return {
									language: language,
									translations: translations,

									/**
									* @ngdoc method
									* @name GO.core.Translate#t
									* @methodOf GO.core.Translate
									* @description
									* Translates a string into the configured language
									*
									* @param {string} text Text to translate
									* @returns {string} Translated text.
									*/

									t : function(text) {
										if(!this.translations[this.language] || !this.translations[this.language][text]){
											if(language!=='en'){
//												console.log("WARNING: Translation missing for '"+text+"' in language '"+this.language+"'");
											}
											return text;
										}

										return this.translations[this.language][text];
									}
								};
							}];
					}]);

