import React, { Component } from 'react';
import { connect } from 'dva';
import API from '@/utils/api'
import { formatMessage, getLocale, FormattedMessage } from 'umi-plugin-locale';

// 打印当前使用语言
console.log(getLocale());

@connect(({ practice }) => ({
  isContinue: practice.isContinue
}))
export default class UmiDemo extends Component {

  // 这个方法在服务端和客户端都会调用
  static getInitialProps = async ({ store, route, isServer }) => {
    // new dva ins
    const e = {
      access_token: '60230a490b0d5d961b9ce39419c56c5c',
      enterpriseId: '948467577997365248',
      userId:       '1789916475256082432',
      watermarks:   [],
      name:         'ss',
      avatar:       'https://static.dingtalk.com/media/lADOjM5cK80C7s0C6g_746_750.jpg',
      position:     '职位职位',
      jobnumber:    '00011',
      language:     'zh_TW'
    }
    store.dispatch({
      type:    'user/saveUserInfo',
      payload: {
        userInfo: e
      }
    })
    API.initApi(e)
    const url = API.getPracticeList()
    console.log(url)
  }

  changeType = () => {
    this.props.dispatch({
      type:    'practice/changePracticeType',
      payload: { isContinue: !this.props.isContinue }
    })
  }

  saveUserInfo = () => {
    this.props.dispatch({
      type:    'user/saveUserInfo',
      payload: {
        userInfo: {access_token: '2sahid', userId: '37893'}
      }
    })
  }


  render() {
    return (
      <div>
        <h1>{this.props.isContinue.toString()}</h1>
        {formatMessage({ id: 'study.overdue' })}
        <FormattedMessage id="placeholder" values={{ name: 'John' }} />
        <h2 onClick={this.changeType}>触发action</h2>
        <h2 onClick={this.saveUserInfo}>save user info</h2>
      </div>
    );
  }
}
