/**
 * @ngdoc filter
 * @name GO.core:apiRoute
 * @kind function
 *
 * @description
 * Translates a string into the configured language
 *
 * @param {string} text Text to translate
 * @returns {string} Translated text.
 *
 *
 */

angular.module('GO.core')
				.filter('apiRoute', ['Utils',function(Utils) {
						return function(route, params) {
							return Utils.url(route, params);
						};
					}]);