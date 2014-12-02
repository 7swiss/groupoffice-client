'use strict';

/* Controllers */
angular.module('GO.controllers')

	.controller('NoteEditController', ['$scope', '$modal', '$state', '$stateParams', function($scope, $modal, $state, $stateParams) {
			$scope.openModal = function() {
				$modal.open({
					templateUrl: 'modules/notes/partials/note-edit.html',
					controller: 'NoteModalController',
					resolve: {
						store: function() {
							return $scope.store;
						}
					}
				}).result.then(function(result) {

					if (result) {

						return $state.go("^");
					}
				}, function() {
					return $state.go("^");
				});
			};
		}])

	.controller('NoteModalController', ['$modal', '$scope', '$state', 'Translate', 'Model', 'MessageBox', '$stateParams', 'Utils', 'store', function($modal, $scope, $state, Translate, Model, MessageBox, $stateParams, Utils,store) {

		var note = store.findModelByAttribute('id', $stateParams.noteId);
		

		if(note){
			$scope.note = note;
		}else
		{
			$scope.note = new Model('notes',{returnAttributes: "*,images,listItems,roles,owner"});

			$scope.note.readIf($stateParams.noteId,{returnAttributes: "*,images,listItems,roles,owner"});
		}


//			$scope.note.load($stateParams.noteId);

			$scope.cancel = function() {
				$scope.note.resetAttributes();
				$scope.$dismiss();
			};

			$scope.save = function() {

				var isNew = !$scope.note.id;

				$scope.note.save()
					.success(function(result) {
						//success

						if (isNew) {
							store.items.unshift(result.model);
						}
						$scope.$close(result);
					})
					.error(function(data) {

						//error
						for (var attributeName in data.modelData.validationErrors) {
							MessageBox.alert(Translate.t(data.modelData.validationErrors[attributeName].code));
						}
					});
			};


			$scope.newImage = function(note) {

				var imageModel = new Model('noteImage');

				$scope.note.images.push(imageModel);
			};

			/**
			 * Set the color for the note
			 * 
			 * @param model note
			 * @param string color
			 * @returns {undefined}
			 */
			$scope.setColor = function(note, color) {
				note.color = color;
			};

			/**
			 * Set a listitem state
			 * 
			 * @param model listItem
			 * @param model note
			 * @returns {undefined}
			 */
			$scope.listItemClick = function(listItem, note) {
				listItem.checked = !listItem.checked;
			};

			$scope.newListItem = function(note) {


				var listItemModel = new Model('noteListItem');

				listItemModel.attributes = {
					id: 0,
					noteId: note.id,
					text: "",
					checked: 0,
					sortOrder: note.listItems.length + 1
				};

				$scope.note.listItems.push(listItemModel);
			};

		}]);
