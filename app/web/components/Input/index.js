import React, { Component } from 'react'
import style from './index.module.less'

class Input extends Component {
  constructor(props) {
    super(props)
    this.inputRef = React.createRef()
  }
  handleInput = e => {
    e.preventDefault()
    if (this.props.handleInput) {
      this.props.handleInput(e)
    }
  }
  handleChange = e => {
    e.preventDefault()
    if (this.props.handleChange) {
      this.props.handleChange(e)
    }
  }
  handleFocus = () => {
    setTimeout(() => {
      this.inputRef.current.scrollIntoView()
    }, 200)
    if (this.props.handleFocus) {
      this.props.handleFocus()
    }
  }
  handleBlur = () => {
    if (this.props.handleBlur) {
      this.props.handleBlur()
    }
  }
  render() {
    return (
      <input
        ref={this.inputRef}
        placeholder={this.props.placeholder}
        defaultValue={this.props.defaultValue}
        onFocus={this.handleFocus}
        onInput={this.handleInput}
        onBlur={this.handleBlur}
        onChange={this.handleChange}
        type={this.props.type}
        className={this.props.className + ' ' + style.clInput}
      />
    )
  }
}

export default Input
