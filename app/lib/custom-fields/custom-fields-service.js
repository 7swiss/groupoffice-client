'use strict';
/**
 * @ngdoc service
 * @name GO.customFields
 *
 * @description
 * Common utilities
 */
angular.module('GO.customFields').
		service('CustomFields', ['Store', 'Model', function(Store, Model) {

				var loadedFieldSets = {};

				var CustomFields = function() {


				};

				CustomFields.prototype.filterModelToWhereParameter = function(filterModel) {
					
					var where = [];
					
					for (var key in filterModel) {
						if (angular.isObject(filterModel[key])) {
							//lt and gt values
							if (filterModel[key].gt instanceof Date) {
								filterModel[key].gt = filterModel[key].gt.toIntermeshApiFormat();
							}

							if (!GO.isEmpty(filterModel[key].gt)) {

								var condition = {};
								condition['customfields.' + key] = filterModel[key].gt;
								where.push(['AND', '>=', condition]);
							}


							if (filterModel[key].lt instanceof Date) {
								filterModel[key].lt = filterModel[key].lt.toIntermeshApiFormat();
							}

							if (!GO.isEmpty(filterModel[key].lt)) {

								var condition = {};
								condition['customfields.' + key] = filterModel[key].lt;
								where.push(['AND', '<=', condition]);
							}
						} else
						{
							if (!GO.isEmpty(filterModel[key])) {
								var condition = {};
								condition['customfields.' + key] = filterModel[key];
								where.push(condition);
							}
						}
					}
					
					return where;
				};

				CustomFields.prototype.getFieldSetStore = function(modelName) {


					if (!loadedFieldSets[modelName]) {

						loadedFieldSets[modelName] = new Store(
								'Intermesh/customFields/fieldSet/store',
								new Model(
										'fieldset',
										'Intermesh/customFields/fieldSet'
										),
								{
									returnAttributes: '*,fields',
									limit: 0,
									where: [{modelName: modelName}]
								});

						loadedFieldSets[modelName].load();
					}

					return loadedFieldSets[modelName];


				};

				return new CustomFields;
			}]);