# Angular2 Message Service
[![Build Status](https://travis-ci.org/Ventrom/Ventrom/ng2-message-service.svg?branch=master)](https://travis-ci.org/Ventrom/Ventrom/ng2-message-service)
[![npm version](https://badge.fury.io/js/ng2-message-service.svg)](http://badge.fury.io/js/ng2-message-service)
[![devDependency Status](https://david-dm.org/Ventrom/Ventrom/ng2-message-service/dev-status.svg)](https://david-dm.org/Ventrom/Ventrom/ng2-message-service#info=devDependencies)
[![GitHub issues](https://img.shields.io/github/issues/Ventrom/Ventrom/ng2-message-service.svg)](https://github.com/Ventrom/Ventrom/ng2-message-service/issues)
[![GitHub stars](https://img.shields.io/github/stars/Ventrom/Ventrom/ng2-message-service.svg)](https://github.com/Ventrom/Ventrom/ng2-message-service/stargazers)
[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://raw.githubusercontent.com/Ventrom/Ventrom/ng2-message-service/master/LICENSE)

## Demo
https://Ventrom.github.io/Ventrom/ng2-message-service/demo/

## Table of contents

- [About](#about)
- [Installation](#installation)
- [Documentation](#documentation)
- [Development](#development)
- [License](#licence)

## About

A message service for angular2 projects

## Installation

Install through npm:
```
npm install --save ng2-message-service
```

Then use it in your app like so:

```typescript
import {Component} from '@angular/core';
import {HelloWorld} from 'ng2-message-service';

@Component({
  selector: 'demo-app',
  directives: [HelloWorld],
  template: '<hello-world></hello-world>'
})
export class DemoApp {}
```

You may also find it useful to view the [demo source](https://github.com/Ventrom/Ventrom/ng2-message-service/blob/master/demo/demo.ts).

### Usage without a module bundler
```
<script src="node_modules/dist/umd/ng2-message-service/ng2-message-service.js"></script>
<script>
    // everything is exported MessageService namespace
</script>
```

## Documentation
All documentation is auto-generated from the source via typedoc and can be viewed here:
https://Ventrom.github.io/Ventrom/ng2-message-service/docs/

## Development

### Prepare your environment
* Install [Node.js](http://nodejs.org/) and NPM (should come with)
* Install local dev dependencies: `npm install` while current directory is this repo

### Development server
Run `npm start` to start a development server on port 8000 with auto reload + tests.

### Testing
Run `npm test` to run tests once or `npm run test:watch` to continually run tests.

### Release
* Bump the version in package.json (once the module hits 1.0 this will become automatic)
```bash
npm run release
```

## License

MIT
