angular.module('GO.panelSwitcher', []).
		factory('PanelSwitcher', ['$state', '$timeout', function ($state, $timeout) {

				var PanelSwitcher = function (scope, initialPanelState) {

					this.initialActive = true;
					this.initialPanelState = initialPanelState;
					
					this.intercept = true;

					scope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {

						this.initialActive = toState.name === this.initialPanelState;
						
						this.intercept = true;
					}.bind(this));
					
					scope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams){
						
						
						
						if(this.intercept && toState.name ===this.initialPanelState){
							event.preventDefault();	
							
							this.intercept = false;
						
							this.initialActive = true;
							$timeout(function () {
								$state.go(toState, toParams);
							}, 300); //timeout must be equal to css transition duration. See _layout.css go-panel.
						}
					}.bind(this));

				};

				return PanelSwitcher;
			}]);
