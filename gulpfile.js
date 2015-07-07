var gulp       = require('gulp'),
    plugins    = require('gulp-load-plugins')(),
    del        = require('del'),
    es         = require('event-stream'),
    bowerFiles = require('main-bower-files'),
    // print      = require('gulp-print'),
    Q          = require('q'),
    paths      = {
        scripts          : './public/app/**/*.js',
        styles           : ['./public/css/**/*.css', './public/less/main.less'],
        images           : './images/**/*',
        index            : './server/views/index.jade',
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

pipes.scriptedPartials = function () {
    return gulp.src(paths.partials)
        .pipe(plugins.ngHtml2js({
            moduleName: "ads18fApp"
        }));
};

pipes.builtPartialsDev = function () {
    return gulp.src(paths.partials)
        .pipe(gulp.dest(paths.distDev));
};

pipes.builtAppScriptsDev = function () {
    return pipes.lintedAppScripts()
        .pipe(gulp.dest(paths.distDev));
};

pipes.builtVendorScriptsDev = function () {
    return gulp.src(bowerFiles('**/*.js'))
        .pipe(gulp.dest(paths.distDev + '/bower_components'));
};

pipes.builtVendorScriptsProd = function () {
    return gulp.src(bowerFiles('**/*.js'))
        .pipe(pipes.orderedVendorScripts())
        .pipe(plugins.concat('vendor.min.js'))
        .pipe(plugins.uglify())
        .pipe(gulp.dest(paths.distScriptsProd));
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

pipes.builtAppScriptsProd = function () {
    var scriptedPartials = pipes.scriptedPartials();
    var lintedAppScripts = pipes.lintedAppScripts();

    return es.merge(scriptedPartials, lintedAppScripts)
        .pipe(pipes.orderedAppScripts())
            .pipe(plugins.concat('app.min.js'))
            .pipe(plugins.uglify())
        .pipe(gulp.dest(paths.distScriptsProd));
};

pipes.builtIndexDev = function () {

    var orderedVendorScripts = pipes.builtVendorScriptsDev()
        .pipe(pipes.orderedVendorScripts());

    var orderedAppScripts = pipes.builtAppScriptsDev()
        .pipe(pipes.orderedAppScripts());

    var appStyles = pipes.builtStylesDev();

    return gulp.src(paths.index)
        .pipe(gulp.dest(paths.distDev)) // write first to get relative path for inject
        .pipe(plugins.inject(orderedVendorScripts, {relative: true, name: 'bower'}))
        .pipe(plugins.inject(orderedAppScripts, {relative: true}))
        .pipe(plugins.inject(appStyles, {relative: true}))
        .pipe(gulp.dest(paths.distDev));
};

pipes.builtIndexProd = function () {

    var vendorScripts = pipes.builtVendorScriptsProd();
    var appScripts = pipes.builtAppScriptsProd();
    var appStyles = pipes.builtStylesProd();

    return gulp.src(paths.index)
        .pipe(gulp.dest(paths.distProd)) // write first to get relative path for inject
        .pipe(plugins.inject(vendorScripts, {relative: true, name: 'bower'}))
        .pipe(plugins.inject(appScripts, {relative: true}))
        .pipe(plugins.inject(appStyles, {relative: true}))
        .pipe(plugins.htmlmin({collapseWhitespace: true, removeComments: true}))
        .pipe(gulp.dest(paths.distProd));
};

pipes.builtAppDev = function () {
    return es.merge(pipes.builtIndexDev(), pipes.builtPartialsDev());
};

pipes.builtAppProd = function () {
    return es.merge(pipes.builtIndexProd());
};

// removes all compiled dev files
gulp.task('clean-dev', function () {
    var deferred = Q.defer();
    del(paths.distDev, function () {
        deferred.resolve();
    });
    return deferred.promise;
});

// removes all compiled production files
gulp.task('clean-prod', function () {
    var deferred = Q.defer();
    del(paths.distProd, function () {
        deferred.resolve();
    });
    return deferred.promise;
});

gulp.task('lint-app-scripts', pipes.lintedAppScripts);

gulp.task('build-styles-dev', pipes.builtStylesDev);

gulp.task('build-styles-prod', pipes.builtStylesProd);

gulp.task('build-app-scripts-dev', pipes.builtAppScriptsDev);

gulp.task('build-app-scripts-prod', pipes.builtAppScriptsProd);

gulp.task('build-vendor-scripts-dev', pipes.builtVendorScriptsDev);

gulp.task('build-vendor-scripts-prod', pipes.builtVendorScriptsProd);

gulp.task('build-app-dev', pipes.builtAppDev);

gulp.task('build-app-prod', pipes.builtAppProd);

gulp.task('clean-build-app-dev', ['clean-dev'], pipes.builtAppDev);

gulp.task('clean-build-app-prod', ['clean-prod'], pipes.builtAppProd);