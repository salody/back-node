import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withTranslation } from 'react-i18next'
import BaseModal from './BaseModal'

class ActionSheet extends Component {
  renderContent = () => {
    const { t } = this.props
    return (
      <div>
        {this.props.children}
        <div className="action-sheet-button" onClick={this.props.onRequestClose}>
          {t('modal.cancel')}
        </div>
      </div>
    )
  }

  render() {
    return (
      <BaseModal
        isOpen={this.props.isOpen}
        onRequestClose={this.props.onRequestClose}
        className="action-sheet-modal"
        renderContent={this.renderContent}
      />
    )
  }
}

ActionSheet.propTypes = {
  onRequestClose: PropTypes.func.isRequired,
  isOpen:         PropTypes.bool.isRequired
}

export default withTranslation()(ActionSheet)
