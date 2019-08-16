import React, { Component } from 'react'
import PropTypes from 'prop-types'
import SvgIcon from '@/components/Icon'
import style from './examRadio.module.less'

class Radio extends Component {
  constructor(props) {
    super(props)
    this.state = {
      currentValue: this.props.initValue
    }
  }
  handleCheck = (e, index) => {
    if (this.props.showResult) {
      return
    }
    e.preventDefault()
    let currentValue = [...this.state.currentValue]
    let operateId = this.props.options[index].id
    let hasChecked = currentValue.indexOf(operateId)
    if (this.props.multiple) {
      hasChecked !== -1 ? currentValue.splice(hasChecked, 1) : currentValue.push(operateId)
    } else {
      if (hasChecked === -1) {
        currentValue = [operateId]
      } else if (this.props.singleCanCancelCheck) {
        currentValue = []
      }
    }
    this.setState({
      currentValue
    })
    if (this.props.handleCheck) {
      this.props.handleCheck(currentValue)
    }
  }
  renderOptionOrder = option => {
    if (!this.props.showResult) {
      return (
        <div className={`${style.radioOrder} ${this.props.multiple ? style.multipleRadio : ''}`}>
          {option.option_order}
        </div>
      )
    }
    if (this.props.correctAnswer.indexOf(option.id) !== -1) {
      if (this.state.currentValue.indexOf(option.id) === -1 && this.props.multiple) {
        return (
          <div
            className={`${style.radioOrder} ${this.props.multiple ? style.multipleRadio : ''} ${style.correctNoCheck}`}>
            {option.option_order}
          </div>
        )
      }
      return (
        <div className={`${style.radioOrder} ${this.props.multiple ? style.multipleRadio : ''}`}>
          <SvgIcon type="icone-ok" color="#fff" size={22} />
        </div>
      )
    } else if (this.state.currentValue.indexOf(option.id) !== -1) {
      return (
        <div className={`${style.radioOrder} ${this.props.multiple ? style.multipleRadio : ''}`}>
          <SvgIcon type="icone-close" color="#fff" size={22} />
        </div>
      )
    } else {
      return (
        <div className={`${style.radioOrder} ${this.props.multiple ? style.multipleRadio : ''}`}>
          {option.option_order}
        </div>
      )
    }
  }
  render() {
    return (
      <div className={`${style.radioContainer} ${style.examRadio} ${this.props.showResult ? style.showResult : ''}`}>
        {this.props.options.map((option, index) => {
          return (
            <div
              className={`${style.radioOne} ${
                this.state.currentValue.indexOf(option.id) !== -1 ? style.radioActive : ''
              } ${this.props.correctAnswer.indexOf(option.id) !== -1 ? style.correctOption : ''}`}
              key={index}
              onClick={e => this.handleCheck(e, index)}>
              {this.renderOptionOrder(option)}
              <div className={`${style.radioLabel}`}>{option.title}</div>
            </div>
          )
        })}
      </div>
    )
  }
}

Radio.defaultProps = {
  initValue: [],
  options:   [
    {
      id:           1,
      option_order: 'A',
      title:        '选项一'
    }
  ],
  correctAnswer:        [],
  multiple:             false,
  singleCanCancelCheck: false,
  showResult:           false,
  handleCheck:          () => {}
}

Radio.propTypes = {
  initValue:            PropTypes.array,
  options:              PropTypes.array,
  multiple:             PropTypes.bool,
  singleCanCancelCheck: PropTypes.bool,
  showResult:           PropTypes.bool,
  correctAnswer:        PropTypes.array,
  handleCheck:          PropTypes.func
}

export default Radio
