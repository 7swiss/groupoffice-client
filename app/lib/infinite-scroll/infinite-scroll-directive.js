'use strict';

/**
 * @ngdoc directive
 * @name GO.infinite-scroll.imInfiniteScroll:imInfiniteScroll
 * @element ANY
 *
 * @description
 * Scroll an element infinitely
 *
 * @param {function} imInfiniteScroll function that should be called to load more items
 * @param {expression=} imInfiniteScrollDisabled {@link guide/expression Expression} that returns true or false to disable scrolling. Useful for pending AJAX requests.
 * @param {boolean=} imInfiniteScrollUseDocumentBody By default the element is used for scroll detection. You can set this to true to use the document body.
 *
 * @example
   <example module="myExampleModule">
     <file name="index.html">
				<div ng-controller="ExampleController">
					<div im-infinite-scroll="loadMore()" style="height:100px;overflow:auto">
						<div ng-repeat="item in items" style="border:1px solid grey;height:20px;">{{item.name}}</div>
					</div>
				</div>
     </file>
		<file name="script.js">
			angular.module('myExampleModule', ["GO.infiniteScroll"])
				.controller('ExampleController', ['$scope', function($scope) {

						$scope.items=[];

						$scope.loadMore = function() {
							for(var i=0;i<10;i++){
								$scope.items.push({name:"Item "+$scope.items.length});
							}
						};

					}]);
		 </file>
   </example>
 */
angular.module('GO.infiniteScroll',[]).
				directive('imInfiniteScroll', ['$timeout', function($timeout) {
						return{
							scope: {
								imInfiniteScroll: '&',
								imInfiniteScrollDisabled: '=',
								imInfiniteScrollUseDocumentBody: '='
							},
							link: function(scope, element, attr) {

								var
												lengthThreshold = attr.scrollThreshold || 50,
												timeThreshold = attr.timeThreshold || 400;

								lengthThreshold = parseInt(lengthThreshold, 10);
								timeThreshold = parseInt(timeThreshold, 10);


								var scrollEnabled = true;

								scope.$watch('imInfiniteScrollDisabled', function(v) {
									scrollEnabled = !v;
								});

								var scrollEl = !attr["imInfiniteScrollUseDocumentBody"] ? element[0] : window.document.documentElement;

								var checker = function() {

									if (!scrollEnabled) {
										return $timeout(checker, timeThreshold);
									}
	
									if(scrollEl.scrollTop > 0){
										var remaining = scrollEl.scrollHeight - (scrollEl.clientHeight + scrollEl.scrollTop);
//	console.log(scrollEl.scrollHeight);
//	console.log(scrollEl.clientHeight);
//	console.log(scrollEl.scrollTop);

										if (remaining < lengthThreshold) {

//											console.log('infinite scroll triggered');
											scope.imInfiniteScroll();
											$timeout(checker, timeThreshold);
										}
									}
								};

								checker();


								if(attr["imInfiniteScrollUseDocumentBody"]){
									angular.element(window).bind('scroll', checker);
								}else
								{
									element.bind('scroll', checker);
								}
							}

						};
					}]);