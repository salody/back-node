import React from 'react'
import PropTypes from 'prop-types'
import { throttle } from '@/utils/toolFunc'

class List extends React.Component {
  constructor(props) {
    super(props)
    this.listRef = React.createRef()
  }
  static isLoading = false
  componentDidMount() {
    let clientHeight = this.listRef.current.clientHeight
    let scrollHeight = 0
    let isLoading = false
    let currentScrollHeight = 0
    let currentScrollTop = 0

    const scrollCbk = throttle(300, () => {
      if (scrollHeight !== currentScrollHeight - clientHeight) {
        isLoading = false
      }
      scrollHeight = currentScrollHeight - clientHeight
      let scrollTop = currentScrollTop
      if (!isLoading && scrollHeight <= scrollTop + this.props.lowerThreshold) {
        isLoading = true
        if (this.props.handleScrollDown) {
          this.props.handleScrollDown()
        }
      }
      this.isLoading = isLoading
    })

    this.listRef.current.addEventListener('scroll', e => {
      currentScrollHeight = e.target.scrollHeight
      currentScrollTop = e.target.scrollTop
      scrollCbk()
    })
  }
  render() {
    return (
      <div
        display-name="component-list"
        className={this.props.className}
        ref={this.listRef}
        style={{
          height:     this.props.height,
          overflow:   'auto',
          background: 'transparent'
        }}>
        {this.props.children}
      </div>
    )
  }
}

List.defaultProps = {
  height:           '100%',
  lowerThreshold:   300,
  handleScrollDown: () => {}
}

List.propTypes = {
  height:           PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  lowerThreshold:   PropTypes.number,
  handleScrollDown: PropTypes.func
}

export default List
