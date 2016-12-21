/* eslint-env mocha */

const path = require('path');
const helpers = require('yeoman-test');
const assert = require('yeoman-assert');

describe('nmod:app', () => {
	describe('defaults', () => {
		before(() => {
			return helpers.run(path.join(__dirname, '../generators/app'))
				.withPrompts({
					name: 'nmod-temp',
					description: 'A node module',
					homepage: 'http://yeoman.io',
					githubUsername: 'yeoman',
					authorName: 'The Yeoman Team',
					authorEmail: 'hi@yeoman.io',
					authorUrl: 'http://yeoman.io',
					keywords: [],
					license: 'MIT'
				})
				.toPromise();
		});

		it('created and CD into a folder named like the nmod', () => {
			assert.equal(path.basename(process.cwd()), 'nmod-temp');
		});

		it('creates files', () => {
			const expected = [
				'README.md',
				'package.json',
				'src/index.js',
				'src/greeting.js',
				'test/greeting.test.js'
			];

			assert.file(expected);
		});

		it('fills package.json with correct information', () => {
			assert.JSONFileContent('package.json', {
				name: 'nmod-temp'
			});
		});

		it('fills the README with project data', () => {
			assert.fileContent('README.md', '# nmod-temp');
			assert.fileContent('README.md', 'npm install --save nmod-temp');
			assert.fileContent('README.md', 'MIT');
		});

		it('default include coverall', () => {
			assert.fileContent('README.md', 'Coverage Status');
			assert.fileContent('package.json', '"coveralls"');
			assert.fileContent('package.json', '"coverage"');
			assert.fileContent('.travis.yml', 'npm run coverage');
		});
	});

});
