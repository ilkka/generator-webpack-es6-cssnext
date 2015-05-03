'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');

module.exports = yeoman.generators.Base.extend({
  initializing: function () {
    this.pkg = require('../package.json');
  },

  prompting: function () {
    var done = this.async();

    // Have Yeoman greet the user.
    this.log(yosay(
      'Welcome to the ' + chalk.red('webpack-ws6-cssnext') + ' generator!'
    ));

    var prompts = [{
      type    : 'input',
      name    : 'projectName',
      message : 'Project name',
      default : this.appname // Default to current folder name
    },
    {
      type    : 'input',
      name    : 'projectDescription',
      message : 'Project description'
    },
    {
      type    : 'input',
      name    : 'authorName',
      message : 'Author name'
    },
    {
      type    : 'input',
      name    : 'license',
      message : 'License'
    }];

    this.prompt(prompts, function (props) {
      this.props = props;
      done();
    }.bind(this));
  },

  writing: {
    app: function () {
      [
        {src: '_package.json', dst: 'package.json'},
        {src: 'webpack.config.js', dst: 'webpack.config.js'},
        {src: 'index.html', dst: 'index.html'}
      ].forEach(function (f) {
        this.fs.copyTpl(this.templatePath(f.src), this.destinationPath(f.dst), this.props);
      }.bind(this));
    },

    projectfiles: function () {
      var dotfiles = ['editorconfig', 'jshintrc', 'jscsrc', 'gitignore'];
      dotfiles.forEach(function (dotfile) {
        this.fs.copy(this.templatePath(dotfile), this.destinationPath('.' + dotfile));
      }.bind(this));
    }
  },

  install: function () {
    this.installDependencies();
  }
});
