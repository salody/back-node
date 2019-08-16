import * as url from 'url';
import { parse } from 'qs';
import API from '@/utils/api'

const localeAlias = {
  'zh-cn': 'zh-CN',
  'zh-CN': 'zh-CN',
  'en-US': 'en-US',
  'en-us': 'en-US',
};



// global.document.addEventListener('DOMContentLoaded', function () {
//
// });




export const locale = {
  default: () => {
    // handle url /?locale=
    const { search = '' } = url.parse(window.location.href);
    const { locale: searchLocale = '' } = parse(search, { ignoreQueryPrefix: true });
    const queryLocale = localeAlias[searchLocale.toLowerCase()];
    const localLocale = typeof localStorage !== 'undefined' ? localStorage.getItem('umi_locale') : '';
    // zh-cn、zh_cn
    const umiLocale = localeAlias[(localLocale || '').toLowerCase()];
    return queryLocale || umiLocale || 'zh-CN';
  },
};

export const dva = {
  config: {
    onError(err) {
      err.preventDefault();
      console.error(err.message);
    },
  },
};


