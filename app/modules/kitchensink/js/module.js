'use strict';

angular.module('GO').
		//Register the app
		config(['modulesProvider', function(modulesProvider) {
				modulesProvider.addModule('kitchensink', 'Kitchen Sink', 'fa-thumbs-o-up');
			}]).
		config(['$stateProvider', function($stateProvider) {

				// Now set up the states
				$stateProvider
						.state('kitchensink', {
							url: "/kitchensink",
							templateUrl: 'modules/kitchensink/partials/main.html',
							controller: "KitchenSinkController"
						})
						.state('kitchensink.links', {
							url: "/links",
							templateUrl: 'modules/kitchensink/partials/links.html'
						})
						.state('kitchensink.list', {
							url: "/list",
							templateUrl: 'modules/kitchensink/partials/list.html',
							controller: "KsListController"
						})
						.state('kitchensink.card', {
							url: "/card",
							templateUrl: 'modules/kitchensink/partials/card.html'
//							controller: "KsListController"
						})
						.state('kitchensink.toolbar', {
							url: "/toolbar",
							templateUrl: 'modules/kitchensink/partials/toolbar.html',							
							controller: "KsToolbarController"
						})
						
						.state('kitchensink.tabs', {
							url: "/tabs",
							templateUrl: 'modules/kitchensink/partials/tabs.html'
						})
						.state('kitchensink.tabs.tab1', {
							url: "/tab1",
							templateUrl: 'modules/kitchensink/partials/tab1.html'
						})
						.state('kitchensink.tabs.tab2', {
							url: "/tab2",
							template:'<p>Tab 2 content</p>'
						})
						.state('kitchensink.tabs.tab3', {
							url: "/tab2",
							template:'<p>Tab 2 content</p>'
						})
						.state('kitchensink.form', {
							url: "/form",
							templateUrl: 'modules/kitchensink/partials/form.html',
							controller:"KsFormController"
						})
						.state('kitchensink.loadmask', {
							url: "/loadmask",
							templateUrl: 'modules/kitchensink/partials/loadmask.html',
							controller:"KsLoadmaskController"
						})
						.state('kitchensink.collapsiblePanel', {
							url: "/collapsible-panel",
							templateUrl: 'modules/kitchensink/partials/collapsible-panel.html'
//							controller:"KsLoadmaskController"
						})
						
					
			}]);