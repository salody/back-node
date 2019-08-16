import React from 'react'
import { withTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import SvgIcon from '@/components/Icon'
import style from './index.module.less'

class PracticeItem extends React.PureComponent {
  constructor(props) {
    super(props)
  }
  handleClick = e => {
    e.preventDefault()
    if (this.props.practice.total_question_count === 0) {
      return false
    }
    this.props.handleClick({
      id:    this.props.practice.id,
      title: this.props.practice.title,
      isNew: this.props.practice.show_new === 'true',
      type:  this.props.practice.last_practice_type
    })
  }
  handleCoverClick = () => {
    this.props.handleClick({
      id:    this.props.practice.id,
      title: this.props.practice.title,
      isNew: this.props.practice.show_new === 'true',
      type:  this.props.practice.last_practice_type
    })
  }
  render() {
    const { t } = this.props
    let { practice } = this.props
    return (
      <div className={`${style.practiceItem}`}>
        <div className={`${style.topDisplay}`} onClick={this.handleCoverClick}>
          <img className={`${style.coverImg}`} src={practice.cover} />
          <div className={`${style.topInfo}`}>
            <h3 className={`${style.title}`}>{practice.title}</h3>
            <div className={`${style.questionCount}`}>
              {t('practiceList.total')}
              <span>{practice.total_question_count}</span>
              {t('practiceList.items')}， {t('practiceList.hasComplete')}
              <span>{practice.complete_question_count}</span>
              {t('practiceList.items')}
            </div>
          </div>
        </div>
        <div className={`${style.bottomOperate}`}>
          <div
            className={`${style.operateOne} ${practice.total_question_count === 0 ? style.operateDisable : ''}`}
            onClick={e => this.handleClick(e)}>
            <span className={`${style.labelIcon}`}>
              <SvgIcon type="icone-intelligent-exercise" color="#50ABFF" size={36} />
            </span>
            <span className={`${style.operateLabel}`}>{t('practiceList.intePractice')}</span>
            {practice.show_new === 'true' ? (
              <span className={`${style.isNew}`}>{t('practiceList.newLabel')}</span>
            ) : null}
            <SvgIcon type="icone-arrow-right" color="#B7BAC8" size={13} />
          </div>
          <div className={`${style.operateOne} ${practice.total_question_count === 0 ? style.operateDisable : ''}`}>
            <Link
              to={{
                pathname: `/practice/${practice.id}`,
                search:   `?type=wrong&order=fixed`
              }}>
              <span className={`${style.labelIcon}`}>
                <SvgIcon type="icone-fault-eliminate" color="#44B975" size={36} />
              </span>
              <span className={`${style.operateLabel}`}>{t('practiceList.faultRemove')}</span>
              {practice.wrong_question_count > 0 ? (
                <span className={`${style.errorCount}`}>{practice.wrong_question_count}</span>
              ) : null}
              <SvgIcon type="icone-arrow-right" color="#B7BAC8" size={13} />
            </Link>
          </div>
        </div>
      </div>
    )
  }
}

export default withTranslation()(PracticeItem)
