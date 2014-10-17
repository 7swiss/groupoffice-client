'use strict';

angular.module('GO').
		//Register the app
		config(['modulesProvider', function(modulesProvider) {
				modulesProvider.addModule('customfields', 'Custom fields', 'fa-database');
			}]).
		config(['$stateProvider', function($stateProvider) {

				// Now set up the states
				$stateProvider
						.state('customfields', {
							url: "/customfields",
							templateUrl: 'modules/customfields/partials/main.html',
							controller: 'CustomFieldsController'
						})
						.state('customfields.model', {
							url: "/model/{modelName:[^/]*}",
							templateUrl: 'modules/customfields/partials/model.html',
							controller: 'ModelController'
						})
						.state('customfields.model.fieldset', {
							url: "/fieldSet/{fieldSetId:[0-9]*}",
							controller: "FieldSetController",
							template: '<div ng-init="openModal()"></div>'
						})
						.state('customfields.model.fields', {
							url: "/fields/{fieldSetId:[0-9]*}",
							templateUrl: 'modules/customfields/partials/fields.html',
							controller: 'FieldsController'
						})
						.state('customfields.model.fields.field', {
							url: "/field/{fieldId:[0-9]*}",
							controller: "FieldController",
							template: '<div ng-init="openModal()"></div>'
						});
			}]);		