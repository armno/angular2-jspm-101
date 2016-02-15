# angular2-jspm-101

Learning to setup Angular2 project with [jspm](http://jspm.io/) and TypeScript, and testing with Karma.

### 1. Install `jspm` both globally and locally

```sh
$ npm install -g jspm
$ npm install --save-dev jspm
```

### 2. Init `jspm` with `typescript` as the transpiler option

```sh
$ jspm init
```

### 3. Install Angular2 and friends

```sh
$ jspm install angular2 reflect-metadata
```

### 4. Install SystemJS TypeScript Loader

```sh
$ jspm install ts
```

then update `config.js` file with [Usage instruction](https://github.com/frankwallis/plugin-typescript#usage).

### 5. Create `index.html`

```html
...
	<my-app>Loading...</my-app>

	<script src="jspm_packages/system.js"></script>
	<script src="config.js"></script>
	<script>
		System.import('app/main');
	</script>
...
```

- `<my-app></my-app>` - App's root component
- `system.js` - path to `systemjs` inside of `jspm_packages` directory
- `config.js` - path to generated config file from `$ jspm init` command
- `System.import()` - importing root component, and have fun.

### 6. import reflect-metadata in root component

```js
// app/main.ts
import 'reflect-metadata';
...
```

## Setting Unit Tests

i'll use karma and jasmine.

### 1. install dependencies

```sh
$ npm install --save-dev karma jasmine-core karma-jasmine karma-cli karma-chrome-launcher karma-jspm
```

### 2. init karma

```sh
$ karma init
```

karma creates `karma.conf.js` file. then we'll need to manually update the configurations to make it work with jspm.

```js
// karma.conf.js
module.exports = function(config) {
	...

	frameworks: ['jspm', 'jasmine'],

	jspm: {
		loadFiles: ['app/**/*.spec.ts'],      // spec files
		serveFiles: ['app/**/*!(*.spec).ts']  // source files
	},

	plugins: [
		'karma-jasmine',
		'karma-jspm',
		'karma-chrome-launcher'
	],

	...
}
```

the rest can be default configurations.

### 3. update `config.js` jspm config file

karma does some weird thing with appending `/base` path into the url or rresources.
i found myself need to update `config.js` to make systemjs plays well with karma: use `base` for `baseURL` if systemjs is used by karma.

another issue i found is that karma does not load TypeScript configurations from `tsconfig.json` file. so I have to move all configs for TypeScript to `typescriptOptions` in config.js file instead.

```js
// config.js
System.config({
  baseURL: (typeof __karma__ !== "undefined") ? "base" : "/",
  ...
	typescriptOptions: {
		"tsconfig": false,
		"module": "system",
		"emitDecoratorMetadata": true,
		"experimentalDecorators": true,
		"sourceMap": true,
		"target": "es5"
	}
	...
});
```

### 4. "hello world" test

create `app/main.spec.ts` with a dummy test

```js
// app.main.spec.ts
describe('Main test', () => {
	it('should be true', () => {
		expect(true).toEqual(true);
	});
});
```

and run the test with `$ karma start`.

## random notes taken

- [SystemJS](https://github.com/systemjs/systemjs) is a dynamic module loader. supports ES6 modules, ADM, and CommonJS modules. works with transpilers.
- [jspm](http://jspm.io/) is a package manager built on top of SystemJS. Helpful to bring in modules installed with jspm to use with SystemJS.
- [SystemJS TypeScript Loader](https://github.com/frankwallis/plugin-typescript) is a plugin for SystemJS which allows us to import `.ts` file without having to transpile them to `.js` first.
- I still don't know how SystemJS play with transpilers. I think it will load the standalone version of the transpiler and transpile the modules. yet it doesn't do anything with installtion or setting up those transpilers.
- In `config.js`, `"transpiler"` is set to `false` so SystemJS will not try to find `typescript.js` in root path: the plugin will take care of it.
- sometimes weird problems can be solved by upgrading installed dependencies' version.
- `angular2/testing` exports jasmine's globals like `describe`, `it`, `expect`. These functions can be used without importing from `angular2/testing` though. But if you want to use from angular2, make sure you import `reflect-metadata` into te tests too.
