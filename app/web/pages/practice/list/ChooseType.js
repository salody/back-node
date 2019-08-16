import React from 'react'
import { withTranslation } from 'react-i18next'
import Modal from '@/components/Modal/BaseModal'
import './ChooseType.less'

class ChooseType extends React.Component {
  constructor(props) {
    super(props)
  }
  renderContent = () => {
    const { t } = this.props
    return (
      <div className="choose-practice-type-list">
        <div className="choose-practice-type-item" onClick={this.props.onContinue}>{t('practice.continuePractice')}</div>
        <div className="choose-practice-type-item" onClick={this.props.onBeginNew}>{t('practice.beginNewPractice')}</div>
      </div>
    )
  }
  render() {
    return (
      <Modal
        isOpen={this.props.visible}
        className='choose-practice-type'
        renderContent={this.renderContent}
        onRequestClose={() => this.props.onCancel()}
      />
    )
  }
}

export default withTranslation()(ChooseType)
