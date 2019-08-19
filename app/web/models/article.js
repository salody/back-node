import { getArticleDetail } from '@/service/article';
import { formatDate } from '@/utils/toolFunc'

export default {
  state: {
    title:        '',
    content:      '',
    create_time:  '',
    creator_name: ''
  },
  reducers: {
    saveArticle(state, { payload }) {
      state.title = payload.title
      state.content = payload.content
      state.create_time = payload.create_time
      state.creator_name = payload.creator_name
    }
  },
  effects: {
    * getArticle({ payload }, { put, call }) {
      try {
        const res = yield call(getArticleDetail, payload.articleId);
        const { name, create_time, creator_name, content_json } = res.data
        // todo: 这里做后端的请求的时候一定要注意把错误的可能表达清楚，这里在后端回传的有问题时，还是有问题的，可以寄希望于前端的render
        if (res) {
          yield put({
            type:    'saveArticle',
            payload: {
              title:       name,
              content:     content_json,
              create_time: formatDate(create_time, 'yyyy-MM-dd hh:mm'),
              creator_name
            }
          })
        }
      } catch (err) {
        // todo: 这里做后端的请求的时候一定要注意把错误的可能表达清楚
        yield put({
          type:    'saveArticle',
          payload: {
            title:        '',
            content:      '',
            create_time:  '',
            creator_name: ''
          }
        })
      }
    }
  }
};
