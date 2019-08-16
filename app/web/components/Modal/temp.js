import React, { Component } from 'react'
import Modal from 'react-modal'

import './modal.less'

Modal.setAppElement('body')

class ActionSheet extends Component {
  componentDidUpdate() {
    if (this.props.isOpen) {
      console.log('updaye')
      setTimeout(() => {
        const overlayEl = document.querySelector('.action-sheet-modal__overlay')
        const contentEl = document.querySelector('.action-sheet-modal')
        overlayEl.addEventListener('touchmove', this.forbidTouchMove)
        contentEl.addEventListener('touchstart', e => {
          this.firstY = e.targetTouches[0].clientY
          overlayEl.removeEventListener('touchmove', this.forbidTouchMove)
        })
        contentEl.addEventListener('touchmove', e => {
          let target = document.querySelector('.action-sheet-modal')
          let offsetHeight = target.offsetHeight,
            scrollHeight = target.scrollHeight
          let changedTouches = e.changedTouches
          let scrollTop = target.scrollTop
          if (changedTouches.length > 0) {
            let touch = changedTouches[0] || {}
            let moveY = touch.clientY
            if (moveY > this.firstY && scrollTop === 0) {
              // 滑动到弹窗顶部临界条件
              e.preventDefault()
              return false
            } else if (moveY < this.firstY && scrollTop + offsetHeight >= scrollHeight) {
              // 滑动到底部临界条件
              e.preventDefault()
              return false
            }
          }
        })

        contentEl.addEventListener('scroll', () => {
          overlayEl.addEventListener('touchmove', this.forbidTouchMove)
        })

        contentEl.addEventListener('touchend', () => {
          overlayEl.addEventListener('touchmove', this.forbidTouchMove)
        })
      }, 0)
    } else {
      const overlayEl = document.querySelector('.action-sheet-modal__overlay')
      if (overlayEl) {
        overlayEl.removeEventListener('touchmove', this.forbidTouchMove)
      }
    }
  }

  forbidTouchMove = e => {
    e.preventDefault()
  }

  render() {
    return (
      <Modal
        isOpen={this.props.isOpen}
        onRequestClose={this.props.onRequestClose}
        className="action-sheet-modal"
        overlayClassName="action-sheet-modal__overlay"
        shouldFocusAfterRender={false}
        closeTimeoutMS={100}>
        <p>saddd</p>
        <p>saddd</p>
        <p>saddd</p>
        <p>saddd</p>
        <p>saddd</p>
        <p>saddd</p>
        <p>saddd</p>
        <p>saddd</p>
        <p>saddd</p>
        <p>saddd</p>
        <p>saddd</p>
        <p>saddd</p>
        <p>saddd</p>
        <p>saddd</p>
        <p>saddd</p>
        <p>saddd</p>
        <p>saddd</p>
        <p>saddd</p>
        <p>saddd</p>
        <p>saddd</p>
        <p>saddd</p>
        <p>saddd</p>
      </Modal>
    )
  }
}

export default ActionSheet
