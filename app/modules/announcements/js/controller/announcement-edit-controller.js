'use strict';

/* Controllers */
angular.module('GO.controllers')
		.controller('AnnouncementEditController', ['$scope', '$modal', '$state', '$stateParams', function ($scope, $modal, $state, $stateParams) {
				$scope.openModal = function () {
					$modal.open({
						templateUrl: 'modules/announcements/partials/announcement-edit.html',
						controller: 'AnnouncementEditModalController',
						size:'lg',
						resolve: {
							announcementStore: function () {
								return $scope.announcementStore;
							}
						}
					}).result.then(function (result) {						

						if (result) {

							$scope.announcementStore.reload();

							return $state.go("^");
						}
					}, function () {
						return $state.go("^");
					});
				};
			}])

		.controller('AnnouncementEditModalController', ['$scope', 'Model', 'MessageBox', 'Translate', '$stateParams', '$state', 'announcementStore', function ($scope, Model, MessageBox, Translate, $stateParams, $state, announcementStore) {

				var announcement = announcementStore.findModelByAttribute('id', $stateParams.announcementId);

				if (announcement) {
					$scope.announcement = announcement;
				} else
				{
					$scope.announcement = new Model(
							'announcements'							
							);
				}

				$scope.announcement.read($stateParams.announcementId).then(function () {

				});

				$scope.save = function () {
					$scope.announcement.save()
							.success(function (result) {

								$scope.$close(result);

							});
				};

				$scope.cancel = function () {

					if ($scope.announcement.attributes.id) {
						$scope.announcement.resetAttributes();
					}

					$scope.$dismiss();
				};


			}]);
