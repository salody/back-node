import React, { Component } from 'react'

import BaseModal from './BaseModal'

class Toast extends Component {
  state = {
    isOpen: false
  }

  showToast = () => {
    this.setState({ isOpen: true })
    setTimeout(() => {
      this.hideToast()
    }, this.props.duration)
  }

  hideToast = () => {
    this.setState({ isOpen: false })
  }

  renderContent = () => {
    return <div className="toast__content">{this.props.content}</div>
  }

  render() {
    return (
      <BaseModal
        isOpen={this.state.isOpen}
        className="toast-modal"
        overlayClassName="react-toast__overlay"
        onRequestClose={this.hideToast}
        renderContent={this.renderContent}
      />
    )
  }
}

Toast.defaultProps = {
  duration: 1000
}

export default Toast
