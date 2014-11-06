'use strict';

angular.module('GO.ShareModal', ['GO.core', 'GO.data', 'GO.infiniteScroll']).
		factory('ShareModal', ['$templateCache', '$http', '$modal', 'Store', 'Model', 'Utils', function($templateCache, $http, $modal, Store, Model, Utils) {

			

				//$templateCache.put("share-modal.html", '<div class=\"modal-content\">\r\n\t\t\t\t <div class=\"modal-header\">\r\n\t\t\t\t <h3 class=\"modal-title\"><span class=\"fa fa-share-alt\"><\/span> {{\"Share\"| t}}<\/h3>\r\n\t\t\t\t <\/div>\r\n\t\t\t\t <div class=\"modal-body\">\t\r\n\t\t\t\t\r\n\t\t\t\t<div class=\"input-group\">\r\n\t\t\t\t\t<input type=\"text\" class=\"form-control\" im-keypress=\"{13: \'shareModal.store.search()\'}\" ng-model=\"shareModal.store.searchQuery\" placeholder=\"{{\'Search\' | t}}...\" \/>\r\n\r\n\t\t\t\t\t<div class=\"input-group-btn\">\r\n\r\n\t\t\t\t\t\t<button class=\"btn btn-default\" ng-click=\"shareModal.store.reset();\"><i class=\"fa fa-times\"><\/i><\/button>\r\n\t\t\t\t\t\t<button class=\"btn btn-default\" ng-click=\"shareModal.store.search();\"><i class=\"fa fa-search\"><\/i><\/button>\r\n\t\t\t\t\t<\/div>\r\n\t\t\t\t<\/div>\r\n\t\t\t\t \r\n\t\t\t\t <div style=\"height:300px;overflow:auto\" im-infinite-scroll=\"shareModal.store.nextPage()\" im-infinite-scroll-disabled=\"!shareModal.store.shouldLoad()\">\r\n\t\t\t\t \r\n\t\t\t\t <table class=\"table\">\r\n\t\t\t\t <tr>\r\n\t\t\t\t <th><\/th>\r\n\t\t\t\t <th>\r\n\t\t\t\t {{\"Role\" | t}}\r\n\t\t\t\t <\/th>\r\n\t\t\t\t <th style=\"text-align:center\" ng-repeat=\"permissionAttribute in shareModal.permissionAttributes\">\r\n\t\t\t\t {{permissionAttribute.label | t}}\r\n\t\t\t\t <\/th>\t\t\t\t\t\r\n\t\t\t\t <\/tr>\r\n\t\t\t\t <tr ng-repeat=\"model in shareModal.store.items\">\r\n\t\t\t\t <td>\r\n\t\t\t\t <i class=\"fa\" ng-class=\'{\"fa-user\": model.attributes.userId, \"fa-group\": !model.attributes.userId}\'><\/i>\r\n\t\t\t\t <\/td>\r\n\t\t\t\t <td>\t\t\t\t\t\t\r\n\t\t\t\t {{model.attributes.name}}\r\n\t\t\t\t <\/td>\r\n\t\t\t\t <td style=\"text-align:center\" ng-repeat=\"permissionAttribute in shareModal.permissionAttributes\">\r\n\t\t\t\t <input type=\"checkbox\" ng-model=\"model.attributes.permissions.attributes[permissionAttribute.name]\" ng-change=\"checkDependencies(model)\" ng-init=\"checkDependencies(model)\" ng-disabled=\"permissionDisabled(model, permissionAttribute.name)\">\r\n\t\t\t\t <\/td>\r\n\t\t\t\t <\/tr>\r\n\t\t\t\t \r\n\t\t\t\t <\/table>\r\n\t\t\t\t \r\n\t\t\t\t <\/div>\t\t\t\t\r\n\t\t\t\t \r\n\t\t\t\t <\/div>\r\n\t\t\t\t <div class=\"modal-footer\">\r\n\t\t\t\t <button class=\"btn btn-primary\" ng-click=\"ok()\">{{\"OK\" | t}}<\/button>\r\n\t\t\t\t <button class=\"btn btn-default\" ng-click=\"cancel()\">{{\"Cancel\" | t}}<\/button>\r\n\t\t\t\t \r\n\t\t\t\t <\/div>\r\n\t\t\t\t <\/div>');


				var ShareModal = function(permissionAttributes, modelName) {

					this.modelName = modelName;

					this.permissionAttributes = permissionAttributes;
					this.store = new Store(
							'auth/permissions',							
							{
								modelId: 0,
								modelName: modelName

							});

				};


				ShareModal.prototype.ModalInstanceController = function($scope, $modalInstance, shareModal) {

					shareModal.store.reset();

					$scope.ok = function() {

						var model, updatedPermissions = [];
						for (var i = 0, c = shareModal.store.items.length; i < c; i++) {
							model = shareModal.store.items[i];


							if (model.isModified()) {

								var record = {roleId: model.attributes.id};

								for (var n = 0, c2 = shareModal.permissionAttributes.length; n < c2; n++) {
									record[shareModal.permissionAttributes[n].name] = model.attributes.permissions.attributes[shareModal.permissionAttributes[n].name] === true;
								}

								updatedPermissions.push(record);
							}
						}


//						$scope.loading = true;

						$http.put(Utils.url(
								'auth/permissions',
								{
									modelId: shareModal.store.loadParams.modelId,
									modelName: shareModal.modelName
								}),
								{
									permissions: updatedPermissions
								}
						)
								.success(function(result) {
									$modalInstance.close();
								}.bind(this));
					};

					$scope.cancel = function() {

						$modalInstance.close();
					};

					var disabledAttributes = {};

					$scope.checkDependencies = function(role) {

						disabledAttributes[role.attributes.id] = [];

						var permissionAttributes = role.attributes.permissions.attributes;



						//loop through all permission read, edit, delete etc.
						for (var attr in permissionAttributes) {
							//is it checked?
							if (permissionAttributes[attr] === true) {

//console.log(permissionAttributes);
//console.log(attr);
								//Loop though all dependend permission attributes
								var permissionDependencies = permissionAttributes.permissionDependencies[attr];

								for (var i = 0, c = permissionDependencies.length; i < c; i++) {
									if (disabledAttributes[role.attributes.id].indexOf(permissionDependencies[i]) === -1) {
										//set it checked and disabled
										disabledAttributes[role.attributes.id].push(permissionDependencies[i]);
									}
									permissionAttributes[permissionDependencies[i]] = true;
								}
							}
						}
						;

						$scope.permissionDisabled = function(role, permissionAttribute) {
							return disabledAttributes[role.attributes.id] && disabledAttributes[role.attributes.id].indexOf(permissionAttribute) > -1;
						};
					};

					$scope.shareModal = shareModal;

				};

				ShareModal.prototype.open = function(modelId) {

					this.store.loadParams.modelId = modelId;
					
					return $modal.open({
						templateUrl: 'lib/share-modal/share-modal.html',
						controller: this.ModalInstanceController,
						resolve: {
							shareModal: function() {
								return this;
							}.bind(this)
						}
					});

				};

				return ShareModal;
			}]);
