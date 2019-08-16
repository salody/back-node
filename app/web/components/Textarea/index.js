import React, { Component } from 'react'
import PropTypes from 'prop-types'
import style from './index.module.less'
class Textarea extends Component {
  constructor(props) {
    super(props)
    this.state = {
      currentValue: this.props.defaultValue
    }
    this.inputRef = React.createRef()
  }
  handleInput = e => {
    e.preventDefault()
    let value = e.target.value
    if (this.props.maxLength && value.length > this.props.maxLength) {
      return false
    }
    this.setState({
      currentValue: value
    })
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
    if (navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)) {
      return
    }
    setTimeout(() => {
      this.inputRef && this.inputRef.current && this.inputRef.current.scrollIntoView()
    }, 200)
  }
  render() {
    return (
      <div className={`${style.textareaContainer} ${this.props.showInputCount ? style.hasInputCount : ''}`}>
        <div className={`${style.borderContainer}  ${this.props.className}`}>
          {this.props.autoHeight ? (
            <pre className={`${style.blankSpan}`}>
              {this.state.currentValue}
              <br />
            </pre>
          ) : null}
          <textarea
            value={this.state.currentValue}
            ref={this.inputRef}
            placeholder={this.props.placeholder}
            onInput={this.handleInput}
            onFocus={this.handleFocus}
            onChange={this.handleChange}
            tabIndex={-1 * Math.floor(Math.random() * 100)}
          />
        </div>
        <div
          className={`${style.inputCount} ${this.props.countAlign} ${this.props.showInputCount ? '' : style.hidden}`}>
          {this.state.currentValue.length}/{this.props.maxLength}
        </div>
      </div>
    )
  }
}

Textarea.defaultProps = {
  defaultValue:   '',
  maxLength:      0,
  autoHeight:     false,
  className:      '',
  placeholder:    '',
  countAlign:     'left',
  showInputCount: false,
  handleInput:    () => {},
  handleChange:   () => {}
}

Textarea.propTypes = {
  defaultValue:   PropTypes.string,
  maxLength:      PropTypes.number,
  autoHeight:     PropTypes.bool,
  className:      PropTypes.string,
  countAlign:     PropTypes.oneOf(['left', 'right']),
  showInputCount: PropTypes.bool,
  placeholder:    PropTypes.string,
  handleInput:    PropTypes.func,
  handleChange:   PropTypes.func
}

export default Textarea
