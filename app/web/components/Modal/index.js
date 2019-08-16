import React from 'react'
import ReactDOM from 'react-dom'

import actionSheet from './ActionSheet'
import Alert from './Alert'
import Toast from './Toast'

export const ActionSheet = actionSheet

function createAlert() {
  const div = document.createElement('div')
  div.className = 'alert_placeholder'
  document.body.appendChild(div)
  const ref = React.createRef()
  return {
    showAlert({ title, content, buttonText, clickHandler }) {
      ReactDOM.render(
        <Alert ref={ref} title={title} content={content} buttonText={buttonText} clickHandler={clickHandler} />,
        div
      )
      return ref.current.showAlert()
    }
  }
}

function createToast() {
  const div = document.createElement('div')
  div.className = 'toast_placeholder'
  document.body.appendChild(div)
  const ref = React.createRef()
  return {
    showToast({ content, duration }) {
      ReactDOM.render(<Toast ref={ref} content={content} duration={duration} />, div)
      return ref.current.showToast()
    }
  }
}

const alert = createAlert()
const toast = createToast()

export default {
  alert: ({ title, content, buttonText, clickHandler }) =>
    alert.showAlert({ title, content, buttonText, clickHandler }),
  toast: ({ content, duration }) => toast.showToast({ content, duration })
}
