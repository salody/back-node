import request from '@/service/request'
import API from '@/utils/api';

export const getArticleDetail = articleId => {
  const url = API.getArticleDetail({ articleId });
  return request.get({ url });
};
