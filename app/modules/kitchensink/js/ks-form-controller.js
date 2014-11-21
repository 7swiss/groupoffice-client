'use strict';

/* Controllers */
angular.module('GO.controllers').
		controller('KsFormController', ['$scope', 'Model','Alerts', function ($scope, Model, Alerts) {

				
				
				$scope.formModel = new Model('fake/url');
				$scope.formModel.loadData({
					attributes:{
						company: "",
						tags: []
					}
				});
				
				$scope.selectOptions = [{
						value: 'opt-1',
						label: 'Option 1'
				},{
						value: 'opt-2',
						label: 'Option 2'
				}];
			
				$scope.save = function(){
					Alerts.addAlert('Submitted!', 'success');
				};

			}]);


