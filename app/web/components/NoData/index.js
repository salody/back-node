import React from 'react'
import style from './index.module.less'
import NoDataImg from '@/assets/img/no-data.png'

function NoData() {
  return (
    <div className={`${style.noData}`}>
      <img src={NoDataImg} />
      <p className={`${style.noDataTip}`}>暂无内容</p>
    </div>
  )
}

export default NoData
