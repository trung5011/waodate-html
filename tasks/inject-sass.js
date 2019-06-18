module.exports = function (gulp, $, browserSync) {
	gulp.task('inject-sass', function () {
		let defaultNotification = function (err) {
			return {
				subtitle: err.plugin,
				message: err.message,
				sound: 'Funk',
				onLast: true,
			};
		};
		return gulp
			.src('./src/styles/style.scss')
			.pipe(
				$.inject(gulp.src('./src/lib/**/*.scss', { read: false }), {
					starttag: '// inject:imports',
					endtag: '// endinject',
					relative: true,
					transform: function(filepath) {
						return '@import "' + filepath + '";';
						// return console.log(filepath)
					},
				})
			)
			.pipe(gulp.dest('./src/styles/'));
	});
};
