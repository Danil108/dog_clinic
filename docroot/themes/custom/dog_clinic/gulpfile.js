'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var postcss = require('gulp-postcss');
var sassGlob = require('gulp-sass-glob');
var autoprefixer = require('autoprefixer');
var sourcemaps = require('gulp-sourcemaps');
var livereload = require('gulp-livereload');
var eslint = require('gulp-eslint');

// Define list of vendors.
var _vendors = [];


gulp.task('sass:build', function () {
  gulp.src('./scss/*.scss')
    .pipe(sourcemaps.init())
    .pipe(sassGlob())
    .pipe(sass({
      outputStyle: 'expanded',
      includePaths: _vendors
    }).on('error', sass.logError))
    .pipe(postcss([
      autoprefixer({
        browsers: ['last 2 versions', '>5%']
      })
    ]))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('./css'));
});

gulp.task('watch', function () {
  gulp.watch('./scss/**/*.scss', ['sass:build']);
});

gulp.task('default', ['sass:build', 'watch']);
