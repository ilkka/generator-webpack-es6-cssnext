'use strict';
var generators = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');

module.exports = generators.Base.extend({
  constructor: function () {
    generators.Base.apply(this, arguments);
  },

  prompting: function () {
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
      name    : 'authorEmail',
      message : 'Author email'
    },
    {
      type    : 'input',
      name    : 'license',
      message : 'License'
    }];

    return this.prompt(prompts)
    .then(function (answers) {
      this.props = answers;
    }.bind(this));
  },

  writing: function () {
    var projectFiles = [
      {src: '_package.json', dst: 'package.json'},
      {src: 'webpack.config.js', dst: 'webpack.config.js'},
      {src: 'index.html', dst: 'index.html'},
      {src: 'src/css/main.css', dst: 'src/css/main.css'},
      {src: 'src/js/app.js', dst: 'src/js/app.js'}
    ];
    var dotfiles = ['editorconfig', 'jshintrc', 'jscsrc', 'gitignore'];

    projectFiles.forEach(function (f) {
      this.fs.copyTpl(this.templatePath(f.src), this.destinationPath(f.dst), this.props);
    }.bind(this));

    dotfiles.forEach(function (dotfile) {
      this.fs.copy(this.templatePath(dotfile), this.destinationPath('.' + dotfile));
    }.bind(this));
  },

  install: function () {
    this.installDependencies();
  },

  end: function () {
  }
});
