const gulp = require('gulp');
const sass = require('gulp-sass');
const strip = require('gulp-strip-comments');

gulp.task('sass', function(){
    return gulp.src('./src/*.scss')
    .pipe(sass())
  //  .pipe(strip())
    .pipe(gulp.dest('./dist'));
});

gulp.task('js', function(){
    return gulp.src('./src/*.js')
    .pipe(strip())
    .pipe(gulp.dest('./dist'));
});

gulp.task('watch', function(){
    gulp.watch('./src/*.scss', ['sass']);
    gulp.watch('./src/*.js', ['js']);
});
