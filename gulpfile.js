'use strict';
require('traceur').require.makeDefault(function(filename) {
    // don't transpile our dependencies, just our app
    return filename.indexOf('node_modules') === -1;
}, { });

require('./tasks/index');
