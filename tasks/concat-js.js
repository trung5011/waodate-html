module.exports = function (gulp, $, browserSync) {
	gulp.task('concat-js', function () {
		return gulp.src([
				'bower_components/jquery/dist/jquery.min.js',
				'bower_components/jquery/dist/jquery-migrate-1.2.1.min.js',
				'bower_components/popper.js/dist/umd/popper.min.js',
				'bower_components/bootstrap/dist/js/bootstrap.min.js',
				'bower_components/OwlCarousel/dist/owl.carousel.min.js',
			])
			.pipe($.concat('thuvien.js'))
			.pipe(gulp.dest('./dist/js'));
	});
};
