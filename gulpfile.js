// const {src, dest, series, watch} = require('gulp')
// const sass = require('gulp-sass')
// const csso = require('gulp-csso')
// const include = require('gulp-file-include')
// const htmlmin = require('gulp-htmlmin')
// const del = require('del')
// const autoprefixer = require('gulp-autoprefixer')
// const concat = require('gulp-concat')
// const sync = require('browser-sync').create()
//
// function html() {
//     return src(['src/**.html'])
//         .pipe(include({
//             prefix: '@@'
//         }))
//         .pipe(dest('dist'))
// }
//
// function scss_style(){
//     return src('src/scss/style.scss')
//         .pipe(sass())
//         .pipe(autoprefixer({
//             browsers: ['last 2 versions']
//         }))
//         .pipe(concat('style.css'))
//         .pipe(dest('dist'))
//
// }
//
// function clear(){
//     return del('dist')
// }
//
// function serve(){
//     sync.init({
//         server: './dist'
//     })
//
//     watch('src/**.html', series(html)).on('change', sync.reload)
//     watch('src/scss/**.scss', series(scss_style)).on('change', sync.reload)
// }
//
//
// exports.build = series(clear, scss_style, html)
// exports.serve = series(clear, scss_style, html, serve)
// exports.clear = clear
const {src, dest, series, watch} = require('gulp')
const sass = require('gulp-sass')
const csso = require('gulp-csso')
const include = require('gulp-file-include')
const htmlmin = require('gulp-htmlmin')
const del = require('del')
const concat = require('gulp-concat')
const autoprefixer = require('gulp-autoprefixer')
const sync = require('browser-sync').create()

function libs() {
    return src('src/libs/**')
        .pipe(dest('dist/libs'))
}

function html() {
    return src('src/**.html')
        .pipe(include({
            prefix: '@@'
        }))
        .pipe(htmlmin({
            collapseWhitespace: false,
            removeComments: true
        }))
        .pipe(dest('dist'))
}

function scss_index() {
    return src('src/scss/style.scss')
        .pipe(sass())
        .pipe(autoprefixer({
            browsers: ['last 2 versions']
        }))
        .pipe(concat('index.css'))
        .pipe(dest('dist/css'))
}

function img() {
    return src('src/img/**')
        .pipe(dest('dist/img'))
}

function clear() {
    return del('dist')
}

function serve() {
    sync.init({
        server: './dist'
    })

    watch('src/**.html', series(html)).on('change', sync.reload)
    watch('src/parts/**.html', series(html)).on('change', sync.reload)
    watch('src/scss/**', series(scss_index)).on('change', sync.reload)
}

exports.build = series(
    clear,
    scss_index,
    html,
    img,
    libs)

exports.serve = series(
    clear,
    scss_index,
    html,
    img,
    libs,
    serve)

exports.clear = clear

exports.libs = libs
