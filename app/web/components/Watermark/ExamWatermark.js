
import React , { Component } from 'react'
import { connect } from 'react-redux'

import style from './index.module.less'

const mapStateToProps = ({ userInfo }) => {
  return {
      watermarks: userInfo.watermarks,
      name:       userInfo.name,
      position:   userInfo.position,
      jobnumber:  userInfo.jobnumber,
  }
}


class ExamWatermark extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    const { watermarks, name, position, jobnumber} = this.props
    let examWatermarks = []
    watermarks.forEach(element => {
        if (element.type === 'exam') {
            examWatermarks = element.param.comment
        }
    })
    if( examWatermarks.length ) {
        return (
            <div className={`${style.watermarkContainer}`}>
            {new Array(200).fill(1).map((item, index) => {
              return (
                <div className={`${style.watermarkItem}`} key={index}>
                  <div className={`${style.content}`}>
                    {examWatermarks.indexOf('name') > -1 ? name : ''}
                    {examWatermarks.indexOf('position') > -1 ? position : ''}
                    {examWatermarks.indexOf('jobnumber') > -1 ? jobnumber : ''}
                  </div>
                </div>
              )
            })}
          </div>
        )
    } else {
        return null
    }
  }

}

export default connect(mapStateToProps)(ExamWatermark)