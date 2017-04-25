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

gulp.task('publish:js', function() {
  gulp.src(['src/**/*.js'])
    .pipe(babel({
            presets: ['es2015',"stage-0"]
        }))
    .pipe(gulp.dest('lib/'));
});
gulp.task('publish:css', function() {
  gulp.src('src/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('lib'));
  // gulp.src(['src/*.scss'])
  //   .pipe(gulp.dest('lib/'));
});

gulp.task('publish',function() {
  webpack(getWebpackConfig, function (err, stats) {
    if (err) { gutil.log(err);}

    gutil.log(stats.toString({
      colors: true,
      chunks: true
    }));
  });
})
//浏览器化
gulp.task('build', ['clean','publish']);
//只编译，不浏览器化
gulp.task('build2',['clean','publish:js','publish:css']);

