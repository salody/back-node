import React from 'react'
import PropTypes from 'prop-types'

class SvgIcon extends React.Component {
  render() {
    let fontSize = '4.267vw'
    switch (this.props.size) {
      case 22:
        fontSize = '2.8vw'
        break
      case 23:
        fontSize = '3vw'
        break
      case 24:
        fontSize = '3.2vw'
        break
      case 28:
        fontSize = '3.733vw'
        break
      case 32:
        fontSize = '4.267vw'
        break
      case 36:
        fontSize = '5.067vw'
        break
      default:
        fontSize = this.props.size || '4.267vw'
        break
    }
    const style = {
      color:     this.props.color,
      fontSize:  fontSize,
      transform: `rotateZ(${this.props.rotateZ})`
    }
    return (
      <span style={style} onClick={this.props.onClick}>
        <svg className="icon" aria-hidden="true">
          <use xlinkHref={`#${this.props.type}`} />
        </svg>
      </span>
    )
  }
}

SvgIcon.defaultProps = {
  type:    '',
  color:   '#fff',
  rotateZ: 0,
  onClick: () => {}
}

SvgIcon.propTypes = {
  type:    PropTypes.string.isRequired,
  color:   PropTypes.string.isRequired,
  rotateZ: PropTypes.number.isRequired,
  size:    PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  onClick: PropTypes.func
}

export default SvgIcon
