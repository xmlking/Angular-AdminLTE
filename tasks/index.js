import styles   from './styles';
import fonts    from './fonts';
import images   from './images';
import partials from './partials';
import scripts  from './scripts';
import wiredep  from './wiredep';
import watch    from './watch';
import server   from './server';
import unitTests from './unit';
import e2eTests from './e2e';
import build    from './build';
import deploy   from './deploy';

let gulp = require('gulp');
let config = require('./config');
let args = require('yargs').argv;

// Get environment, for environment-specific activities
global.env  = require('yargs').argv.env || process.env.NODE_ENV;
global.optimize = (env === 'PROD');
console.log('Using Env:', env);

styles(gulp, config, args);
fonts(gulp, config, args);
images(gulp, config, args);
partials(gulp, config, args);
scripts(gulp, config, args);
wiredep(gulp, config, args);
watch(gulp, config, args);
server(gulp, config, args);
unitTests(gulp, config, args);
e2eTests(gulp, config, args);
build(gulp, config, args);
deploy(gulp, config, args);
