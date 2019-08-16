import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { FixedSizeList as List } from 'react-window'
import Hammer from 'hammerjs'
import './index.less'

class SwiperList extends Component {
  isMoving = false
  constructor(props) {
    super(props)
    this.listRef = React.createRef()
    this.outerRef = React.createRef()
    this.state = {
      activeIndex: 0
    }
  }

  componentDidMount() {
    this.isMoving = false
    if (this.listRef) {
      window.requestAnimationFrame(() => {
        this.scrollToItem(this.state.activeIndex)
      })
    }

    const animateEl = this.outerRef.current.children[0]
    animateEl.style.transition = 'transform .25s'

    const manager = new Hammer.Manager(animateEl)
    const Swipe = new Hammer.Swipe()
    manager.add(Swipe)

    const _this = this
    manager.on('swipe', function(e) {
      const direction = e.offsetDirection
      // 2是往左滑， 4是向右滑动
      if (direction === 2 && !_this.isMoving) {
        _this.swipeNext()
      }
      if (direction === 4 && !_this.isMoving) {
        _this.swipePrev()
      }
    })
  }
  swipeNext = () => {
    const animateEl = this.outerRef.current.children[0]
    this.isMoving = true
    this.changeActive(this.state.activeIndex + 1)
    setTimeout(() => {
      animateEl.style.transform = `translateX(-${this.props.containerWidth}px)`
      setTimeout(() => {
        animateEl.style.transition = ''
        this.scrollToItem(this.state.activeIndex)
        animateEl.style.transform = `translateX(0px)`
        this.isMoving = false
        window.requestAnimationFrame(() => {
          animateEl.style.transition = 'transform .25s'
        })
      }, 500)
    }, 0)
  }

  swipePrev = () => {
    const animateEl = this.outerRef.current.children[0]
    if (this.state.activeIndex === 0) {
      return
    }
    this.isMoving = true
    this.changeActive(this.state.activeIndex - 1)
    setTimeout(() => {
      animateEl.style.transform = `translateX(${this.props.containerWidth}px)`
      setTimeout(() => {
        animateEl.style.transition = ''
        this.scrollToItem(this.state.activeIndex)
        animateEl.style.transform = `translateX(0px)`
        this.isMoving = false
        window.requestAnimationFrame(() => {
          animateEl.style.transition = 'transform .25s'
        })
      }, 500)
    }, 0)
  }
  changeActive = active => {
    console.log('active', active)
    this.setState({
      activeIndex: active
    })
    if (this.props.changeActive) {
      this.props.changeActive(active)
    }
  }
  scrollToItem = active => {
    this.listRef.current.scrollToItem(active)
  }
  render() {
    return (
      <div className="swiper-list-container">
        <List
          ref={this.listRef}
          outerRef={this.outerRef}
          height={'100%'}
          itemCount={this.props.listCount || 100}
          itemData={this.props.list}
          itemSize={this.props.itemWidth}
          width={this.props.containerWidth}
          layout={this.props.layout}
          gotoNext={this.swipeNext}>
          {this.props.renderChildren}
        </List>
      </div>
    )
  }
}

SwiperList.defaultProps = {
  list:           {},
  itemWidth:      0,
  containerWidth: 0,
  layout:         'horizontal',
  renderChildren: {},
  changeActive:   () => {}
}

SwiperList.propTypes = {
  list:           PropTypes.object,
  itemWidth:      PropTypes.number,
  containerWidth: PropTypes.number,
  layout:         PropTypes.oneOf(['horizontal', 'vertical']),
  renderChildren: PropTypes.object,
  changeActive:   PropTypes.func
}

export default SwiperList
