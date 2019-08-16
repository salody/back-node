'use strict';

const join = require('path').join;
const winPath = require('umi-utils');

const isGithubPage = process.env.GITHUB_PAGE === 'true';

const config = {
  hash: true,
  outputPath: './site',
  publicPath: isGithubPage ? '/umi-example-ssr-with-egg/' : '',
  base: isGithubPage ? '/umi-example-ssr-with-egg/' : '/',
  plugins: [
    [
      'umi-plugin-react',
      {
        hd: true,
        locale: {
          baseNavigator: false,
        },
        antd: true,
        dva: {
          immer: true,
        },
        headScripts: [
          {
            content: 'window.USE_PRERENDER = true;',
          },
        ],
        // TODO, page router css leak
        dynamicImport: false,
        // dynamicImport: {
        //   webpackChunkName: true,
        // },
      },
    ],
    [ 'umi-plugin-gh-pages', {
      dir: join(winPath(__dirname), '..', 'site'),
      user: {
        name: 'github-actions-bot',
        email: 'support+actions@github.com',
      },
    }],
    [ '@umijs/plugin-prerender', {
      runInMockContext: {
        // your server address, for prerender get data
        url: 'http://localhost:7001',
      },
    }],
  ],
};

module.exports = config;
