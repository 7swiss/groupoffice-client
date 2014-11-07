'use strict';
/**
 * @ngdoc service
 * @name GO.tags
 *
 * @description
 * Common utilities
 */
angular.module('GO.tags', ['GO.data']).
		service('Tags', ['Store', 'Model', function(Store, Model) {
				
				var tagStore = false;

				var Tags = function() {

				
				};

				Tags.prototype.getTagStore = function() {					
				
					if(!tagStore){
						
						tagStore = new Store(
							'tags',							
							{						
								limit: 0
							});
							
						tagStore.load();
					}
					
					return tagStore;
					
					
				};

				return new Tags;
			}]);