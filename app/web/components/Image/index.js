import React, { Component } from 'react'
import PropTypes from 'prop-types'

class Image extends Component {
  state = {
    isLoaded: false
  }
  componentDidMount() {
    // why using new Image() not working??
    const image = document.createElement('img')
    image.src = this.props.src

    image.onload = () => {
      this.setLoadingStatus(true)
    }
    image.onerror = () => {
      this.setLoadingStatus(false)
    }
  }

  componentWillUnmount() {
    this.setLoadingStatus = () => {}
  }

  setLoadingStatus = isLoaded => {
    this.setState({ isLoaded })
  }

  render() {
    // console.log('render')
    const { src, placeholder } = this.props
    if (this.state.isLoaded) {
      return (
        <img src={src} height={this.props.height} width={this.props.width} style={{ objectFit: this.props.mode }} />
      )
    }
    return (
      <img
        src={placeholder}
        height={this.props.height}
        width={this.props.width}
        style={{ objectFit: this.props.mode }}
      />
    )
  }
}

Image.propTypes = {
  src:         PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  width:       PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  height:      PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  mode:        PropTypes.string
}

export default Image
