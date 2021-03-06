// Require all the things
const gulp = require('gulp'),
sass = require('gulp-sass'),
gutil = require('gulp-util'),
plumber = require('gulp-plumber'),
rename = require('gulp-rename'),
minifyCSS = require('gulp-clean-css'),
prefixer = require('gulp-autoprefixer'),
rev = require('gulp-rev'),
revReplace = require('gulp-rev-replace'),
imagemin = require('gulp-imagemin'),
gulpif = require('gulp-if'),
concat = require('gulp-concat'),
uglify = require('gulp-uglify'),
// uglify = require('gulp-uglify-es').default;
minify = require('gulp-minify'),
cssminify = require('gulp-minify-css'),
useref = require('gulp-useref'),
browserSync  = require('browser-sync').create(),
connect = require('gulp-connect'),
revDel = require('rev-del'),
del = require('del'),
cp = require('child_process'),
run    = require('gulp-run');

// Set the path variables
const base_path = './',
src = base_path + '_assets', //'_dev/src',
dist = base_path + 'assets',
blog_main = 'Z:/mesfinmoges On My Mac/Projects/blogs/blog.mesfinmoges',
rsb_main = 'Z:/mesfinmoges On My Mac/Projects/blogs/blog.rideshareAndBeyond',
ce_main = 'Z:/mesfinmoges On My Mac/Projects/blogs/blog.cleaneatingforlife',

paths = {  
    js: src + '/**/js/*.js',
    css: src + '/**/css/*.css',
    img: src + '/**/img/*',
    html: [ src + '/*.html', src + '/**/*.html'],
    htmldist: [ dist + '/*.html', src + '/**/*.html'],
    copyfiles: [ src + '/**/img/*', src + '/**/img/favicons.ico/*'], //, src + '/*.html', src + '/**/*.html'],
    favicon: src + '/**/img/favicons.ico/*',
    scss: [ src +'/sass/*.scss',
            src +'/sass/**/* .scss',
            src +'/sass/**/**/*.scss'],
    jekyll: ['index.html', '_posts/*', '_layouts/*', '_includes/*' , 'assets/*', 'assets/**/*']
};

var config = {
  drafts:     !!gutil.env.drafts      // pass --drafts flag to serve drafts
};
// // Compile sass to css
// gulp.task('compile-sass', () => {  
// return gulp.src(paths.scss)
// .pipe(plumber((error) => {
//   gutil.log(gutil.colors.red(error.message));
//   gulp.task('compile-sass').emit('end');
// }))
// .pipe(sass())
// .pipe(prefixer('last 3 versions', 'ie 9'))
// .pipe(minifyCSS())
// .pipe(rename({dirname: dist + '/css'}))
// .pipe(gulp.dest('./'));
// });


// // minify css files.
// gulp.task('minify-css', function() {
//   return gulp.src(paths.css)
//       .pipe(cssminify())
//       .on('error', function (err) { gutil.log(gutil.colors.red('[Error]'), err.toString()); })
//       .pipe(gulp.dest(dist))
//       .pipe(browserSync.stream());
// });

// // uglify html files.
// gulp.task('uglify-html', function() {
//   return gulp.src(paths.html)
//       .pipe(minify())
//       .on('error', function (err) { gutil.log(gutil.colors.red('[Error]'), err.toString()); })
//       .pipe(gulp.dest(dist))
//       .pipe(browserSync.stream());
// });
gulp.task('clean-scripts', function () {
  return del.sync([dist + '/*']);
});

// gulp.task('clean-scripts', function () {
//   return gulp.src(dist, {read: false})
//       .pipe(clean());
// });

// Optimizes and copies image files.
gulp.task('optimize-image', ['clean-scripts'], function() {
  return gulp.src(paths.copyfiles)
      //.pipe(imagemin())
      .pipe(gulp.dest(dist))
      .pipe(browserSync.stream());
});

// revise site assets
gulp.task('revision', ['clean-scripts'], function () {
 // var manifest = gulp.src(dist + "/rev-manifest.json");
  return gulp.src([paths.js, paths.css])

      //.pipe(gulpif('*.css', concat('all.css')))
      .pipe(rev())
     
      //.pipe(minify())    
      .pipe(gulpif('*.js', uglify()))
      .pipe(gulpif('*.css', cssminify()))
      // .on('error', function (err) { gutil.log(gutil.colors.red('[Error]'), err.toString()); })
      .pipe(gulp.dest(dist))  // write rev'd assets to build dir
      .pipe(rev.manifest())
      .pipe(revDel({ dest: 'dist' })) 
      .pipe(gulp.dest(dist))  // write manifest to build dir
      //.pipe(gulpif('*.html', revReplace({manifest: manifest})))
      //.pipe(gulp.dest(dist))
      
});



