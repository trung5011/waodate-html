const gcmq = require('gulp-group-css-media-queries');

module.exports = function (gulp, $, browserSync) {
	gulp.task('tao-sass', function () {
		let defaultNotification = function (err) {
			return {
				subtitle: err.plugin,
				message: err.message,
				sound: 'Funk',
				onLast: true,
			};
		};
		return gulp.src([
				'./src/styles/**/*.scss',
				'!./src/styles/{**/\_*,**/\_*/**}'
			])
			.pipe($.sourcemaps.init())
			.pipe($.sass().on('error', function (err) {
				$.util.log(err);
			}).on('error', $.notify.onError(defaultNotification)))
			.pipe(gcmq())
			.pipe($.sourcemaps.write(''))
			.pipe(gulp.dest('./dist/css'))
			.pipe(browserSync.stream())
	});
};
