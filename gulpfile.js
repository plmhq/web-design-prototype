// Directories
var _assets = 'assets/',
	_sheets = 'sass/';

// Gulp dependencies
var gulp 		= require('gulp'),
	autoprefixer= require('gulp-autoprefixer'),
	sass 		= require('gulp-ruby-sass'),
	minify		= require('gulp-minify-css'),
	livereload	= require('gulp-livereload'),
	rename		= require('gulp-rename'),
	notify		= require('gulp-notify'),
	install 	= require('gulp-install');

// Server
var express 	= require('express'),
	app 		= express();

// Installs all bower components
gulp.task('install', function() {
	return gulp.src(['./bower.json'])
		.pipe(install())
		.pipe(notify({ message: 'Bower components installed!' }));
});

// Run SaSS tasks
gulp.task('sass', function() {
	return gulp.src('./sass/default/main.scss')
		.pipe(sass())
		.pipe(autoprefixer('last 2 version', 'safari 5', 'ie 11', 'ios 6', 'android 4'))
		.pipe(rename({ suffix: '.min' }))
		// .pipe(minify())
		.pipe(gulp.dest(_assets + 'css'))
		.pipe(livereload())
		.pipe(notify({ message: 'SaSS tasks finished!' }));
});

// Static server with express
gulp.task('server', function() {
	app.use(express.static(__dirname));

	var server = app.listen(8080, function() {
		console.log('Listening on port %d', server.address().port);
	});
})

// Default task
gulp.task('default', function() {
	// gulp.run('install');
	gulp.run('sass');
	gulp.run('server');

	gulp.watch([_sheets + 'default/**/*.scss', _sheets + 'default/*.scss'], ['sass']);
	gulp.watch('./index.html')
		.on('change', function(file) {
			livereload().changed(file.path);
		});
})