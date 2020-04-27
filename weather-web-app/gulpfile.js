var gulp = require('gulp');
var sass = require('gulp-sass');

gulp.task('sass', function(){
  return gulp.src('styles.scss')
    .pipe(sass()) // Converts Sass to CSS with gulp-sass
    .pipe(gulp.dest(''));
});


gulp.task('watch', function(){
gulp.watch('styles.scss', ['sass']);
  // Other watchers
});
