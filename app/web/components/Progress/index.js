import React from 'react'
import PropTypes from 'prop-types'
import { withTranslation } from 'react-i18next'
import style from './index.module.less'

const Progress = props => {
  return (
    <div className={style['progress']}>
      <div className={style['progress__text']}>
        {props.t('progress.complete')}&nbsp;{props.progress}%
      </div>
      <div className={style['progress__bar']}>
        <div className={style['progress__bar__outer']}>
          <div className={style['progress__bar__inner']} style={{ width: `${props.progress}%` }} />
        </div>
      </div>
    </div>
  )
}

Progress.defaultProps = {
  progress: 0
}

Progress.propTypes = {
  progress: PropTypes.number.isRequired
}

export default withTranslation()(Progress)
