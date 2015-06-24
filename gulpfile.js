var gulp       = require('gulp'),
    plugins    = require('gulp-load-plugins')(),
    del        = require('del'),
    es         = require('event-stream'),
    bowerFiles = require('main-bower-files'),
    print      = require('gulp-print'),
    Q          = require('q');