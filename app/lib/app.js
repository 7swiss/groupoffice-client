'use strict';

// Declare app level module which depends on filters, and services
var GO = angular.module('GO', [
	//Intermesh Framework modules
	'GO.core', // http://GO.io/angular/docs and http://GO.io/php/docs
	'GO.form',
	'GO.data',
	'GO.infiniteScroll',
	'GO.MessageBox',
	'GO.MultiSelectField',
	'GO.ShareModal',
	'GO.StoreSelectModal',
	'GO.ImageUploadPlaceholder',
	'GO.customFields',
	'GO.softDeleteButton',
	'GO.collapsiblePanel',
	'GO.tags',
	'GO.modules',
	'GO.tabs',
	//Angular UI modules
	'ui.router', // http://angular-ui.github.io/ui-router/site/#/api/ui.router
	'ui.sortable',
	//Bootstrap ui
	'ui.bootstrap',
	'ui.select', // https://github.com/angular-ui/ui-select

	//Various
	'ngAnimate', // only enabled on elements with the "im-animate" class !
	'ngTouch',
//	'toggle-switch',
	'flow',
	'ngSanitize',
	'monospaced.elastic',
	'textAngular',
	//App modules
	'GO.filters',
	'GO.services',
	'GO.directives',
	'GO.controllers'
]).
		config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
				// For any unmatched url, redirect to /state1
				$urlRouterProvider.otherwise("/404");

				// Now set up the states
				$stateProvider
						.state('404', {
							url: "/404",
							templateUrl: "partials/404.html"
						})
						.state('login', {
							url: "",
							templateUrl: "partials/login.html",
							controller: 'LoginController'
						})
						.state('start', {
							url: "/start",
							templateUrl: "partials/start.html",
							controller: 'StartController'
						});

			}])

		.config(function ($httpProvider, $provide) {

			//to allow cookies in CORS XmlHttpRequests
			$httpProvider.defaults.withCredentials = true;
			$httpProvider.defaults.useXDomain = true;


			//If a user has previously logged in with "remember me" enabled an authorizationToken is stored in localstorage.
			//We must send that as a header: Authorization: Token SERIES TOKENSTR
			if (localStorage.authorizationToken) {
				$httpProvider.defaults.headers.common.Authorization = 'Token ' + localStorage.authorizationToken;
			}


			$provide.factory('myHttpInterceptor', ['$injector', '$q', function ($injector, $q) {
					return {
						response: function (response) {
							//When an authorization token was successfullu used the server will return a new one.
							//We will store this and delete the header from our requests.
							var authHeader = response.headers('Authorization');
							if (authHeader) {
								var matches = authHeader.match('Token (.*)');
								localStorage.authorizationToken = matches[1];

								//No need to resend this token now because use is authenticated by session
								delete $injector.get('$http').defaults.headers.common.Authorization;
							}

							var contentType = response.headers('Content-Type');

							if (contentType && contentType.indexOf('application/json') > -1) {
								if (response.data.success === false && response.data.exception) {
									$injector.get('MessageBox').alert(response.data.exception.message, "Error: " + response.data.exception.className);
								}
							}

							return response;
						},
						responseError: function (response) {
							var status = response.status;

							if (status === 403) {
								$injector.get('$state').go('login');
							} else
							{
								$injector.get('MessageBox').alert('Oops, a server error occurred', 'Error ' + status);
							}
							// otherwise
							return $q.reject(response);
						}
					};
				}]);

			$httpProvider.interceptors.push('myHttpInterceptor');
		})

		.config(['flowFactoryProvider', function (flowFactoryProvider) {
				flowFactoryProvider.defaults = {
					target: 'upload.php', //We don't know the URL yet so we configure this in logincontroller
					permanentErrors: [404, 500, 501],
					maxChunkRetries: 1,
					chunkRetryInterval: 5000,
					simultaneousUploads: 4
				};
//						flowFactoryProvider.on('catchAll', function(event) {
//							console.log('catchAll', arguments);
//						});
				// Can be used with different implementations of Flow.js
				// flowFactoryProvider.factory = fustyFlowFactory;
			}])
		.config(['TranslateProvider', function (TranslateProvider) {
				TranslateProvider.setLanguage('nl');
			}])

		.config(function ($animateProvider) {

			//only enable ngAnimate on elements with the "im-animate" class
			$animateProvider.classNameFilter(/im-animate/);
		})
		.config(function ($tooltipProvider) {
			$tooltipProvider.options({
				animation: false, // doesn't work with ngAnimate 1.3
				appendToBody: true,
				popupDelay: 0
			});
		})

		.config(function ($provide) {

			//monkey patch fo bug: https://github.com/angular-ui/bootstrap/commit/42cc3f269bae020ba17b4dcceb4e5afaf671d49b
			$provide.decorator('dateParser', function ($delegate) {

				var oldParse = $delegate.parse;
				$delegate.parse = function (input, format) {
					if (!angular.isString(input) || !format) {
						return input;
					}
					return oldParse.apply(this, arguments);
				};

				return $delegate;
			});
		})
		.run(function ($rootScope, appTitle, Utils) {
			FastClick.attach(document.body);


			//Special config
			$rootScope.title = appTitle;



			

		})
		.config(function (uiSelectConfig) {
			uiSelectConfig.theme = 'bootstrap';
		});





GO.value('appVersion', '7.0');


angular.module('GO.services', []);
angular.module('GO.directives', []);
angular.module('GO.filters', []);
angular.module('GO.controllers', []);
