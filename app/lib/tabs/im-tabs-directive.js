'use strict';

angular.module('GO.tabs')

		.directive('imTabs', [function () {


				return {
					restrict: ['E','A'],
					controller: function () {
						
						this.left = true;
						this.tabIndex = 0;

						this.switch = function (tabIndex) {
							this.left = this.tabIndex < tabIndex;
							this.tabIndex = tabIndex;
							
							
							if(this.left){
								this.leavingView.addClass('left');
								this.leavingView.removeClass('right');
							}else
							{
								this.leavingView.removeClass('left');
								this.leavingView.addClass('right');
							}
				
						};
						
						var tabIndex = 0;
						
						this.getNextTabIndex = function(){
							return tabIndex++;
						};

					}
				};
			}]);