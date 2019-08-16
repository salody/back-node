# eapp-proxy

url proxy for course

## QuickStart

<!-- add docs here for user -->

see [egg docs][egg] for more detail.

### Development

```bash
$ npm i
$ npm run dev
$ open http://localhost:7001/
```

### Deploy

```bash
$ npm start
$ npm stop
```

### npm scripts

- Use `npm run lint` to check code style.
- Use `npm test` to run unit test.
- Use `npm run autod` to auto detect dependencies upgrade, see [autod](https://www.npmjs.com/package/autod) for more detail.


[egg]: https://eggjs.org

### dva models resolve
* src/models/**/*.js 为 global model
* src/pages/**/models/**/*.js 为 page model
* global model 全量载入，page model 在 production 时按需载入，在 development 时全量载入
* page model 为 page js 所在路径下 models/**/*.js 的文件
* page model 要向上查找，比如 page js 为 pages/a/b.js，他的 page model 为 pages/a/b/models/**/*.js + pages/a/models/**/*.js，依次类推
* 约定 model.js 为单文件 model，解决只有一个 model 时不需要建 models 目录的问题，有 model.js 则不去找 models/**/*.js
* maybe: 支持合并 model 和 component 的请求，避免文件过于细碎
