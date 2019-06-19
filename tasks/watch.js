module.exports = function (gulp, $, browserSync) {
	gulp.task('watch', function () {
		gulp.watch(['./src/styles/**/*.scss', './src/lib/**/*.scss'], ['inject-sass','tao-sass']);
		gulp.watch('./src/img/**/*.*', ['copy-img']);
		gulp.watch(['./src/templates/**/*.pug', './src/lib/**/*.pug'], ['tao-html']);
		gulp.watch('./src/scripts/**/*.js', ['tao-js']);
		gulp.watch("./dist/**/*.*").on('change', browserSync.reload);
	});
};
