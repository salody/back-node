'use strict';

module.exports = appInfo => {
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1564724739297_8604';

  // add your middleware config here
  config.middleware = [];

  // locale
  config.i18n = {
    defaultLocale: 'zh-CN',
  };

  // // 配置启动端口
  // config.cluster = {
  //   listen: {
  //     port: 50001,
  //     hostname: '0.0.0.0',
  //   },
  // };

  // 设置模板引擎
  config.view = {
    defaultViewEngine: 'nunjucks',
    mapping: {
      '.njk': 'nunjucks',
      '.html': 'nunjucks',
    },
  };

  // 安全相关的配置
  config.security = {
    csrf: false,
  };

  // 静态资源配置
  config.assets = {
    publicPath: '/public/',
    devServer: {
      debug: true,
      command: 'npm run umi:dev',
      port: 8000,
      env: {
        APP_ROOT: process.cwd() + '/app/web',
        BROWSER: 'none',
        ESLINT: 'none',
        SOCKET_SERVER: 'http://127.0.0.1:8000',
        PUBLIC_PATH: 'http://127.0.0.1:8000',
      },
    },
  };

  return config;
};
