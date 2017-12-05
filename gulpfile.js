var gulp = require('gulp');
var postcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer');
var cssnano = require('cssnano');
var sass = require('gulp-sass');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var pump = require('pump');

gulp.task('main', function() {
    let processors = [
	autoprefixer,
	cssnano
    ];
    
    gulp.src('_sass/main.scss')
	.pipe(sass().on('error', sass.logError))
	.pipe(postcss(processors))
	.pipe(rename({
	    suffix: '.min'
	}))
	.pipe(gulp.dest('assets/css/'));
});

gulp.task('compress', function (cb) {
    pump([
	gulp.src('assets/js/src/*.js')
	    .pipe(rename({
		suffix: '.min'
	    })),
	uglify(),
	gulp.dest('assets/js/')
    ],cb);
});

gulp.task('default', function() {
    gulp.watch('_sass/*.scss', ['main']);
    gulp.watch('assets/js/src/*.js', ['compress']);
});
