var path = require('path'),
    gulp = require('gulp'),
    webpack = require('webpack'),
    gutil=require('gulp-util'),
    // server = require('gulp-server-livereload');
    getWebpackConfig = require('./webpack.config');

// gulp.task('publish:js', function() {
//   gulp.src(['src/*.js'])
//     .pipe(babel({
//             presets: ['es2015',"stage-0"]
//         }))
//     .pipe(gulp.dest('lib/'));
// });
gulp.task('publish:js',function() {
  webpack(getWebpackConfig, function (err, stats) {
    if (err) { gutil.log(err);}

    gutil.log(stats.toString({
      colors: true,
      chunks: true
    }));
  });
})
// gulp.task('publish:css', function() {
//   gulp.src('src/**/*.scss')
//     .pipe(sass().on('error', sass.logError))
//     .pipe(gulp.dest('lib'));
//   // gulp.src(['src/*.scss'])
//   //   .pipe(gulp.dest('lib/'));
// });
gulp.task('build', ['publish:js']);