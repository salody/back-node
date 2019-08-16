import React from 'react'
import classNames from 'classnames'
import PropTypes from 'prop-types'
import Mixin from './Mixin'
import Picker from './Picker'
import './Popup.less'

class Popup extends React.Component {
  constructor(props) {
    super(props)
  }

  state = {
    selectedValue: this.props.selectedValue
  }

  // 取消按钮
  handleDismiss = () => {
    this.props.onDismiss()
  }

  handleOk = () => {
    this.props.onOk(this.state.selectedValue)
  }

  // 滑动触发事件
  handleValueChange = selectedValue => {
    this.setState({
      selectedValue
    })
  }

  render() {
    const { props } = this

    const { prefixCls, visible, title, okText, selectedValue, dismissText, ...rest } = props

    const popupCls = {
      [props.className]: !!props.className,
      [prefixCls]:       true,
      visible:           visible
    }

    return (
      <div className={classNames(popupCls)} style={{ zIndex: 20 }}>
        <div className={`${prefixCls}__mask`} onClick={this.handleDismiss} />
        <div className={`${prefixCls}__main`}>
          <div className={`${prefixCls}__main__header`}>
            <span className={`${prefixCls}__btn`} onClick={this.handleDismiss}>
              {dismissText}
            </span>
            <span>{title}</span>
            <span className={`${prefixCls}__btn`} onClick={this.handleOk}>
              {okText}
            </span>
          </div>
          <Picker selectedValue={selectedValue} onValueChange={this.handleValueChange} {...rest} />
        </div>
      </div>
    )
  }
}

Popup.defaultProps = {
  prefixCls:     'cl-picker-container',
  selectedValue: '',
  visible:       false,
  title:         '提示',
  okText:        '确定',
  dismissText:   '取消',
  onOk:          () => {},
  onDismiss:     () => {}
}

Popup.propTypes = {
  visible:       PropTypes.bool.isRequired,
  selectedValue: PropTypes.string.isRequired,
  title:         PropTypes.string.isRequired,
  okText:        PropTypes.string.isRequired,
  dismissText:   PropTypes.string.isRequired,
  onOk:          PropTypes.func.isRequired,
  onDismiss:     PropTypes.func.isRequired
}

export default Mixin(Popup)
