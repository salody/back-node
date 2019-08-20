import React from 'react';
import { connect } from 'dva';
import queryString from 'query-string';
import { ddPostMsg, formatDate } from '@/utils/toolFunc';
import API from '@/utils/api';
import request from '@/service/request';
import Editor from '@/components/Editor';
import Loading from '@/components/Loading';
import './index.less';

@connect(({ article }) => ({
  ...article
}))
class Article extends React.Component {
  // 这里的参数要注意，req是server端才有的
  static getInitialProps = async ({ store, route, isServer, req }) => {
    const e = {
      access_token: 'c960e8bfae33e4fd2e28524810690ce1',
      enterpriseId: '948467577997365248',
      userId:       '1789916475256082432',
      watermarks:   [],
      name:         'ss',
      avatar:       'https://static.dingtalk.com/media/lADOjM5cK80C7s0C6g_746_750.jpg',
      position:     '职位职位',
      jobnumber:    '00011',
      language:     'zh_TW'
    };

    if (isServer) {
      // req: { url: '/article?from=23&articleId=998' }

      const queryStr = (req.url || '').split('?')[1];
      if (queryStr) {
        const query = queryString.parse(queryStr);
        const { articleId } = query;
        await store.dispatch({
          type:    'user/saveUserInfo',
          payload: {
            userInfo: e
          }
        });
        API.initApi(e);
        await store.dispatch({
          type:    'article/getArticle',
          payload: {
            articleId: articleId || '1789887333194141696'
          }
        });
      }
    } else {
      const { from, articleId, planId, courseId } = queryString.parse(location.search);
      await store.dispatch({
        type:    'user/saveUserInfo',
        payload: {
          userInfo: e
        }
      });
      API.initApi(e);
      await store.dispatch({
        type:    'article/getArticle',
        payload: {
          articleId: articleId || '1789887333194141696'
        }
      });
    }
  };

  componentDidMount = () => {
    const { from, articleId, planId, courseId } = queryString.parse(location.search);
    if (from === 'study' || from === 'certi') {
      const url = API.saveProgress({
        studyId:    planId,
        courseId,
        resourceId: articleId
      });
      this.saveProgress(url);
    } else if (from === 'course') {
      const url = API.saveCourseProgress({
        courseId,
        resourceId: articleId
      });
      this.saveProgress(url);
    }
    // this.getArticleDetail(articleId || '1789887333194141696')
  };
  saveProgress = url => {
    const data = {
      progress: 100
    };
    request.post({ url, data });
  };
  getArticleDetail = articleId => {
    Loading.show();
    const url = API.getArticleDetail({ articleId });
    request.get({ url })
      .then(res => {
        Loading.hide();
        const { name, create_time, creator_name, content_json } = res.data;
        window.title = name;
        ddPostMsg({
          msg:   'setTitle',
          title: name
        });
        this.setState({
          title:       name,
          content:     content_json,
          create_time: formatDate(create_time, 'yyyy-MM-dd hh:mm'),
          creator_name
        });
        this.initInfo();
      });
  };
  initInfo = () => {
    const { from, planId, courseId } = queryString.parse(this.props.location.search);
    if (from === 'study') {
      ddPostMsg({
        msg: 'initStudyInfo',
        planId
      });
    } else if (from === 'course') {
      ddPostMsg({
        msg: 'initCourseDetails',
        courseId
      });
    }
  };

  render() {
    const { content, create_time, creator_name, title } = this.props;
    if (!content) return null;
    return (
      <div className="article-container">
        <div className="article-top">
          <h1 className="article-top-title">{title}</h1>
          <h3 className="article-top-sub">
            <span className="article-top-time">{create_time}</span>
            <span className="article-top-user">{creator_name}</span>
          </h3>
        </div>
        <Editor content={content}/>
      </div>
    );
  }
}

export default Article;
