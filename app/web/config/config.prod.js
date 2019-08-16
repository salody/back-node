'use strict';

module.exports = {
  hash: true,
  publicPath: '',
  manifest: {
    fileName: '../../config/manifest.json',
  },
  define: {
    'API.PLATFORM':           'https://dplatformapi.coolcollege.cn',
    'API.ENTERPRISE':         'https://denterpriseapi.coolcollege.cn',
    'API.HOST':               'https://disv.coolcollege.cn',
    'GLOBAL.ENTERPRISE_HOST': 'https://dev.coolcollege.cn/mobile'
  }
};