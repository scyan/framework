var path = require('path'),
    gulp = require('gulp'),
    babel=require('gulp-babel'),
    sass=require('gulp-sass'),
    gutil=require('gulp-util'),
    webpack = require('webpack'),
    del=require('del'),
    // server = require('gulp-server-livereload');
    getWebpackConfig = require('./webpack.config');

gulp.task('clean', (cb) => {
    del(['build', 'lib']).then(() => {
        cb();
    });
});

gulp.task('publish:js',['clean'], function() {
  gulp.src(['src/**/*.js'])
    .pipe(babel())
    .pipe(gulp.dest('lib/'));
});
gulp.task('publish:css', ['clean'],function() {
  // gulp.src('src/**/*.scss')
  //   .pipe(sass().on('error', sass.logError))
  //   .pipe(gulp.dest('lib'));
  gulp.src(['src/**/*.scss'])
    .pipe(gulp.dest('lib/'));
});

gulp.task('publish',['clean'],function() {
  webpack(getWebpackConfig, function (err, stats) {
    if (err) { gutil.log(err);}

    gutil.log(stats.toString({
      colors: true,
      chunks: true
    }));
  });
})
//浏览器化
gulp.task('build', ['publish']);
//只编译，不浏览器化
gulp.task('build2',['publish:js','publish:css']);

