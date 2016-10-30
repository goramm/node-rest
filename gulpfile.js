'use strict';

var gulp = require('gulp');
var nodemon = require('gulp-nodemon');
var mocha = require('gulp-mocha');

gulp.task('test', function(){
	gulp.src('tests/*.js', { read: false })
		.pipe(mocha({ reporter: 'nyan' }));
});

gulp.task('default', function(){
	nodemon({
		script: 'app.js',
		ext: 'js',
		env: {
			PORT: 8000,
		},
		ignore: ['./node_modules/**']
	}).on('restart', function(){
		console.log('Restarting server...');
	});

});