import React, { Component } from 'react';
import { formatMessage, FormattedMessage } from 'umi-plugin-locale';
import { connect } from 'dva'
// 打印当前使用语言

@connect(({ practice }) => ({
  isContinue: practice.isContinue
}))
export default class List extends Component {
  render() {
    return (
      <div>
        {formatMessage({ id: 'study.overdue' })}
        {formatMessage({ id: 'placeholder', value: { name: 'john' } })}
        <FormattedMessage id="placeholder" values={{ name: 'John' }} />
        <div>触发action</div>
      </div>
    );
  }
}
