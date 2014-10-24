'use strict';

/**
 * @ngdoc service
 * @name GO.data.Store
 *
 * @description
 * A store holds multiple records for display in an ng-repeat item for example
 *
 * @param {string} storeRoute The route to the controller. eg. "intermesh/auth/user/store"
 * @param {Model} The models this store is for.
 * @param {object=} loadParams Extra GET parameters for the store action
 */
angular.module('GO.data')
		.factory('Store', ['$http', 'Utils', 'Model', '$q', function($http, Utils, Model, $q) {

				var Store = function(storeRoute, model, loadParams) {
					this.items = [];
					this.busy = false;
					this.init = false;

					this.searchQuery = '';

					this.storeRoute = storeRoute;
					this.baseModel = model;
					
					if(loadParams.returnAttributes){
						this.baseModel.baseParams.returnAttributes = loadParams.returnAttributes;
					}

					this.allRecordsLoaded = false;

					this.loadParams = loadParams || {};
					
					this.lastLoadParams = {};


					this.defaultLimit = 20;
				};


				/**
				 * @ngdoc method
				 * @name GO.data.Store#load
				 * @methodOf GO.data.Store
				 * @description
				 * Loads new items for the store.
				 *
				 * @param {object} params Key value pair of GET params for the request
				 * @returns {HttpPromise} Returns a HttpPromise. See: {@link https://docs.angularjs.org/api/ng/service/$http#get}
				 */
				Store.prototype.load = function(params) {

					this.busy = true;

					params = params || {};

					var defaultParams = {
						searchQuery: this.searchQuery,
						limit: this.defaultLimit,
						offset: 0
					};

					angular.extend(defaultParams, this.loadParams, params);
					
					
					this.lastLoadParams = angular.copy(defaultParams);
					
					
					var deferred = $q.defer();

					Utils.promiseSuccessDecorator(deferred.promise);

					$http.get(Utils.url(this.storeRoute, defaultParams))
							.success(function(data) {
								data.store = this;								

								if(data.success){

									//When there are less results then the limit we sent then we must have gotten the last results.
									this.allRecordsLoaded = data.results.length < defaultParams.limit;

									this.loadData(data.results);

									this.busy = false;
									this.init = true;
									
									deferred.resolve(data);
								}else
								{
									deferred.reject(data);
								}

							}.bind(this))
							.error(function(data){
								data.store = this;								
								
								deferred.reject(data);
							});
							
					this.promise = deferred.promise;
							
					return deferred.promise;
				};

				/**
				 * @ngdoc method
				 * @name GO.data.Store#loadData
				 * @methodOf GO.data.Store
				 * @description
				 * Manually add an array of data to the store.
				 * 
				 * Example data:
				 * 
				 * <pre>
				 * [{attributeName: value}, {attributeName: value}]
				 * </pre>
				 */
				Store.prototype.loadData = function(data) {
					for (var i = 0; i < data.length; i++) {

						var model = angular.copy(this.baseModel);
						model.loadData(data[i]);

						this.items.push(model);
					}
				};

				/**
				 * @ngdoc method
				 * @name GO.data.Store#nextPage
				 * @methodOf GO.data.Store
				 * @description
				 * Loads the next page for the store
				 *
				 * @returns {HttpPromise} Returns a HttpPromise. See: {@link https://docs.angularjs.org/api/ng/service/$http#get}
				 */
				Store.prototype.nextPage = function() {

					if (!this.shouldLoad())
						return false;

					return this.load({
						offset: this.items.length
					});
				};

				/**
				 * @ngdoc method
				 * @name GO.data.Store#reload
				 * @methodOf GO.data.Store
				 * @description
				 * Reload the entire store
				 *
				 * @returns {HttpPromise} Returns a HttpPromise. See: {@link https://docs.angularjs.org/api/ng/service/$http#get}
				 */
				Store.prototype.reload = function() {

					var params = this.lastLoadParams;
					params.itemCount = this.items.length < this.defaultLimit ? this.defaultLimit : this.items.length;
					this.reset();

					return this.load(params);
				};


				/**
				 * @ngdoc method
				 * @name GO.data.Store#reset
				 * @methodOf GO.data.Store
				 * @description
				 * Reset the store to an empty state
				 */
				Store.prototype.reset = function(keepSearch) {
					if (!keepSearch) {
						this.searchQuery = '';
					}
					this.items = [];
					this.allRecordsLoaded = false;
					this.init = false;					
				};


				/**
				 * @ngdoc method
				 * @name GO.data.Store#shouldLoad
				 * @methodOf GO.data.Store
				 * @description
				 * Reset the store to an empty state
				 *
				 * @returns {boolean} Returns false if the store should not be loaded. eg. when it's busy or loaded completely.
				 */
				Store.prototype.shouldLoad = function() {
					var ret = !this.busy && !this.allRecordsLoaded;

					return ret;
				};

				/**
				 * @ngdoc method
				 * @name GO.data.Store#search
				 * @methodOf GO.data.Store
				 * @description
				 * Loads the store but passes this.searchQuery
				 *
				 * @returns {HttpPromise} Returns a HttpPromise. See: {@link https://docs.angularjs.org/api/ng/service/$http#get}
				 */
				Store.prototype.search = function() {
					this.reset(true);
					return this.load();
				};

				Store.prototype.searchListener = function($event) {
					if ($event.keyCode === 13) {
						this.search();
					}
				};

				/**
				 * @ngdoc method
				 * @name GO.data.Store#remove
				 * @methodOf GO.data.Store
				 * @description
				 * Removes a record
				 *
				 * @param {int} index Index of record to remove
				 *
				 */
				Store.prototype.remove = function(index) {
					this.total--;
					return this.items.splice(index, 1);
				};

				/**
				 * @ngdoc method
				 * @name GO.data.Store#findIndexByAttribute
				 * @methodOf GO.data.Store
				 * @description
				 * Finds a record index by attribute name
				 *
				 * @param {string} attributeName Name of the attribute
				 * @param {mixed} value Value of the attribute
				 *
				 * @returns {int} Index of record
				 */
				Store.prototype.findIndexByAttribute = function(attributeName, value) {

					for (var i = 0, l = this.items.length; i < l; i++) {
						if (this.items[i]['attributes'][attributeName] == value) {
							return i;
						}
					};

					return -1;
				};
				
				
				/**
				 * @ngdoc method
				 * @name GO.data.Store#findIndexesByAttribute
				 * @methodOf GO.data.Store
				 * @description
				 * Finds a record index by attribute name
				 *
				 * @param {string} attributeName Name of the attribute
				 * @param {mixed} value Value of the attribute
				 *
				 * @returns {array} Index of record
				 */
				Store.prototype.findIndexesByAttribute = function(attributeName, value) {
					
					var indexes = [];

					for (var i = 0, l = this.items.length; i < l; i++) {
						if (this.items[i]['attributes'][attributeName] == value) {
							indexes.push(i);
						}
					};

					return indexes;
				};

				/**
				 * @ngdoc method
				 * @name GO.data.Store#saveSortOrder
				 * @methodOf GO.data.Store
				 * @description
				 * Save the sortOrder of these store items
				 * 
				 * <pre>
				 * $scope.dragControlListeners =  {
				 *		accept: function (sourceItemHandleScope, destSortableScope) {
				 *			//override to determine drag is allowed or not. default is true.
				 *			return true;
				 *		},
				 *		itemMoved: function (event) {
				 *			console.log(event);
				 *		},
				 *		orderChanged: function(event) {
				 *			$scope.store.saveSortOrder('IPE/KeepNotes/Note/saveSort');
				 *		}
				 *		//containment: '#board'//optional param.
				 *	};
				 * </pre>
				 * 
				 * 
				 * @param {string} route The route to the php controller action
				 * @returns {HttpPromise} Returns a HttpPromise. See: {@link https://docs.angularjs.org/api/ng/service/$http#post}
				 */
				Store.prototype.saveSortOrder = function(route) {
					var sortOrder = [];

					for (var i = 0, max = this.items.length; i < max; i++) {
						sortOrder.push(this.items[i]['attributes'].id);
					}

					var params = {sortOrder: sortOrder};

					return $http.post(Utils.url(route), params);
				};

				/**
				 * @ngdoc method
				 * @name GO.data.Store#findModelByAttribute
				 * @methodOf GO.data.Store
				 * @description
				 * Finds a record  by attribute name
				 *
				 * @param {string} attributeName Name of the attribute
				 * @param {mixed} value Value of the attribute
				 *
				 * @returns {Model} The model found or false on failure
				 */
				Store.prototype.findModelByAttribute = function(attributeName, value) {

					var i = this.findIndexByAttribute(attributeName, value);

					if (i === false) {
						return false;
					} else
					{
						return this.items[i];
					}
				};
				
				
				/**
				 * @ngdoc method
				 * @name GO.data.Store#findModelsByAttribute
				 * @methodOf GO.data.Store
				 * @description
				 * Finds a record  by attribute name
				 *
				 * @param {string} attributeName Name of the attribute
				 * @param {mixed} value Value of the attribute
				 *
				 * @returns {array} The models found or false on failure
				 */
				Store.prototype.findModelsByAttribute = function(attributeName, value) {

					
					var indexes = this.findIndexesByAttribute(attributeName, value);
					var models = [];
					
					for(var i = 0, l = indexes.length; i < l; i++){
						models.push(this.items[indexes[i]]);
					}
					
					return models;
				};

				return Store;

			}]);
