'use strict';

/**
 * @ngdoc service
 * @name GO.MultiSelectList:MultiSelectList
 *
 * @description
 * A service to support a model attribute where you can add multiple items to.
 *
 * @param {Store} selectedStore The store that holds the already selected items
 * @param {Store} availableStore The store that holds the items that can be selected
 * @param {string} modalTemplateUrl The URL for the template for selecting items.
 * @param {Model} model The model where the attribute must be set.
 * @param {string} attributeName The model attribute name
 *
 * @example

		<example module="MultiSelectListModule">
			<file name="index.html">
				<div ng-controller="MultiSelectListController">

					<div class="go-toolbar">
						<ul class="go-right-toolbar">
							<li>
								<a class="go-icon-buttton" ng-click="storeSelectModal.selectRecords()">
									Add
								</a>
							</li>
							<li>
								<a class="go-icon-buttton" ng-click="storeSelectModal.deleteRecords()">
									Delete
								</a>
							</li>
						</ul>
					</div>


					<ul class="list-group">
						<li class="list-group-item" ng-repeat="model in storeSelectModal.selectedStore.items" im-infinite-use-window="true">
							<label><input type="checkbox" ng-model="model.checked" ng-show="storeSelectModal.deleteEnabled"> {{model.attributes.name}}</label>
						</li>
					</ul>


				</div>
			</file>
			<file name="modal.html">
				<div class="modal-header">
					<h3 class="modal-title">{{"Select roles"| goT}}</h3>
				</div>
				<div class="modal-body">

					<div style="height:300px;overflow:auto" class="list-group" im-infinite-scroll="storeSelectModal.availableStore.nextPage()" im-infinite-scroll-disabled="!storeSelectModal.availableStore.shouldLoad()">

						<ul class="list-group">
							<li class="list-group-item" ng-repeat="model in storeSelectModal.availableStore.items">
								<label><input type="checkbox" ng-model="model.checked"> {{model.attributes.name}}</label>
							</li>
						</ul>
					</div>

				</div>
				<div class="modal-footer">
					<button class="btn btn-primary" ng-click="ok()">OK</button>
					<button class="btn btn-warning" ng-click="cancel()">Cancel</button>
				</div>
			</file>
			<file name="script.js">
				angular.module('MultiSelectListModule', ["GO.MultiSelectList"])
				 .controller('MultiSelectListController', ['$scope', 'Model','Store','MultiSelectList', function($scope, Model, Store, MultiSelectList) {
					$scope.user = new Model('user', 'intermesh/auth/user');


					var selectedStore = new Store('intermesh/auth/user/roles',
														{
															userId: 1
														});
					//override just for demo.
					selectedStore.load = function(){
						if(selectedStore.items.length==0)
						selectedStore.items = [{attributes: {id:1, name:'Role 1'}}, {attributes: {id:2, name:'Role 2'}}];
					}

					//fake items
					selectedStore.items = [{attributes: {id:1, name:'Role 1'}}, {attributes: {id:2, name:'Role 2'}}];

					availableStore = new Store('intermesh/auth/user/availableRoles',
														{
															userId: 1
														});
					//override just for demo.
					availableStore.load = function(){

						if(availableStore.items.length==0)
						availableStore.items = [{attributes: {id:3, name:'Role 3'}}, {attributes: {id:4, name:'Role 4'}}];
					}



					$scope.storeSelectModal = new MultiSelectList(
										selectedStore,
										availableStore,
										'modal.html',
										$scope.user,
										'roles'
										);
				}]);
			</file>
		</example>
 */

angular.module('GO.StoreSelectModal',['GO.core', 'GO.data', 'GO.infiniteScroll','ui.bootstrap']).
				factory('StoreSelectModal', ['$modal', '$rootScope','$q', function($modal, $rootScope, $q) {

						var StoreSelectModal = function(availableStore, modalTemplateUrl, callback) {

							this.availableStore = availableStore;

							this.callback = callback;
							
							this.modalTemplateUrl = modalTemplateUrl;

						};

						var ModalInstanceController = function($scope, $modalInstance, storeSelectModal) {

							storeSelectModal.availableStore.reset();

							$scope.storeSelectModal = storeSelectModal;
							
							var selected = [];
							$scope.ok = function() {
							
								for (var i = 0; i < $scope.storeSelectModal.availableStore.items.length; i++) {
									if ($scope.storeSelectModal.availableStore.items[i].attributes.checked) {
										$scope.storeSelectModal.availableStore.items[i].attributes.checked = false;
										selected.push($scope.storeSelectModal.availableStore.items[i]);
									}
								}
								
								if(storeSelectModal.callback){
									storeSelectModal.callback(selected);
								}

								$modalInstance.close(selected);
							};

							$scope.cancel = function() {
								$modalInstance.dismiss('cancel');
							};
						};

			

						StoreSelectModal.prototype.openModal = function() {

							return $modal.open({
								templateUrl: this.modalTemplateUrl,
								controller: ModalInstanceController,
								resolve: {
									storeSelectModal: function() {
										return this;
									}.bind(this)
								}
							});
						};

						return StoreSelectModal;
					}]);