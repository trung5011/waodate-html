module.exports = function (gulp, $, browserSync) {
	gulp.task('concat-css', function () {
		return gulp.src([
				'bower_components/font-awesome/css/font-awesome.min.css',
				'bower_components/animate.css/animate.min.css',
				'bower_components/bootstrap/dist/css/bootstrap.min.css',
				'bower_components/OwlCarousel/dist/assets/owl.carousel.min.css',
				'bower_components/OwlCarousel/dist/assets/owl.theme.default.min.css',
				'src/resource/css/style.css',
				'bower_components/fancybox/dist/jquery.fancybox.min.css'

			])
			.pipe($.concat('thuvien.css'))
			.pipe(gulp.dest('./dist/css'));
	});
};
