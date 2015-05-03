'use strict';

var path = require('path');
var assert = require('yeoman-generator').assert;
var helpers = require('yeoman-generator').test;
var os = require('os');

describe('webpack-es6-cssnext:app', function () {
  before(function (done) {
    helpers.run(path.join(__dirname, '../app'))
      .withOptions({ skipInstall: true })
      .withPrompts({
        projectName: 'my-project',
        projectDescription: 'my project description',
        authorName: 'Ahto Simakuutio <ahto@example.com>',
        license: 'Apache 2.0'
      })
      .on('end', done);
  });

  it('creates files', function () {
    assert.file([
      'package.json',
      '.editorconfig',
      '.jshintrc',
      '.jscsrc',
      '.gitignore',
      'index.html',
      'webpack.config.js',
      'src/js/app.js',
      'src/css/main.css'
    ]);
  });

  it('templates metadata in package.json', function () {
    assert.fileContent([
      ['package.json', /"name": "my-project",/],
      ['package.json', /"description": "my project description",/],
      ['package.json', /"author": "Ahto Simakuutio <ahto@example.com>",/],
      ['package.json', /"license": "Apache 2.0",/]
    ]);
  })
});
