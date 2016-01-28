var gulp = require('gulp'),
  ts = require('gulp-typescript'),
  jade = require('gulp-jade'),
  stylus = require('gulp-stylus'),
  server = require('gulp-develop-server'),
  runSequence = require('run-sequence');
 
gulp.task('compileTs', function() {
	return gulp.src('src/**/*.ts')
		.pipe(ts({
			noImplicitAny: true,
			out: 'script.js'
		}))
		.pipe(gulp.dest('built'));
    gulp.start('restartExpress');
});

gulp.task('compileJade', function(){
  gulp.src('src/**/*.jade')
      .pipe(jade({}))
      .pipe(gulp.dest('built/html'));
});

gulp.task('compileStylus', function () {
  gulp.src('src/**/*.styl')
    .pipe(stylus())
    .pipe(gulp.dest('built/css'));
});

gulp.task('startExpress', function() {
  server.listen( { path: 'built/script.js' } );
});

gulp.task('restartExpress', function(){
  server.restart();
});
 
gulp.task('default', function () {
  gulp.start('compileTs', 'compileJade', 'compileStylus', 'startExpress');
  
  gulp.watch('src/**/*.ts', function(){
    runSequence('compileTs', 'restartExpress');
  });
  gulp.watch('src/**/*.jade', ['compileJade']);
  gulp.watch('src/**/*.styl', ['compileStylus']);
});