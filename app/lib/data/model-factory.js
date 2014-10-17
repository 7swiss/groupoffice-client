'use strict';

/**
 * @ngdoc service
 * @name GO.data.Model
 *
 * @description
 * A model is an item that can be saved and loaded from the server. A user for example.
 *
 * @param {string} modelName The name of the modal. eg. "user". This will be used in requests.
 * @param {string} createRoute The controller route to create a new model
 * @param {string} updateRoute The controller route to update a  model
 * @param {string} deleteRoute The controller route to delete a model
 * @param {string} baseParams GET parameters for each request
 */
angular.module('GO.data')
		.factory('Model', ['$http', '$q', '$timeout', 'Utils', function($http, $q, $timeout, Utils) {

				var Model = function(modelName, controllerRoute,  baseParams) {

					this.modelName = modelName;
					
					this.createRoute = controllerRoute + "/create";
					this.readRoute = controllerRoute + "/read";
					this.updateRoute = controllerRoute + "/update";;
					this.deleteRoute = controllerRoute + "/delete";;

//					/**
//					 * @ngdoc property
//					 * @name GO.data.Model#saveParams
//					 * @propertyOf GO.data.Model
//					 * @returns {object} Key value pair of POST parameters to pass on save.
//					 */
//					this.saveParams = {};

					/**
					 * @ngdoc property
					 * @name GO.data.Model#attributes
					 * @propertyOf GO.data.Model
					 * @returns {object} Key value pair of model attributes
					 */
					this.attributes = {};

					this.oldAttributes = {};

//					this.saveParams = {};
//					this.saveParams[this.modelName] = {"attributes": this.attributes};

					this.idAttribute = 'id';

					/**
					 * @ngdoc property
					 * @name GO.data.Model#baseParams
					 * @propertyOf GO.data.Model
					 * @returns {object} Key value pair of GET parameters to pass on load.
					 */
					this.baseParams = baseParams || {};

					this.init();
				};

				Model.prototype.init = function() {
				};

				Model.prototype.getBaseParams = function() {
					var params = angular.copy(this.baseParams);

					if (this.attributes && this.attributes[this.idAttribute]) {
						params[this.idAttribute] = this.attributes[this.idAttribute];
					}

					return params;
				};

				/**
				 * @ngdoc method
				 * @name GO.data.Model#delete
				 * @methodOf GO.data.Model
				 * @description
				 * Delete the model on the server
				 
				 * @returns {HttpPromise} Returns a HttpPromise. See: {@link https://docs.angularjs.org/api/ng/service/$http#get}
				 */
				Model.prototype.delete = function() {

					var deferred = $q.defer();

					Utils.promiseSuccessDecorator(deferred.promise);

					var url = Utils.url(this.deleteRoute, this.getBaseParams());
					$http.post(url)
							.success(function(result) {

								if (result.success) {
									var data = result.data[this.modelName];

									if (!data.success) {
										
										this.validationErrors = data.validationErrors;
										
										deferred.reject({model: this, result: result});
									} else {
										
										//SoftDeleteTrait has a 'deleted' attribute.
										if(typeof(this.attributes.deleted) !== 'undefined'){
											this.attributes.deleted = true;
											this.oldAttributes.deleted = true;
										}
										
										deferred.resolve({model: this, result: result});
									}
								} else
								{
									deferred.reject({model: this, result: result, modelData: data});
								}

							}.bind(this));

					return deferred.promise;
				};
				
				
				Model.prototype.unDelete = function(){
					this.resetAttributes();
					this.attributes.deleted = false;
					return this.save();
				};

				/**
				 * When posting dates to the server API it requires them in ISO8060 standard.
				 * eg. 2014-07-28T13:00+2000. The problem with dates with times is that javascript converts them to UTC when converting to JSON.
				 * This will change the date and the server doesn't know which timezone it's in. We just want to post 2014-07-28 when it's about a date.
				 * This function will check for dates without time and changes it into a string.
				 *
				 * @returns {_L317.Model.prototype._fixDates@arr;attributes}
				 */
				Model.prototype._fixDates = function(attributes) {

					var attr = {};

					for (var attrName in attributes) {
						if (attributes[attrName] instanceof Date) {
							attr[attrName] = attributes[attrName].toIntermeshApiFormat();							
						} else if(angular.isObject(attributes[attrName]) && attributes[attrName].attributes){
							var fixed = this._fixDates(attributes[attrName].attributes);							
							attr[attrName] = {attributes: fixed};
						}else if(angular.isArray(attributes[attrName])){
							var l = attributes[attrName].length;
							
							if(l){
								attr[attrName] = [];
								for(var i = 0, l; i < l; i++){							
									var fixed = this._fixDates(attributes[attrName][i].attributes);							
									attr[attrName].push({attributes: fixed});
								}
							}
							
						}else
						{
							attr[attrName] = attributes[attrName];
						}
					}

					return attr;
				};

				/**
				 * @ngdoc method
				 * @name GO.data.Model#isModified
				 * @methodOf GO.data.Model
				 * @description
				 * Check if the model has modified attributes
				 *
				 * @returns {boolean} Returns true if the model was modified
				 */
				Model.prototype.isModified = function() {
					return angular.toJson(this.attributes) !== angular.toJson(this.oldAttributes);
				};
				
				Model.prototype.isNew = function(){
					return this.attributes[this.idAttribute] < 1;
				};

				Model.prototype.getModifiedAttributes = function(attributes, oldAttributes) {
					if (typeof (attributes) === 'undefined') {

						var attributes = this.attributes;
						var oldAttributes = this.oldAttributes;
					}

					var modified = false;
					for (var attributeName in attributes) {

						var value = attributes[attributeName];

						if (angular.isArray(value)) {

							var c = value.length;
							if (c) {
								
								for (var i = 0, c = value.length; i < c; i++) {
									
									var attr = this.getModifiedAttributes(
												value[i].attributes,
												(oldAttributes[attributeName] && oldAttributes[attributeName][i]) ? oldAttributes[attributeName][i].attributes : {}
														);
												
									if(attr !== false){
										
										modified = this._initModifiedAttributes(modified, attributes);
										if(!modified[attributeName]){
											modified[attributeName] = [];
										}
										
										modified[attributeName].push({
											attributes: attr
										});										
									}
								}
							}
						} else if(angular.isObject(value) && value.attributes){ //has one related model.
							var attr = this.getModifiedAttributes(
												value.attributes,
												oldAttributes[attributeName] ? oldAttributes[attributeName].attributes : {}
														);

							if(attr !== false){

								modified = this._initModifiedAttributes(modified, attributes);
								
								modified[attributeName] = {attributes: attr};				
							}
						}else
						{
							if (oldAttributes[attributeName] !== value) {
								
								modified = this._initModifiedAttributes(modified, attributes);

								modified[attributeName] = value;
							}
						}
					}

					return modified;
				};
				
				Model.prototype._initModifiedAttributes = function(modified, attributes){
					//todo id should be dynamic?
					if(!modified)
					{
						modified ={id: attributes.id};
					}
					
					return modified;
				};


				/**
				 * @ngdoc method
				 * @name GO.data.Model#save
				 * @methodOf GO.data.Model
				 * @description
				 * Save the model on the server
				 *
				 * @returns {HttpPromise} Returns a HttpPromise. See: {@link https://docs.angularjs.org/api/ng/service/$http#post}
				 */
				Model.prototype.save = function(getParams) {
					
					var params = this.getBaseParams();
					
					if(getParams){
						angular.extend(params, getParams);
					}

					var url = this.attributes[this.idAttribute] > 0 ? Utils.url(this.updateRoute, params) : Utils.url(this.createRoute, params);

					var deferred = $q.defer();

					Utils.promiseSuccessDecorator(deferred.promise);
					
//					var modifiedAttributes = this.isNew() ? this.attributes : this.getModifiedAttributes();
					var modifiedAttributes = this.getModifiedAttributes();

					if(modifiedAttributes){
						var saveParams = {};
						saveParams[this.modelName] = {};
						
						saveParams[this.modelName]['attributes'] = this._fixDates(modifiedAttributes);

						$http.post(url, saveParams)
								.success(function(result) {

									var data = result.data[this.modelName];

									if (!data.success) {
			
										this.loadValidationErrors(data);
										
										deferred.reject({model: this, result: result, validationErrors: data.validationErrors});
									} else {

										this.loadData(data);
										
										deferred.resolve({model: this, result: result});
									}

								}.bind(this));
					}else
					{
						deferred.resolve({model: this, result: false});
					}

					return deferred.promise;
				};

				/**
				 * @ngdoc method
				 * @name GO.data.Model#delete
				 * @methodOf GO.data.Model
				 * @description
				 * Load the model data from the server but only if not already loaded
				 * with the same ID. Useful with detail and edit pages that share the same model.
				 *
				 * @param {object} params Key value pair of GET params for the request
				 * @returns {HttpPromise} Returns a HttpPromise. See: {@link https://docs.angularjs.org/api/ng/service/$http#get}
				 */
				Model.prototype.readIf = function(id, params) {
					if (this.attributes[this.idAttribute] == id) {
						return $timeout(function() {
						});
					} else
					{
						return this.read(id, params);
					}
				};

				/**
				 * @ngdoc method
				 * @name GO.data.Model#resetAttributes
				 * @methodOf GO.data.Model
				 * @description
				 * Reset the attributes to their original state.
				 *
				 */
				Model.prototype.resetAttributes = function() {
					//this.attributes = angular.copy(this.oldAttributes);
					
					//keep reference 
					for (var i in this.attributes) {
						delete this.attributes[i];
					}
					
					for(var i in this.oldAttributes){
						this.attributes[i] = angular.copy(this.oldAttributes[i]);
					}
				};
				
				Model.prototype.loadValidationErrors = function(data, obj){
					if(!obj){
						obj = this;
					}
								
					
					if(data.validationErrors){
						obj.validationErrors = data.validationErrors;
					}
					
					if(data.attributes){
						for(var attr in data.attributes){						
							
							if (angular.isArray(data.attributes[attr])){								
								for(var i = 0, l = data.attributes[attr].length; i < l; i++) {
									
									for(var n = 0, l2 = obj.attributes[attr].length; n < l2; n++){									
										
										if(data.attributes[attr][i].attributes.id === obj.attributes[attr][n].attributes.id ||
												!data.attributes[attr][i].attributes.id && !obj.attributes[attr][n].attributes.id){
											this.loadValidationErrors(data.attributes[attr][i], obj.attributes[attr][n]);
											break;
										}
									}
								}
							}else if(angular.isObject(data.attributes[attr]) && angular.isObject(obj.attributes[attr])){
							
								this.loadValidationErrors(data.attributes[attr], obj.attributes[attr]);
							}
						}
					}
				
				};

				/**
				 * @ngdoc method
				 * @name GO.data.Model#loadData
				 * @methodOf GO.data.Model
				 * @description
				 * Load the initial model attributes from the server.
				 * Don't set attributes directly because this function makes a copy so the model can be reset to the old attributes.
				 *
				 * @param {object} data to load		 
				 */
				Model.prototype.loadData = function(data) {
					
					for (var key in data){
						if(angular.isObject(this[key])){
							angular.copy(data[key], this[key]);
						}else
						{
							this[key] = data[key];
						}
					}
					this.oldAttributes = angular.copy(data.attributes);
				};
				
				
				/**
				 * @ngdoc method
				 * @name GO.data.Model#load
				 * @methodOf GO.data.Model
				 * @description
				 * Load the model data from the server
				 *
				 * @param {object} params Key value pair of GET params for the request
				 * @returns {HttpPromise} Returns a HttpPromise. See: {@link https://docs.angularjs.org/api/ng/service/$http#get}
				 */
				Model.prototype.read = function(id, params) {

					var p = this.getBaseParams();

					angular.extend(p, params);

					if (id) {
						p[this.idAttribute] = id;
					}

					var url = Utils.url(this.readRoute, p);

					return $http.get(url).success(function(result) {						
						
						if (result.data) {
							this.loadData(result.data[this.modelName]);
						}

					}.bind(this));

				};

				/**
				 * @ngdoc method
				 * @name GO.data.Model#load
				 * @methodOf GO.data.Model
				 * @description
				 * Load the model data from the server
				 *
				 * @param {object} params Key value pair of GET params for the request
				 * @returns {HttpPromise} Returns a HttpPromise. See: {@link https://docs.angularjs.org/api/ng/service/$http#get}
				 */
				Model.prototype.loadForm = function(id, params) {

					var p = this.getBaseParams();

					angular.extend(p, params);

					if (id) {
						p[this.idAttribute] = id;
					}

					var url = id > 0
							? Utils.url(this.updateRoute, p)
							: Utils.url(this.createRoute, p);

					return $http.get(url).success(function(result) {
						
						if (result.data) {
							this.loadData(result.data[this.modelName]);
						}

					}.bind(this));

				};
				return Model;

			}]);
