var gulp = require('gulp');
var path = require('path');
var sass = require('gulp-sass');
var watch = require('gulp-watch');

var paths = {
    sassSrc: 'sass-files/**/*.scss',
    sassDest: 'public/stylesheets'
};

gulp.task('sass', function () {
    gulp.src(paths.sassSrc)
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest(paths.sassDest));
});

gulp.task('watch', function () {
    console.log("watching....");
    gulp.watch(paths.sassSrc, ['sass']);
});

gulp.task('default', ['watch'], function () {

});