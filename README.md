
Angular AdminLTE
=========

Rewrite of popular **AdminLTE** in **AngularJS**

This is a very basic conversion, planing to optimize dependencies and cleanup...   

### Demo
This **[Demo](http://xmlking.github.io/Angular-AdminLTE/)** is created with [backend-less](#backend-less-frontend-testing) static gh-pages. 

### Features

* blah blah blah 
* blah blah blah
* blah blah blah 
 
### Getting Started

```bash
# Clone this repo
git clone https://github.com/xmlking/Angular-AdminLTE

# Install development tools at global location(one-time)
brew install node   # `node -v && npm -v` verify node installation. 
brew install ruby   # only install if it not installed already. Mac may already have it at `/usr/bin/ruby` 

npm install -g bower
npm install -g gulp
npm install -g karma-cli

# Install the dev dependencies for project, such as Karma, Traceur, etc.
npm install   # run  'npm install && npm prune' whenever you upgraded versions in package.json.

# Install runtime dependencies for project with bower.
bower install # run 'bower install && bower prune' whenever you upgraded versions in bower.json.

# Install SASS
[sudo] gem install sass # verify  `sass --version` > 3.3.0

# Start the server and watch for file changes to transpile ES6 files, live reload pages etc. 
gulp serve  # gulp --fatal=off serve # no errors should kill the live server.

# Build project: creates  `dist` directory for deployment to Web Servers. 
gulp --env=PROD # or NODE_ENV=PROD gulp  # `set NODE_ENV=PROD` and `gulp` for windows

# Other Gulp Commands
gulp or `gulp build`    # to build an optimized version of your application in /dist
gulp serve              # to launch a browser sync server on your source files
gulp serve:dist         # to launch a server on your optimized application
gulp wiredep            # to fill bower dependencies in your .html file(s)
gulp test               # to launch your unit tests with Karma
gulp protractor         # to launch your e2e tests with Protractor
gulp protractor:dist    # to launch your e2e tests with Protractor on the dist files
gulp deploy             # to deploy dist folder to gh-pages

# Maintenance 
npm update -g           #update all outdated global packages
npm update --save-dev   #update all outdated local packages (run from project directory) 
npm update npm -g       #self npm update
brew update && brew doctor
brew upgrade node       #update to latest node version
```

### Running the [tests](./test/)
This will start Karma and Chrome
```bash
gulp test
```
Karma will watch the source code and run the tests anytime you save a change.
```bash
gulp tdd
```

### Backend-less frontend testing 
```bash
gulp --env=TEST serve
```
***however you can also use this pre-build Grails App [apiApp.war](https://github.com/xmlking/grails-batch-rest/releases) as backend for this SPA App.*** 

### Options
By default, plugin errors will cause Gulp to halt. Errors and warnings are fatal. 
If you want to keep Gulp running, use the --fatal=off flag. 
```bash
gulp                  # defaults to fatal=error
gulp --fatal=error
gulp --fatal=warning
gulp --fatal=off      # no errors should kill the build
alias g='gulp --fatal=off --env=DEV' // tip for smooth development.
```
####Setting build environment variable for environment-specific gulp tasks: 
Application is by default set with production environment specific settings which can be overridden 
by adding environment specific angular modules (dev.env.js , test.env.js) to [index.js](./app/scripts/index.js) via Gulp command-line arguments.  
By default `templateCache` is disabled and `SourceMaps`, `type assertions` are enabled.  
```bash
gulp --env=PROD task   # or `NODE_ENV=PROD gulp task` : set `global.optimize = true`. This will disable SourceMaps,type assertions  and enable templateCache    
gulp --env=TEST task   # TEST mode for backend-less testing in CI env. data from [fixtures](./test/fixtures) will be served.
gulp --env=DEV  task   # DEV mode points to local backend URLs.
```

###Compatibility
The app was tested on:
 
  * Firefox (>= v31)
  * Chrome (>= v37)
  * Chrome (<= v36), with the following flag enabled: `chrome://flags/#enable-javascript-harmony` (copy/paste into your address-bar)
  
  * Node ***v0.10.32(stable)*** or ***v0.11.14(latest)***. skip ***v0.11.13***  [bug](https://github.com/isaacs/node-graceful-fs/issues/31)

### Tips
If you are behind firewall and want to force **Bower** to get files from `https://` instead of `git://`
```bash
git config --global url."https://".insteadOf git://
```
In case you want to revert that global configuration change
```bash
git config --global --unset url."https://".insteadOf
```
Best way to mange node versions is through [N](https://github.com/visionmedia/n) 
```bash
 npm install -g n
```
 
 
 
### Credits
@almasaeed2010 
