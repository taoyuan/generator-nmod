/* eslint-env mocha */

const path = require('path');
const helpers = require('yeoman-test');
const assert = require('yeoman-assert');

describe('nmod:app', () => {
	describe('defaults', () => {
		before(() => {
			return helpers.run(path.join(__dirname, '../app'))
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
	});

});
