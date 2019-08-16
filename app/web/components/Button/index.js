import React from 'react'
import PropTypes from 'prop-types'
import style from './index.module.less'

class Button extends React.PureComponent {
  render() {
    return (
      <button
        onClick={this.props.onClick}
        className={`${style.clButton} ${style[this.props.type]} ${style[this.props.size]} ${this.props.className}`}>
        {this.props.children}
      </button>
    )
  }
}

Button.defaultProps = {
  type:    'primary',
  size:    'medium',
  onClick: () => {}
}

Button.propTypes = {
  type:    PropTypes.oneOf(['primary', 'ghost', 'danger']),
  size:    PropTypes.oneOf(['small', 'medium', 'large']),
  onClick: PropTypes.func
}
export default Button
