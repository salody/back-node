import React, { Component } from 'react'

import BaseModal from './BaseModal'

class Alert extends Component {
  state = {
    isOpen: false
  }

  showAlert = () => {
    this.setState({ isOpen: true })
  }

  hideAlert = () => {
    this.setState({ isOpen: false })
    if (this.props.clickHandler) {
      this.props.clickHandler()
    }
  }

  renderContent = () => {
    return (
      <div>
        <h2>{this.props.title}</h2>
        <div className="cl-text-center" style={{ padding: '3vw 2vw' }}>
          {this.props.content}
        </div>
        <div className="confirm-btn" onClick={this.hideAlert}>
          {this.props.buttonText}
        </div>
      </div>
    )
  }

  render() {
    return (
      <BaseModal
        isOpen={this.state.isOpen}
        onRequestClose={this.hideAlert}
        className="alert-modal"
        renderContent={this.renderContent}
      />
    )
  }
}

Alert.defaultProps = {
  buttonText: '取消'
}

export default Alert
