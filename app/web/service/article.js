import axios from 'axios'
import request from '@/service/request'
import API from '@/utils/api';


export const getArticleDetail = articleId => {
  const url = API.getArticleDetail({ articleId });
  if (__IS_BROWSER) {
    return request.get({ url });
  } else {
    const http = require('http')
    const https = require('https')
    return axios.get(url, {
      timeout:    5000,
      httpAgent:  new http.Agent({ keepAlive: true }),
      httpsAgent: new https.Agent({ keepAlive: true }),
    })
  }
};
