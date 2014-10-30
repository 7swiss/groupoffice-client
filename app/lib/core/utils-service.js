'use strict';
/**
 * @ngdoc service
 * @name GO.core.Utils
 *
 * @description
 * Common utilities
 */
angular.module('GO.core').
				service('Utils', [function() {

						var Utils = function() {
							this.baseUrl = localStorage.baseUrl || "api.php";

							//Use sessionStorage from browser so it survives browser reloads
							this.defaultParams = angular.fromJson(sessionStorage.defaultParams);
						};


						Utils.prototype.setBaseUrl = function(url) {

							//Use localStorage to remember it for the user
							this.baseUrl = localStorage.baseUrl = url;//url.replace(/^\s+|[\s\/]+$/g, '') + '/';
						};


						Utils.prototype.setDefaultParams = function(defaultParams) {
							this.defaultParams=defaultParams;

							sessionStorage.defaultParams=angular.toJson(defaultParams);
						};

						/**
							* @ngdoc method
							* @name GO.core.Utils#url
							* @methodOf GO.core.Utils
							* @description
							* Create a URL to the API server
							*
							* @param {string} route The controller route. Eg. intermesh/auth/auth/login
							* @param {object=} Key value pair with GET parameters. If the value is not a string it will be converted to JSON.
							* @returns {string} URL The Full url
							*/
						Utils.prototype.url = function(route, params) {
							if (!route && !params)
								return this.baseUrl;
							var url = this.baseUrl + "?r="+route;

							params = params || {};

							angular.extend(params, this.defaultParams);

							if (params) {
								for (var name in params) {
									if(typeof params[name] !== 'string') {								
										params[name]=angular.toJson(params[name]);							
									}
									
									url += "&" + name + "=" + encodeURIComponent(params[name]);
								}
							}
							return url;
						};

						Utils.prototype.promiseSuccessDecorator = function(promise){
							promise.success = function(fn) {
								promise.then(function(response) {
									fn(response);
								});
								return promise;
							};

							promise.error = function(fn) {
								promise.then(null, function(response) {
									fn(response);
								});
								return promise;
							};
						}

						return new Utils;
					}]);