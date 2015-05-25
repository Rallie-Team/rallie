var gulp = require('gulp');
var livereload = require('gulp-livereload');
var jshint = require('gulp-jshint');
var stylish = require('jshint-stylish');

/*
PASTE <script src="//localhost:35729/livereload.js"></script>
IN THE HEAD OF THE PAGE FOR LIVERELOAD TO WORK
 */


var paths = {
  images: 'client/public/assets/img/*.*',
  styles: 'client/public/assets/css/*.css',
  reactScripts: 'client/public/app/**/*.js',
  html: ['client/public/index.html','client/public/app/**/*.html'],
  server: 'server/**/*.js'
};



gulp.task('styles', function() {
  return gulp.src([
    paths.styles
  ])
  .pipe(livereload());
});

gulp.task('html', function() {
  return gulp.src(
    paths.html
  )
  .pipe(livereload());
});

gulp.task('images', function() {
  return gulp.src([
    paths.images
  ])
  .pipe(livereload());
});

gulp.task('server', function() {
  return gulp.src([
    paths.server
  ])
  .pipe(jshint())
  .pipe(jshint.reporter(stylish));
});

gulp.task('watch', function () {
  livereload.listen();

  gulp.watch(paths.html,['html']);
  gulp.watch(paths.images,['images']);
  gulp.watch(paths.styles,['styles']);
  gulp.watch(paths.reactScripts,['reactScripts']);
  gulp.watch(paths.server,['server']);
});

gulp.task('default', ['watch']);