/**
 * Inspired by: https://www.jianshu.com/p/5ab7b4b48964
 */

const { series, parallel, src, dest } = require('gulp');
const rename = require('gulp-rename');
const debug = require('gulp-debug');
const clean = require('gulp-clean');
const eslint = require('gulp-eslint');
const config = require('./.eslintrc.js');

// wxss 一键格式化
const wxssPrettier = () => {
  return src('./**/*.wxss')
    .pipe(
      // 可以利用插件，查看一些 debug 信息
      debug()
    )
    .pipe(
      // 重写扩展名为 css，才能被 ESLint 识别解析
      rename({
        extname: '.css',
      })
    )
    .pipe(
      // ESLint 格式化
      eslint(config)
    )
    .pipe(
      // 重新将扩展名改为 wxss
      rename({
        extname: '.wxss',
      })
    )
    .pipe(
      // 导出文件
      dest(__dirname)
    );
};

// acss 一键格式化
const acssPrettier = () => {
  return src('./**/*.acss')
    .pipe(debug())
    .pipe(
      rename({
        extname: '.css',
      })
    )
    .pipe(eslint(config))
    .pipe(
      rename({
        extname: '.acss',
      })
    )
    .pipe(dest(__dirname));
};

// wxml 一键格式化
const wxmlPrettier = () => {
  return src('./**/*.wxml')
    .pipe(debug())
    .pipe(
      rename({
        extname: '.html',
      })
    )
    .pipe(eslint(config))
    .pipe(
      rename({
        extname: '.wxml',
      })
    )
    .pipe(dest(__dirname));
};

// 这里导出多个 task，通过 gulp xxx 就能来调用了，如 gulp all
// 关于 series、parallel API 分别是按顺序执行（同步）、同时执行（并行）
module.exports = {
  all: parallel(wxssPrettier, wxmlPrettier, acssPrettier),
  wxss: wxssPrettier,
  wxml: wxmlPrettier,
  acss: acssPrettier,
};
