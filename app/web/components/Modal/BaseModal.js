import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import Modal from 'react-modal'

import './modal.less'

Modal.setAppElement('body')

class BaseModal extends Component {
  componentDidMount() {
    window.addEventListener('popstate', () => {
      // 监听到返回事件，注意，只有触发了返回才会执行这个方法
      this.props.onRequestClose()
    })
  }

  getSnapshotBeforeUpdate(prevProps) {
    // 只有在关闭modal的时候，触发返回
    if (prevProps.isOpen && !this.props.isOpen) {
      if (window.history.state && window.history.state.IS_MODAL_OPEN) {
        window.history.back()
      }
    }

    // 在打开modal时候，触发
    if (!prevProps.isOpen && this.props.isOpen) {
      window.history.pushState({ IS_MODAL_OPEN: true }, '')
    }

    return null
  }

  componentDidUpdate() {
    const classname = 'react-modal__overlay'
    if (this.props.isOpen) {
      setTimeout(() => {
        const overlayEl = document.querySelector(`.${classname}`)
        overlayEl.addEventListener('touchmove', this.forbidTouchMove)
      }, 0)
    } else {
      const overlayEl = document.querySelector(`.${classname}`)
      if (overlayEl) {
        overlayEl.removeEventListener('touchmove', this.forbidTouchMove)
      }
    }
  }

  forbidTouchMove = e => {
    // if(this.props.ignoreClass) {
    //   const ignoreElement = document.querySelector(`.${this.props.ignoreClass}`)
    //   if(!ignoreElement || (ignoreElement && e.srcElement.contains(ignoreElement)) || e.srcElement == ignoreElement) {
    //       e.preventDefault()
    //   }
    // }else {
    e.preventDefault()
    // }
  }

  render() {
    const overlayClassNames = classnames('react-modal__overlay', ...this.props.overlayClassName)
    return (
      <Modal
        isOpen={this.props.isOpen}
        onRequestClose={this.props.onRequestClose}
        className={this.props.className}
        overlayClassName={overlayClassNames}
        shouldFocusAfterRender={false}
        closeTimeoutMS={100}>
        {this.props.renderContent()}
      </Modal>
    )
  }
}

BaseModal.defaultProps = {
  onRequestClose:   () => {},
  ignoreClass:      '',
  overlayClassName: []
}

BaseModal.propTypes = {
  onRequestClose:   PropTypes.func,
  ignoreClass:      PropTypes.string,
  overlayClassName: PropTypes.array
}

export default BaseModal
