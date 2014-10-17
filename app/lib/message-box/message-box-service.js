'use strict';

/**
 * @ngdoc service
 * @name GO.core.MessageBox
 *
 * @description
 * Use bootstrap to show alert, prompt and confirm modals
 *
 *
 * @example

		<example module="MessageBoxModule">
			<file name="index.html">
				<div ng-controller="MessageBoxController">
					<button ng-click="MessageBox.alert('Something has happened!','My Alert');">Show alert</button>
					<button ng-click="prompt();">Show prompt</button>
					<button ng-click="MessageBox.confirm('Are you sure?','Please confirm');">Show confirm</button>
				</div>
			</file>
				<file name="script.js">
				angular.module('MessageBoxModule', ["GO.MessageBox"])
				 .controller('MessageBoxController', ['$scope', '$log', 'MessageBox', function($scope, $log, MessageBox) {
					$scope.MessageBox = MessageBox;

					$scope.prompt = function(){
						var prompt = MessageBox.prompt("What's your name?", "Please enter");

						prompt.result.then(function (input) {
								MessageBox.alert("Your name is "+input,"Your name");
						}, function () {
								$log.info('Modal dismissed at: ' + new Date());
						});
					 }
				}]);
			</file>
		</example>
 */
angular.module('GO.MessageBox', ['GO.core', 'ui.bootstrap'])
				.controller('MessageBoxModalInstanceCtrl', ['$scope', '$modalInstance', 'config', function($scope, $modalInstance, config) {

						$scope.config = config;

						$scope.form = {input: ""};

						$scope.ok = function() {
							$modalInstance.close($scope.form.input);
						};

						$scope.cancel = function() {
							$modalInstance.dismiss('cancel');
						};
					}])
				.service('MessageBox', ['$modal', '$templateCache', function($modal, $templateCache) {

						$templateCache.put("intermeshBootstrapMsgAlert.html",
										'<div ng-if="config.title" class="modal-header">' +
										'<h3 class="modal-title"><i class="fa fa-{{config.glyphicon}}"></i> {{config.title}}</h3>' +
										'</div>' +
										'<div class="modal-body">' +
										'<i ng-if="!config.title" class="fa fa-{{config.glyphicon}}"></i> {{config.text}}</div>' +
										'<div class="modal-footer">' +
										'<button class="btn btn-primary" ng-click="ok()" autofocus>{{\'OK\' | t}}</button>' +
										'</div>');

						$templateCache.put("intermeshBootstrapMsgConfirm.html", '<div ng-if="config.title" class="modal-header"> \
							<h3 class="modal-title">{{config.title}}</h3>\
						</div>\
						<div class="modal-body">\
							\
							\
							<i class="fa fa-question"></i> {{config.text}}\
							\
							\
						</div>\
						<div class="modal-footer">\
							<button class="btn btn-primary" ng-click="ok();">{{\'Yes\' | t}}</button>\
							<button class="btn btn-warning" ng-click="cancel()" autofocus>{{\'No\' | t}}</button>\
						</div>');

						$templateCache.put("intermeshBootstrapMsgPrompt.html", '<form ng-submit="ok()">\
							<div ng-if="config.title" class="modal-header">\
								<h3 class="modal-title">{{config.title}}</h3>\
							</div>\
							<div class="modal-body">	\
								\
								<div class="form-goup">\
									<label>{{config.text}}</label>\
									<input type="{{config.inputType}}" class="form-control" ng-model="form.input" placeholder="{{config.placeholder}}" required autocomplete="off" autofocus />		\
								</div>\
								\
							</div>\
							<div class="modal-footer">\
								<button class="btn btn-primary" type="submit">{{\'OK\' | t}}</button>\
								<button class="btn btn-warning" ng-click="cancel()">{{\'Cancel\' | t}}</button>\
							</div>\
							\
							</form>');

						var MessageBox = {

							/**
							 * @ngdoc method
							 * @name GO.core.MessageBox#alert
							 * @methodOf GO.core.MessageBox
							 * @description
							 * Show an alert using a bootstrap modal.
							 *
							 * @param {string} text The text to display
							 * @param {string} title The modal title
							 * @param {string} glyphicon the css class without "glyphicon-" of the glyphicon to use.
							 *
							 * @returns {object} Returns a modal instance. See: {@link http://angular-ui.github.io/bootstrap/#/modal}
							 */
							alert: function(text, title, glyphicon) {

								var config = {
									text: text,
									title: title,
									glyphicon: glyphicon || "exclamation-triangle"
								};

								return $modal.open({
									windowClass: 'go-modal-alert',
									templateUrl: "intermeshBootstrapMsgAlert.html",
									controller: 'MessageBoxModalInstanceCtrl',
									size: 'lg',
									resolve: {
										config: function() {
											return config;
										}
									}
								});
							},

							/**
							 * @ngdoc method
							 * @name GO.core.MessageBox#confirm
							 * @methodOf GO.core.MessageBox
							 * @description
							 * Show a confirm dialog using a bootstrap modal.
							 *
							 * @param {string} text The text to display
							 * @param {string} title The modal title
							 *
							 * @returns {object} Returns a modal instance. See: {@link http://angular-ui.github.io/bootstrap/#/modal}
							 */
							confirm: function(text, title) {
								var config = {
									text: text,
									title: title
								};

								var confirm = $modal.open({
									windowClass: 'go-modal-alert',
									templateUrl: 'intermeshBootstrapMsgConfirm.html',
									controller: 'MessageBoxModalInstanceCtrl',
									size: 'lg',
									resolve: {
										config: function() {
											return config;
										}
									}
								});

								return confirm;
							},

							/**
							 * @ngdoc method
							 * @name GO.core.MessageBox#prompt
							 * @methodOf GO.core.MessageBox
							 * @description
							 * Show a prompt dialog using a bootstrap modal.
							 *
							 * @param {string} text The text to display
							 * @param {string} title The modal title
							 * @param {string} inputType text or password
							 *
							 * @returns {object} Returns a modal instance. See: {@link http://angular-ui.github.io/bootstrap/#/modal}
							 */
							prompt: function(text, title, inputType) {

								inputType = inputType || 'text';

								var config = {
									text: text,
									title: title,
									inputType: inputType || "text"
								};

								var prompt = $modal.open({
									windowClass: 'go-modal-alert',
									templateUrl: 'intermeshBootstrapMsgPrompt.html',
									controller: 'MessageBoxModalInstanceCtrl',
									size: 'lg',
									resolve: {
										config: function() {
											return config;
										}
									}
								});

								return prompt;
							}
						};

						return MessageBox;

					}]);