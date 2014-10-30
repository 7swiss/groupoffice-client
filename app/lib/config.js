GO.value('appTitle', 'TV Oosterplas ledengedeelte');

angular.module('GO')
		.run(function ($rootScope, appTitle, Utils) {

			//Utils.setBaseUrl("api.php");
		})
		.config(["TranslateProvider", function (TranslateProvider) {

				TranslateProvider.addTranslations("nl", {
					'Username': "Bondsnummer",
					"Contacts": "Leden"
				});
			}]);
