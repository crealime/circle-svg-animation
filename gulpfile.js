var gulp = require('gulp'),
		sass = require('gulp-sass'),
		browserSync = require('browser-sync'),
		concat = require('gulp-concat'),
		uglify = require('gulp-uglifyjs'),
		cssnano = require('gulp-cssnano'),
		rename = require('gulp-rename'),
		autoprefixer = require('gulp-autoprefixer'),
		del = require('del'),
		imagemin = require('gulp-imagemin'),
		imageminPngquant = require('imagemin-pngquant'),
		imageminMozjpeg = require('imagemin-mozjpeg'),
		imageminGifsicle = require('imagemin-gifsicle'),
		imageminSvgo = require('imagemin-svgo'),
		cache = require('gulp-cache'),
		pug = require('gulp-pug'),
		media = require('gulp-merge-media-queries');

gulp.task('pug', function() {
  gulp.src('src/pug/*.pug')
    .pipe(pug({
      pretty: '\t'
    }))
    .pipe(gulp.dest('src'))
    .pipe(browserSync.reload({stream: true}));
});

gulp.task('sass', function() {
	return gulp.src('src/sass/**/*.+(sass|scss)')
	.pipe(sass({outputStyle: 'expanded'}).on('error', sass.logError))
	.pipe(autoprefixer(['> 1%', 'last 10 versions'], { cascade: true }))
	.pipe(media())
	.pipe(gulp.dest('src/css'))
	.pipe(browserSync.reload({stream: true}));
});

gulp.task('scripts', function() {
	return gulp.src([
		'src/libs/jquery/dist/jquery.min.js'
	])
	.pipe(concat('libs.min.js'))
	.pipe(uglify())
	.pipe(gulp.dest('src/js'));
});

gulp.task('css', function(){
	return gulp.src([
		'!src/css/**/*.min.css',
		'src/css/**/*.css'
	])
	.pipe(cssnano())
	.pipe(rename({suffix: '.min'}))
	.pipe(gulp.dest('src/css'));
});

gulp.task('img', function() {
	return gulp.src([
		'src/img/**/*.+(jpg|jpeg|png|gif|svg)'
	])
	.pipe(imagemin([
		imageminMozjpeg({
			progressive: true,
			quality: 50,
			smooth: 30
		}),
		imageminPngquant(),
		imageminGifsicle({
			// optimizationLevel: 3,
			// colors: 256,
			interlaced: true
		}),
		imageminSvgo({
			plugins: [
				{removeViewBox: false}
			]})
	]))
	.pipe(gulp.dest('dist/img'));
});

gulp.task('livereload', function() {
	browserSync({
		server: {
			baseDir: 'src'
		}
	});
});

gulp.task('clean', function() {
	return del.sync('dist');
});

gulp.task('build', ['clean', 'img', 'sass', 'css', 'scripts'], function() {
	var buildCss = gulp.src('src/css/**/*.css')
	.pipe(gulp.dest('dist/css'));

	var buildFonts = gulp.src('src/fonts/**/*')
	.pipe(gulp.dest('dist/fonts'));

	var buildJs = gulp.src('src/js/**/*.js')
	.pipe(gulp.dest('dist/js'));

	var buildHtml = gulp.src('src/*.html')
	.pipe(gulp.dest('dist'));
})

gulp.task('watch', ['pug', 'livereload', 'sass'], function() {
	gulp.watch('src/pug/**/*.pug', ['pug']);
	gulp.watch('src/sass/**/*.+(sass|scss)', ['sass']);
	gulp.watch('src/js/**/*.js', browserSync.reload);
});

gulp.task('default', ['watch']);