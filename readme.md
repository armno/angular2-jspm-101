# angular2-jspm-101

Learning to setup Angular2 project with [jspm](http://jspm.io/) and TypeScript.

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

## random notes taken

- [SystemJS](https://github.com/systemjs/systemjs) is a dynamic module loader. supports ES6 modules, ADM, and CommonJS modules. works with transpilers.
- [jspm](http://jspm.io/) is a package manager built on top of SystemJS. helpful to bring in modules installed with jspm to use with SystemJS.
- [SystemJS TypeScript Loader](https://github.com/frankwallis/plugin-typescript) is a plugin for SystemJS which allows us to import `.ts` file without having to transpile them to `.js` first.
- i still don't know how SystemJS play with transpilers. i think it will load the standalone version of the transpiler and transpile the modules. yet it doesn't do anything with installtion or setting up those transpilers.
