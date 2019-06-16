module.exports = function (gulp, $, browserSync,del) {
	gulp.task('clean', function () {
		return del([
			'dist/*.html',
			'dist/css/*.css',
			'dist/img/**',
			'dist/js/*.js',
			'dist/favicon/**',
		  ]);
	});
};
