# <%= name %>

[![NPM version](http://img.shields.io/npm/v/<%= name %>.svg?style=flat-square)](https://www.npmjs.com/package/<%= name %>)
[![NPM downloads](http://img.shields.io/npm/dm/<%= name %>.svg?style=flat-square)](https://www.npmjs.com/package/<%= name %>)
[![Build Status](http://img.shields.io/travis/<%= githubAccount %>/<%= name %>/master.svg?style=flat-square)](https://travis-ci.org/<%= githubAccount %>/<%= name %>)
<% if (includeCoveralls) { %>[![Coverage Status](https://img.shields.io/coveralls/<%= githubAccount %>/<%= name %>.svg?style=flat-square)](https://coveralls.io/<%= githubAccount %>/<%= name %>)<% } %>

> <%= description %>

### How to Install

```sh
$ npm install --save <%= name %>
```

### Getting Started

...

### How to Test

Run one, or a combination of the following commands to lint and test your code:

```sh
$ npm run lint          # Lint the source code with ESLint
$ npm test              # Lint and Run unit tests with Mocha
```

### License

<%= license %> © [<%= author.name %>](<%= author.url %>)
