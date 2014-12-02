'use strict';

/**
 * @ngdoc service
 * @name GO.modules
 *
 * @description
 * Module manager to register modules
 */
angular.module('GO.modules')
		.provider('modules', [function ModulesProvider() {

				var modules = {};

				/**
				 * @ngdoc method
				 * @name GO.modules#addModule
				 * @methodOf GO.modules
				 * @description
				 *
				 * Add an app to the program
				 *
				 * @param {string} id The id of the module. Note that there must be a ui.router state for this id as well.
				 * @param {string} title The title of the module in English.
				 * @param {string} iconCls The class for the icon of FontAwesome. eg. "fa-user" {@link http://fortawesome.github.io/Font-Awesome/}
				 */
				this.addModule = function(id, title, iconCls) {
					var module = {id: id, title: title, iconCls: iconCls};

					modules[id.toLowerCase()] = module;
				};

				this.$get = [function ModulesFactory() {


						// let's assume that the UnicornLauncher constructor was also changed to
						// accept and use the useTinfoilShielding argument
						return modules;
					}];
			}]);

angular.module('GO.modules')
		.service('Modules', ["Store", "Model", "modules", "$q", function(Store, Model, modules, $q) {

				var Modules = function() {
					this.store = new Store(
							'modules',
							 {
							limit: 0
						}
					);
	
				};
				
				Modules.prototype.getModule = function(moduleName){
					
					
					var deferred = $q.defer();
					
					var modulesPromise = this.getModules();
					
					modulesPromise.then(function(modules){
						for(var i = 0, l = modules.length;i < l; i++){

							if(modules[i].name === moduleName){
								deferred.resolve(modules[i]);
								return;
							}
						}
						
						deferred.resolve(false);
					});
					
					return  deferred.promise;
					
					
									
//					if(!this.modules){
//						this.getModules();
//						return false;
//					}
//								
//					for(var i = 0, l = this.modules.length;i < l; i++){
//
//						if(this.modules[i].name === moduleName){
//							return this.modules[i];
//						}
//					}
//					
//					return false;
				};

				Modules.prototype.getModules = function(){					
					
					
					if(this.promise){
						return this.promise;
					}else
					{
						
						var deferred = $q.defer();
						this.promise = deferred.promise;
						
						var promise = this.store.load();
						
						promise.then(function(data){
							
							for(var i = 0, l = this.store.items.length;i < l; i++){
								
								if(!modules[this.store.items[i].name]){
									this.store.items.splice(i, 1);
									i--;
									l--;
								}else
								{
								
									this.store.items[i].clientAttributes = modules[this.store.items[i].name];
								}
							}
							
							this.modules = this.store.items;
							
						
//							console.log(this.store.items);
							
							deferred.resolve(this.modules);
							
							
							
						}.bind(this),
						function(data){
							this.promise = false;
						}.bind(this));
						
						return deferred.promise;
					}
				};
				
				return new Modules;
				
			}]);
		
		
		
angular.module('GO.modules')
		.provider('settings', [function SettingsProvider() {

				var pages = [];

				/**
				 * @ngdoc method
				 * @name GO.modules#addModule
				 * @methodOf GO.modules
				 * @description
				 *
				 * Add an app to the program
				 *
				 * @param {string} id The id of the module. Note that there must be a ui.router state for this id as well.
				 * @param {string} title The title of the module in English.
				 * @param {string} iconCls The class for the icon of FontAwesome. eg. "fa-user" {@link http://fortawesome.github.io/Font-Awesome/}
				 */
				this.addPage = function(config) {
					
					pages.push(config);
				};

				this.$get = [function SettingsFactory() {


						// let's assume that the UnicornLauncher constructor was also changed to
						// accept and use the useTinfoilShielding argument
						return pages;
					}];
			}]);