//replace a hashed asset files names
// gulp.task("revreplace", ['revision'], function() {
//   var manifest = gulp.src(dist + "/rev-manifest.json");
//   var source = paths.htmldist;
//   //var outputFolderHtml = 'webapp/dist/somefolder';

//   return gulp.src(src + '/rideshareandbeyond/landing.html')
//       //.pipe(revreplace({manifest: manifest}))
//       .pipe(revreplace({manifest: manifest, replaceInExtensions: ['.html']}))
//       .on('error', function (err) { gutil.log(gutil.colors.red('[Error]'), err.toString()); })
//       .pipe(gulp.dest(dist));
// });

gulp.task("revreplace", ["revision"], function(){
  var manifest = gulp.src(dist + "/rev-manifest.json");
  //var userefassets = useref.assets();

  return gulp.src(paths.html)
    //.pipe(userefassets.restore())
    //.pipe(useref())
    .pipe(revReplace({manifest: manifest}))
    .pipe(gulp.dest(dist));
});

gulp.task("revreplace_blog", ["revision"], function(){
    var manifest = gulp.src(dist + "/rev-manifest.json");
    //var userefassets = useref.assets();
  
    return gulp.src(blog_main + '/_assets/base.html')
      //.pipe(userefassets.restore())
      //.pipe(useref())
      .pipe(revReplace({manifest: manifest}))
      .pipe(gulp.dest(blog_main + '/_layouts'));
      //.on('error', function (err) { gutil.log(gutil.colors.red('[Error]'), err.toString()); });
  });

  gulp.task("revreplace_rsb", ["revision"], function(){
    var manifest = gulp.src(dist + "/rev-manifest.json");
    //var userefassets = useref.assets();
  
    return gulp.src(rsb_main + '/_assets/base.html')
      //.pipe(userefassets.restore())
      //.pipe(useref())
      .pipe(revReplace({manifest: manifest}))
      .pipe(gulp.dest(rsb_main + '/_layouts'));
      //.on('error', function (err) { gutil.log(gutil.colors.red('[Error]'), err.toString()); });
  });

  gulp.task("revreplace_ce", ["revision"], function(){
    var manifest = gulp.src(dist + "/rev-manifest.json");
    //var userefassets = useref.assets();
  
    return gulp.src(ce_main + '/_assets/base.html')
      //.pipe(userefassets.restore())
      //.pipe(useref())
      .pipe(revReplace({manifest: manifest}))
      .pipe(gulp.dest(ce_main + '/_layouts'));
      //.on('error', function (err) { gutil.log(gutil.colors.red('[Error]'), err.toString()); });
  });

// // Rebuild Jekyll
// gulp.task('build-jekyll', ['revreplace'], (code) => {
// return cp.spawn('jekyll.bat', ['build', '--incremental'], { stdio: 'inherit' }) // Adding incremental reduces build time.
// //.on('error', (error) => gutil.log(gutil.colors.red(error.message)))
// .on('error', function (err) { gutil.log(gutil.colors.red('[Error]'), err.toString()); })
// .on('close', code);
// })

// Runs Jekyll build
gulp.task('build-jekyll', ['revreplace'], function() {
  var shellCommand = 'bundle exec jekyll build  --incremental --config _config.yml';
  if (config.drafts) { shellCommand += ' --drafts'; };

  return gulp.src('')
    .pipe(run(shellCommand))
    .on('error', gutil.log);
});

// Setup Server
gulp.task('server', () => {
connect.server({
root: ['_site'],
port: 4000
});
})

// Watch files
gulp.task('watch', () => {  
// gulp.watch(paths.scss, ['compile-sass']);

//gulp.watch(paths.scss, ['minify-css']);
//gulp.watch(paths.scss, ['uglify-html']);
// gulp.watch(src, ['clean-scripts']);
// gulp.watch(paths.copyfiles, ['optimize-image']);
// gulp.watch([paths.js, paths.css], ['revision']);
// gulp.watch([paths.js, paths.css], ['revreplace']);
// gulp.watch([paths.js, paths.css], ['revreplace_blog']);
// gulp.watch([paths.js, paths.css], ['revreplace_rsb']);
// gulp.watch([paths.js, paths.css], ['revreplace_ce']);
// gulp.watch(paths.jekyll, ['build-jekyll']);
});

// Start Everything with the default task
gulp.task('default', ['clean-scripts','optimize-image', 'revision', 'revreplace','revreplace_blog', 'revreplace_rsb','revreplace_ce','build-jekyll', 'server', 'watch' ]);