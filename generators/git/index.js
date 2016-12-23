'use strict';
const Generator = require('yeoman-generator');
const originUrl = require('git-remote-origin-url');

module.exports = class extends Generator {
	constructor(args, opts) {
		super(args, opts);

		this.option('generateInto', {
			type: String,
			required: false,
			defaults: '',
			desc: 'Relocate the location of the generated files.'
		});

		this.option('name', {
			type: String,
			required: true,
			desc: 'Module name'
		});

		this.option('github-account', {
			type: String,
			required: true,
			desc: 'GitHub username or organization'
		});
	}

	initializing() {
		this.fs.copy(
			this.templatePath('gitattributes'),
			this.destinationPath(this.options.generateInto, '.gitattributes')
		);

		this.fs.copy(
			this.templatePath('gitignore'),
			this.destinationPath(this.options.generateInto, '.gitignore')
		);

		return originUrl(this.destinationPath(this.options.generateInto))
			.then(url => {
				this.originUrl = url;
			}, () => {
				this.originUrl = '';
			});
	}

	writing() {
		this.pkg = this.fs.readJSON(this.destinationPath(this.options.generateInto, 'package.json'), {});

		let repository = '';
		if (this.originUrl) {
			repository = this.originUrl;
		} else {
			repository = this.options.githubAccount + '/' + this.options.name;
		}

		this.pkg.repository = this.pkg.repository || repository;

		this.fs.writeJSON(this.destinationPath(this.options.generateInto, 'package.json'), this.pkg);
	}

	end() {
		this.spawnCommandSync('git', ['init'], {
			cwd: this.destinationPath(this.options.generateInto)
		});

		if (!this.originUrl) {
			const url = this.pkg.repository && (this.pkg.repository.url || this.pkg.repository);
			let repoSSH = url;
			if (url && url.indexOf('.git') === -1) {
				repoSSH = 'git@github.com:' + url+ '.git';
			}
			this.spawnCommandSync('git', ['remote', 'add', 'origin', repoSSH], {
				cwd: this.destinationPath(this.options.generateInto)
			});
		}
	}
};
