// 本地的配置文件
module.exports = {
  proxy: {
    '/restapi': {
      target:       'http://127.0.0.1:7001/',
      changeOrigin: true,
    },
  },
};
