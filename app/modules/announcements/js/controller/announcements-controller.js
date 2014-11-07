'use strict';

/* Controllers */
angular.module('GO.controllers').
		controller('AnnouncementsController', ['$scope', 'Store', 'Model', 'Translate', 'Modules', function ($scope, Store, Model, Translate, Modules) {

				$scope.pageTitle = Translate.t('Announcements');


				$scope.announcementStore = new Store(
						'announcements',						
						{
							limit: 10,
							returnAttributes: '*, owner.username, thumbUrl'
						});

				$scope.announcementStore.load();
				
				
				Modules.getModule('announcements').then(function(module){
					$scope.announcementsModule = module;
				});
				
//				console.log($scope.announcementsModule);

			}]);


