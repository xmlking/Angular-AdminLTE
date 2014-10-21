'use strict';

let browserSync = require('browser-sync'),
  httpProxy = require('http-proxy');

/* This configuration allow you to configure browser sync to proxy your backend */
let proxyTarget = 'http://server/context/'; // The location of your backend
let proxyApiPrefix = 'api'; // The element in the URL which differentiate between API request and static file request

let proxy = httpProxy.createProxyServer({
  target: proxyTarget
});

let proxyMiddleware = (req, res, next) => {
  if (req.url.indexOf(proxyApiPrefix) !== -1) {
    proxy.web(req, res);
  } else {
    next();
  }
};

let browserSyncInit = (baseDir, files, browser) => {
  browser = browser === undefined ? 'default' : browser;

  browserSync.init(files, {
    startPath: '/index.html',
    server: {
      baseDir: baseDir,
      routes: {
        '/source': '/app/modules'
      },
      middleware: proxyMiddleware
    },
    //ghostMode: false,
    browser: browser
  });

};

export default function server(gulp, cfg, args) {
  gulp.task('serve', ['watch'], () => {
    browserSyncInit([
      '.tmp',
      'app',
      './'
    ], [
      'app/*.html',
      '.tmp/styles/**/*.css',
      'app/modules/**/*.js',
      'app/modules/**/partials/*.html',
      'app/images/**/*'
    ]);
  });

  gulp.task('serve:dist', ['default'], () =>  {
    browserSyncInit('dist');
  });

  gulp.task('serve:e2e', () => {
    browserSyncInit(['.tmp', 'app', './' ], null, []);
  });

  gulp.task('serve:e2e-dist', ['watch'], () => {
    browserSyncInit('dist', null, []);
  });
}
