angular.module('GO').config(['TranslateProvider', function(TranslateProvider) {
		
		TranslateProvider.addTranslations('nl', {
			'Yes' : 'Ja',
			'No' : 'Nee',
			'Edit': 'Bewerken',
			'Delete': 'Verwijderen',
			'Cancel': 'Annuleren',
			'Save': 'Opslaan',
			'Back': 'Terug',
			'OK' : 'OK',
			'Search': 'Zoeken',
			'Login' : 'Inloggen',
			'Username' : 'Gebruikersnaam',
			'Password' : 'Wachtwoord',
			'Remember username' : 'Gebruikersnaam onthouden',
			'Login to GroupOffice' : 'Inloggen bij GroupOffice',
			'Access denied': 'Geen toegang',
			"Are you sure you want to delete '{name}'?" : "Weet u zeker dat u '{name}' wilt verwijderen?"
		});

		
	}]);