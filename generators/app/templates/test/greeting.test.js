/**
 * <%= name %>
 *
 * Copyright © 2016 <%= authorName %>. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

const {assert} = require('chai');
const Greeting = require('../src/greeting');

describe('Greeting', () => {
	describe('greeting.hello()', () => {
		it('should return welcome message for a guest user', () => {
			const greeting = new Greeting();
			const message = greeting.hello();
			assert.equal(message, 'Welcome, Guest!');
		});

		it('should return welcome message for a named user', () => {
			const greeting = new Greeting('John');
			const message = greeting.hello();
			assert.equal(message, 'Welcome, John!');
		});
	});
});
