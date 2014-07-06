var assets = './assets/',
	sheets = './sass/';

var gulp 		= require('gulp'),
	sass 		= require('gulp-ruby-sass'),
	minify		= require('gulp-minify-css'),
	livereload	= require('gulp-livereload'),
	rename		= require('gulp-rename'),
	notify		= require('gulp-notify');