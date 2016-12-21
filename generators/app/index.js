const glob = require('glob');
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const path = require('path');
const mkdirp = require('mkdirp');
const camelcase = require('camelcase');
const gitConfig = require('git-config');

module.exports = class extends Generator {
	constructor(args, opts) {
		super(args, opts);
		this.props = {};
		this.gitc = gitConfig.sync();
		this.gitc.user = this.gitc.user || {};
	}

	prompting() {
		// Have Yeoman greet the user.
		this.log(`Welcome to the ${chalk.green('nmod')} generator!`);

		const prompts = [{
			type: 'input',
			name: 'name',
			message: 'What is the name of your library (your github repo should have the same name)?',
			default: path.basename(process.cwd()),
			validate: v => v !== null && v !== undefined && v !== '',
		}, {
			type: 'input',
			name: 'description',
			message: 'Write a short description for your library.',
		}, {
			type: 'input',
			name: 'githubUsername',
			message: 'What is your github username (or organisation)?',
			default: (this.gitc.github) ? (this.gitc.github.user) : null
		}, {
			type: 'input',
			name: 'authorName',
			message: 'Who\'s the author of the library?',
			default: answers => this.gitc.user.name || answers.githubUsername,
		}, {
			type: 'input',
			name: 'authorEmail',
			message: 'What\'s the author\'s email adress?',
			default: this.gitc.user.email,
		}, {
			type: 'input',
			name: 'authorWebsite',
			message: 'What\'s the website of the author?'
		}, {
			name: 'includeCoveralls',
			type: 'confirm',
			message: 'Send coverage reports to coveralls',
			when: this.options.coveralls === undefined
		}];

		return this.prompt(prompts).then(answers => {
			Object.assign(this.props, answers, {
				githubSlug: answers.githubUsername && `${answers.githubUsername}/${answers.name}`,
				camelCaseName: camelcase(answers.name),
			});
		});
	}

	default() {
		if (path.basename(this.destinationPath()) !== this.props.name) {
			this.log(`Your generator must be inside a folder named ${this.props.name}\n
        I'll automatically create this folder.`);
			mkdirp(this.props.name);
			this.destinationRoot(this.destinationPath(this.props.name));
		}

		this.composeWith(require.resolve('generator-license'), {
			name: this.props.authorName,
			email: this.props.authorEmail,
			website: this.props.authorWebsite,
		});

		if (!this.fs.exists(this.destinationPath('README.md'))) {
			this.composeWith(require.resolve('../readme'), {
				name: this.props.name,
				description: this.props.description,
				githubUsername: this.props.githubUsername,
				authorName: this.props.authorName,
				authorUrl: this.props.authorUrl,
				coveralls: this.props.includeCoveralls
			});
		}
	}

	writing() {
		const done = this.async();
		glob('**/*.*', {cwd: this.sourceRoot(), dot: true}, (err, files) => {
			if (err) {
				this.log('Error:', err.message);
				return done();
			}
			files.forEach(file => {
				let dest = file;

				if (file === '_package.json') {
					dest = 'package.json';
				} else if (file[0] === '_') {
					dest = `.${file.substring(1)}`;
				}

				const opts = Object.assign({license: ''}, this.props);

				this.fs.copyTpl(
					this.templatePath(file),
					this.destinationPath(dest),
					opts
				);
			});
			done();
		});
	}

	install() {
		this.log(`All done. Running npm install for ${chalk.green.bold(this.props.name)}`);
		this.installDependencies({bower: false});
	}
};
