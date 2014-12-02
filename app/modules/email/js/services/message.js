'use strict';

/* Controllers */
angular.module('GO.services').
		service('EmailMessage', ['Model', function (Model) {

				function EmailMessage(controllerRoute,  baseParams) {
					Model.call(this, controllerRoute,  baseParams);
				}

				EmailMessage.prototype = Object.create(Model.prototype);

				EmailMessage.prototype.loadData = function (data) {
					//code for method four

					Model.prototype.loadData.call(this, data);

					this.iconCls = 'em-unseen-dot';//
					//
					//  this.seen ? 'fa fa-envelope-o' : 'em-unseen-dot';
					if(this.seen) {
						this.iconCls = 'fa fa-envelope-o';
					}
					if(this.forwarded){
						this.iconCls = 'fa fa-mail-forward';
					}
					
					if(this.answered){
						this.iconCls = 'fa fa-mail-reply';
					}
				};

				return EmailMessage;
			}]);