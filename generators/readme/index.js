'use strict';

const _ = require('lodash');
const Generator = require('yeoman-generator');

module.exports = class extends Generator {
	constructor() {
		super(...arguments);

		this.option('generateInto', {
			type: String,
			required: false,
			defaults: '',
			desc: 'Relocate the location of the generated files.'
		});

		this.option('name', {
			type: String,
			required: true,
			desc: 'Project name'
		});

		this.option('description', {
			type: String,
			required: true,
			desc: 'Project description'
		});

		this.option('githubUsername', {
			type: String,
			required: true,
			desc: 'User github account'
		});

		this.option('authorName', {
			type: String,
			required: true,
			desc: 'Author name'
		});

		this.option('authorUrl', {
			type: String,
			required: true,
			desc: 'Author url'
		});

		this.option('coveralls', {
			type: Boolean,
			required: true,
			desc: 'Include coveralls badge'
		});
	}

	writing() {
		const pkg = this.fs.readJSON(this.destinationPath(this.options.generateInto, 'package.json'), {});
		this.fs.copyTpl(
			this.templatePath('README.md'),
			this.destinationPath(this.options.generateInto, 'README.md'),
			{
				name: this.options.name,
				safeName: _.camelCase(this.options.name),
				description: this.options.description,
				githubUsername: this.options.githubUsername,
				author: {
					name: this.options.authorName,
					url: this.options.authorUrl
				},
				license: pkg.license,
				includeCoveralls: this.options.coveralls
			}
		);
	}
};
