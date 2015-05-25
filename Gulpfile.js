var gulp = require('gulp');
var browserify = require('browserify');
var watchify = require('watchify');
var source = require('vinyl-source-stream');
var gutil = require('gulp-util');

var b = watchify(browserify({
  cache: {},
  packageCache: {},
  entries: ['client/public/js/app.js'],
  debug: true,
  transform: ['reactify']
}));

var bundle = function() {
  return b.bundle()
    .pipe(source('bundle.js'))
    .pipe(gulp.dest('client/public/js'));
};

gulp.task('react', bundle);

// Runs watchify again on any changes
b.on('update', bundle);
b.on('log', gutil.log);
