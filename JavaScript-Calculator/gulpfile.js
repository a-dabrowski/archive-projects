var gulp = require('gulp');
var sass = require('gulp-sass');

gulp.task('sass', function(){
  return gulp.src('styleJScalc.scss')
    .pipe(sass()) // Converts Sass to CSS with gulp-sass
    .pipe(gulp.dest(''));
});


gulp.task('watch', function(){
gulp.watch('styleJScalc.scss', ['sass']);
  // Other watchers
});
