Creating a module in the AngularJS client
-----------------------------------------

### Create folder structure
1. Create folder "app/modules/helloworld"
2. Create folder "app/modules/helloworld/js" for the script files.
3. Create folder "app/modules/helloworld/partials" for the HTML views.
4. Create folder and file "app/modules/hellowordl/scss/_helloworld.scss for the SASS styles. This must manually be included in scss/app.scss.

### Create module.js
Create "app/modules/helloworld/module.js" that will initialize the module.

In this file we'll add the states of the module and we can configure it before the application is running.

When you are looking for a particular part of the code always start in this file. Because you can see which URL belongs to what controller and view in this file.

Example:

```````````````````````````````````````````````````````````````````````````````````````````````````````````````````````
'use strict';

angular.module('GO').
		//Register the module
		config(['modulesProvider', function(modulesProvider) {
				modulesProvider.addModule('helloworld', 'Hello world', 'fa-thumbs-o-up');
			}]).
		config(['$stateProvider', function($stateProvider) {

				// Now set up the states
				$stateProvider
						.state('helloworld', {
							url: "/helloworld",
							templateUrl: 'modules/helloworld/partials/main.html',
							controller: "HelloWorldController"
						});
			}]);
```````````````````````````````````````````````````````````````````````````````````````````````````````````````````````

Make sure "grunt watch" is running so that the scripts are automatically added to app/index.html. 

You can also run grunt task "fileblocks" manually after adding the scripts.


### Create partials/main.html

```````````````````````````````````````````````````````````````````````````````````````````````````````````````````````
<div ng-include="'partials/header.html'"></div>

<div class="go-body">	
	<div class="go-card">
		<h1>Hello world</h1>
		<p>The  simplest module possible!</p>
	</div>
</div>
```````````````````````````````````````````````````````````````````````````````````````````````````````````````````````

### Create js/hello-world-controller.js

```````````````````````````````````````````````````````````````````````````````````````````````````````````````````````
'use strict';

/* Controllers */
angular.module('GO.controllers').
		controller('HelloWorldController', ['$scope', function($scope) {

				//Set's the title in the header bar
				$scope.pageTitle = "Hello world";
			}]);

```````````````````````````````````````````````````````````````````````````````````````````````````````````````````````


### Add the module to the database:

```````````````````````````````````````````
INSERT INTO `modulesModule` (
`id` ,
`name` ,
`type`
)
VALUES (
NULL , 'helloworld', 'user'
);

```````````````````````````````````````````

Now grant access to some roles via the roles module.


### Done!
Now refresh the Angular app and it should have the hello world icon on the start screen!