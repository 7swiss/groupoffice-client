'use strict';

/* Controllers */
angular.module('GO.controllers')
		.controller('ContactTimelineController', ['$scope', '$modal', '$state', '$stateParams', function ($scope, $modal, $state, $stateParams) {
				$scope.openModal = function () {
					$modal.open({
						templateUrl: 'modules/contacts/partials/contact-timeline-item.html',
						controller: 'ContactTimelineModalController',
						resolve: {
							timelineStore: function () {
								return $scope.timelineStore;
							}
						}
					}).result.then(function (result) {						

						if (result) {

							$scope.timelineStore.reload();

							return $state.go("^");
						}
					}, function () {
						return $state.go("^");
					});
				};
			}])

		.controller('ContactTimelineModalController', ['$scope', 'Model', 'MessageBox', 'Translate', '$stateParams', '$state', 'timelineStore', function ($scope, Model, MessageBox, Translate, $stateParams, $state, timelineStore) {

				var timelineItem = timelineStore.findModelByAttribute('id', $stateParams.timelineItemId);

				if (timelineItem) {
					$scope.timelineItem = timelineItem;
				} else
				{
					$scope.timelineItem = new Model(
							'contacts/'+$stateParams.contactId+'/timeline'
							);
				}

				$scope.timelineItem.read($stateParams.timelineItemId).then(function () {

				});

				$scope.save = function () {
					$scope.timelineItem.save({
						contactId: $stateParams.contactId
					})
							.success(function (result) {

								$scope.$close(result);

							});
				};

				$scope.cancel = function () {

					if ($scope.timelineItem.id) {
						$scope.timelineItem.resetAttributes();
					}

					$scope.$dismiss();
				};


			}]);
