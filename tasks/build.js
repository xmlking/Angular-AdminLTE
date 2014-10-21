//import {ErrorHandler} from './error-handler';

let del         = require('del'),
  rjs         = require('requirejs'),
  runSequence = require('run-sequence'),
  gif         = require('gulp-if'),
  useref      = require('gulp-useref'),
  replace     = require('gulp-replace'),
  csso        = require('gulp-csso');

export default function build(gulp, cfg, args) {
  'use strict';

  gulp.task('bundle', ['partials', 'scripts'], () =>  {
    return new Promise((resolve, reject) => {
      rjs.optimize(cfg.buildProfile, function (buildResponse) {
        //console.log('build response', buildResponse);
        resolve(buildResponse);
      }, function (err) {
        reject(err);
      });
    });
  });

  gulp.task('html', ['styles'], () => {
    let assets = useref.assets({searchPath: '{.tmp,app}', types: ['css']});
    return gulp.src('app/*.html')
      .pipe(assets)
//            .pipe($.ngAnnotate())
//            .pipe(gif('*.js', $.uglify({preserveComments: 'some'})))
      .pipe(gif('*.css', csso()))
      .pipe(assets.restore())
      .pipe(useref())
      .pipe(replace('bower_components/bootstrap-sass-official/assets/fonts/bootstrap', 'fonts'))
      .pipe(gulp.dest('dist'));
  });

  gulp.task('extras', () => {
    return gulp.src(['app/*.*', '!app/*.html', 'app/modules**/**/*.json', 'app/modules/**/elements/*.html'], {dot: true})
      .pipe(gulp.dest('dist'));
  });

  gulp.task('clean', (cb) => {
    del(['.tmp', 'dist'], cb);
  });

  /**
   * Warning - optimizer task has to be done first, coz it overwrites  :(
   */
  gulp.task('build', (cb) => {
    runSequence('bundle', 'html', ['images', 'fonts', 'extras'], cb);
  });

  gulp.task('default',  (cb) => {
    runSequence('clean','build', cb);
  });

}
