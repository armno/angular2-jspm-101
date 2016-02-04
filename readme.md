# angular2-jspm-101

WIP: Learning to setup Angular2 project with jspm and TypeScript.

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
