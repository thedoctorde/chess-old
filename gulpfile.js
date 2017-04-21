'use strict';
var tempFolder = 'dist';

const gulp = require('gulp');
const runSequence = require('run-sequence');
const plumber = require("gulp-plumber");
const sass = require('gulp-sass');
const concat = require('gulp-concat');
const del = require('del');
const browserSync = require('browser-sync').create('sync');
const reload = browserSync.reload;

gulp.task('styles', function () {
    gulp.src('src/sass/styles.scss')
    // .pipe(csscomb())
        .pipe(plumber())
        .pipe(sass())
        .pipe(concat("./styles.css"))
        .pipe(gulp.dest(tempFolder + '/css'))
        .pipe(reload({stream: true}))

});

gulp.task('styles-reload', function () {
    gulp.src('src/sass/styles.scss')
        .pipe(reload({stream: true}))
});

gulp.task('html', function () {
    return gulp.src('src/**/*.html')
        .pipe(gulp.dest(tempFolder))
        .pipe(reload({stream: true}))
});

gulp.task('js', function () {
    return gulp.src('src/**/*.js')
        .pipe(gulp.dest(tempFolder ))
        .pipe(reload({stream: true}))
});

gulp.task('clean', function () {
    return del(tempFolder);
});

gulp.task('build', function (callback) {
    runSequence('clean',
        'images',
        'styles',
        'html',
        'js',
        'browserSync',
        callback);
});

gulp.task('browserSync', function () {
    browserSync.init({
        ui: {
            port: 8080,
            weinre: {
                port: 9090
            }
        },
        notify: false,
        server: {
            baseDir: tempFolder,
            directory: true,
            index: "index.html"
        },
        open: true

    });
});

gulp.task('images', function () {
    return gulp.src('src/img/**/*.{png,jpg,gif,svg}')
        .pipe(gulp.dest(tempFolder + "/img"));
});

gulp.task('default', ['build'], function () {
    gulp.watch('src/sass/**/*.scss', ['styles']);
    gulp.watch('src/*.html', ['html']);
    gulp.watch('src/**/*.js', ['js']);
    gulp.watch('src/img/**/*.{png,jpg,gif,svg}', ['images']);
    gulp.watch('src/sass/styles.scss', ['styles-reload']);
});

