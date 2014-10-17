# intermesh-angular-example — A client for the Intermesh PHP API example

This project is an example of how to build a client for the Intermesh PHP Example.
In this project I've used:

* [API documentation with ApiGen](http://intermesh.io/angular/docs)
* [AngularJS](http://angularjs.org/)
* [Bootstrap](http://getbootstrap.com)
* [bower](http://bower.io) to mange 3rd party packages
* services, directives and filters to communicate with the Intermesh PHP server API.
* [grunt](http://gruntjs.com/) to build the application, documentation and maintain index.html so it's not needed to add new scripts all the time.
* [FontAwesome](http://fortawesome.github.io/Font-Awesome) For great scalable vector icons


## Getting started
1. To get started with development you will minimally need to install:
  * [NPM](https://www.npmjs.org/)
  * [bower](http://bower.io)
  * [grunt](http://gruntjs.com/)
  * [sass](http://sass-lang.com/)

  On Ubuntu:

  Install git and npm with apt:

  `````````````````````````
  $ sudo apt-get install git npm
  `````````````````````````

  I had to work around a bug with (see https://github.com/joyent/node/issues/3911):

  ``````````````````````````````````````````
  $ sudo ln -s /usr/bin/nodejs /usr/bin/node
  ``````````````````````````````````````````

  Install bower and grunt with npm:

  ````````````````````````````````
  $ sudo npm install -g bower grunt-cli
  ````````````````````````````````
2. Clone the repository:

  ``````````````````````````````````````````````````````````````````````
  $ git clone https://github.com/Intermesh/intermesh-angular-example.git
  ``````````````````````````````````````````````````````````````````````

3. Get all the required NPM modules by running (I had to clear the tmp folder in my home directory becasue they are owned by root now):

  ``````````````````````````````
  $ sudo rm -Rf /home/mschering/tmp/
  $ cd intermesh-angular-example
  $ npm install
  ``````````````````````````````

  This will automatically run "bower install" too. This will install all bower
  components required.

	Now navigate to the "app" folder with your browser.

4. Install SASS for the stylesheets

	Installing ruby
	````````````````````````````````````````````````
	$ sudo apt-get install ruby-full build-essential
	````````````````````````````````````````````````

	Installing rubygems
	```````````````````````````````````````````
	$ sudo apt-get install rubygems-integration
	```````````````````````````````````````````

	Install sass
	`````````````````````
	$ sudo gem install sass
	`````````````````````

	check if sass is working
	`````````
	$ sass -v
	`````````

	Install compass
	``````````````````````````
	$ sudo gem install compass
	``````````````````````````

I used [grunt](http://gruntjs.com/) to maintain the scripts in index.html. It
automatically puts all javascript and css files in the index.html file.
Additionally it can build a distribution with minified scripts.

Run:

`````````````
$ grunt watch
`````````````

to keep the CSS up to date with SASS and to update the index.html with newly
added scripts.

I got a wierd error "Waiting…Fatal error: watch ENOSPC". I don't know why but I fixed it with this command:

````````````````````````````````````````````````````````````````````````````````````````
$ echo fs.inotify.max_user_watches=524288 | sudo tee -a /etc/sysctl.conf && sudo sysctl -p
````````````````````````````````````````````````````````````````````````````````````````

I found this on http://stackoverflow.com/questions/16748737/grunt-watch-error-waiting-fatal-error-watch-enospc

Run grunt with no command to create a distribution release:

```````
$ grunt
```````

## Naming conventions

Found on https://github.com/mgechev/angularjs-style-guide

1. Modules,Directives,Filters should be named with lowerCamelCase
2. Services, Controllers should be named with UpperCamelCase
3. File names should be lowercase and use hyphens (-).


## Making changes to the intermesh-angular-framework package

Sometimes it's necessary to change the bowser component in this project.
You can do this with the bower [link](http://bower.io/docs/api/#link) feature.

Create a link on your computer:
````````````````````````````````
$ cd intermesh-angular-framework
$ bower link
````````````````````````````````

Now link it in the example:
````````````````````````````````````````
$ cd intermesh-angular-example
$ bower link intermesh-angular-framework
`````````````````````````````````````````

Now the folder has become a symlink. So anywhere you make changes it will stay in
sync.




TODO
====
* Token based auth
* Reset model when pressing cancel
