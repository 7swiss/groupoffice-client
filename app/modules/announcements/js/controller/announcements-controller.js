'use strict';

/* Controllers */
angular.module('GO.controllers').
		controller('AnnouncementsController', ['$scope', 'Store', 'Model', 'Translate', 'Modules', function ($scope, Store, Model, Translate, Modules) {

				$scope.pageTitle = Translate.t('Announcements');


				$scope.announcementStore = new Store(
						'intermesh/announcements/announcement/store',
						new Model(
								'announcement',
								'intermesh/announcements/announcement'
								),
						{
							limit: 10,
							returnAttributes: '*, owner.username'
						});

				$scope.announcementStore.load();
				
				
				$scope.announcementsModule = Modules.getModule('announcements');


			}]);


