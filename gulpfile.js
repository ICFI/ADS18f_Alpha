var gulp       = require('gulp'),
    plugins    = require('gulp-load-plugins')(),
    // del        = require('del'),
    // es         = require('event-stream'),
    bowerFiles = require('main-bower-files'),
    // print      = require('gulp-print'),
    // Q          = require('q'),
    paths      = {
        scripts          : './public/app/**/*.js',
        styles           : ['./public/css/**/*.css', './public/less/main.less'],
        images           : './images/**/*',
        index            : './app/index.html',
        partials         : ['/public/app/**/*.html', '!/public/app/index.html'],
        distDev          : './dist-dev',
        distProd         : './dist-prod',
        distScriptsProd  : './dist-prod/scripts',
        scriptsDevServer : 'devServer/**/*.js'
    },
    pipes       = {},
    noop        = function () {};

pipes.orderedVendorScripts = function () {
    return plugins.order(['jquery.js', 'angular.js']);
};

pipes.orderedAppScripts = function () {
    return plugins.angularFilesort();
};

pipes.minifiedFileName = function () {
    return plugins.rename(function (path) {
        path.extname = '.min' + path.extname;
    });
};

pipes.lintedAppScripts = function () {
    return gulp.src(paths.scripts)
        .pipe(plugins.jshint())
        .on('error', noop)                        // don't stop on error 
        .pipe(plugins.jshint.reporter('jshint-stylish'));
};

pipes.builtVendorScriptsDev = function () {
    return gulp.src(bowerFiles())
        .pipe(gulp.dest(paths.distDev + '/bower_components'));
};

pipes.builtVendorScriptsProd = function () {
    return gulp.src(bowerFiles('**/*.js'))
        .pipe(pipes.orderedVendorScripts())
        .pipe(plugins.concat('vendor.min.js'))
        .pipe(plugins.uglify())
        .pipe(gulp.dest(paths.distScriptsProd));
};

pipes.scriptedPartials = function () {
    return gulp.src(paths.partials)
        .pipe(plugins.ngHtml2js({
            moduleName: "ads18fApp"
        }));
};

pipes.builtStylesDev = function () {
    return gulp.src(paths.styles)
        .pipe(plugins.less())
        .pipe(gulp.dest(paths.distDev));
};

pipes.builtStylesProd = function () {
    return gulp.src(paths.styles)
            .pipe(plugins.less())
            .pipe(plugins.minifyCss())
        .pipe(pipes.minifiedFileName())
        .pipe(gulp.dest(paths.distProd));
};

gulp.task('lint-app-scripts', pipes.lintedAppScripts);

gulp.task('build-styles-dev', pipes.builtStylesDev);

gulp.task('build-styles-prod', pipes.builtStylesProd);

gulp.task('build-vendor-scripts-prod', pipes.builtVendorScriptsProd);
