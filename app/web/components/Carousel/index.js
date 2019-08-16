import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import Hammer from 'hammerjs'
import style from './index.module.less'

class Carousel extends React.Component {
  constructor(props) {
    super(props)

    const itemLen = props.list.length
    let list = itemLen > 1 ? this.concatList(props.list) : props.list
    this._isSingle = itemLen === 1

    this.state = {
      currentIndex:      0,
      renderSlideLength: itemLen + 2,
      list
    }
  }

  componentDidMount() {
    if (this.managerRef && !this._isSingle) {
      this.manager = new Hammer(this.managerRef)
      this.manager.on('swipe', this.handleSwipe)
    }
    this.setUlSize()
  }

  // concat list
  concatList = list => {
    let arr = []
    arr = arr.concat(list)
    arr.unshift(list[list.length - 1])
    arr.push(list[0])
    return arr
  }
  // 初始化相关
  initManagerRef = ele => {
    this.managerRef = ele
  }
  initUlRef = ele => {
    this.ulRef = ele
  }
  setUlSize = () => {
    const { height } = this.props
    const { renderSlideLength } = this.state
    if (this.ulRef) {
      this.ulRef.style.width = this._isSingle ? `100%` : `${100 * renderSlideLength}%`
      this.ulRef.style.height = `${(height / 750) * 100}vw`
      this.go(0)
    }
  }

  // translate相关
  setTranslate = instance => {
    const { time } = this.props
    if (this.ulRef) {
      this.ulRef.style.transition = `transform ${time / 1000}s ease-in-out`
      this.ulRef.style.transform = `translateX(${instance}%)`
    }
  }

  calcTranslateInstance = index => {
    const renderSlideLength = this.state.renderSlideLength
    return `-${((index + 1) * 100) / renderSlideLength}`
  }

  // autoPlay
  startAutoPlay = () => {
    const { autoplay, autoplayTime } = this.props
    if (autoplay) {
      this._timer = setInterval(() => {
        this.next()
      }, autoplayTime)
    }
  }

  stopAutoPlay = () => {
    clearInterval(this._timer)
  }

  // 点击indicator
  go = (index, isDotClick = false) => {
    if (this._isSingle) {
      this.setTranslate(this.calcTranslateInstance(-1))
      return
    }

    isDotClick &&
      this.setState({
        currentIndex: index
      })
    this.setTranslate(this.calcTranslateInstance(index))
    setTimeout(() => {
      this.startAutoPlay()
    }, this.props.time)
  }

  // touch相关
  handleSwipe = e => {
    const direction = e.offsetDirection
    // 2是手势向左， 4是手势向右
    if (direction === 2) this.handleSwipeNext(e)
    if (direction === 4) this.handleSwipePrev(e)
  }

  handleSwipePrev = e => {
    const moveInstance = e.distance
    if (moveInstance > 50) {
      this.prev()
    }
  }

  prev = () => {
    this.stopAutoPlay()
    const { currentIndex, renderSlideLength } = this.state
    let activeIndex = currentIndex - 1 < 0 ? renderSlideLength - 3 : currentIndex - 1

    this.go(currentIndex - 1)
    this.setState(
      {
        currentIndex: activeIndex
      },
      () => {
        if (activeIndex === renderSlideLength - 3) {
          setTimeout(() => {
            this.ulRef.style.transition = `none`
            this.ulRef.style.transform = `translateX(${this.calcTranslateInstance(renderSlideLength - 3)}%)`
          }, this.props.time)
        }
      }
    )
  }

  handleSwipeNext = e => {
    const moveInstance = e.distance
    if (moveInstance > 50) {
      this.next()
    }
  }

  next = () => {
    this.stopAutoPlay()
    const { currentIndex, renderSlideLength } = this.state
    let activeIndex = currentIndex + 1 >= renderSlideLength - 2 ? 0 : currentIndex + 1
    this.go(currentIndex + 1)
    this.setState(
      {
        currentIndex: activeIndex
      },
      () => {
        if (activeIndex === 0) {
          setTimeout(() => {
            this.ulRef.style.transition = `none`
            this.ulRef.style.transform = `translateX(${this.calcTranslateInstance(activeIndex)}%)`
          }, this.props.time)
        }
      }
    )
  }

  // 渲染相关
  renderItem = () => {
    return this.state.list.map((item, index) => {
      return (
        <li key={index} className={style['carousel__ul__li']}>
          <img src={item} />
        </li>
      )
    })
  }

  renderIndicator = () => {
    const slideLength = this.state.renderSlideLength - 2
    let dots = Object.keys(Array.from({ length: slideLength }))
    return <ul className={style['carousel__indicator']}>{dots.map((ele, index) => this.renderDot(index))}</ul>
  }

  renderDot = index => {
    const { currentIndex } = this.state
    const classNames = classnames([
      `${style['carousel__indicator__dot']}`,
      currentIndex === index ? `${style['carousel__indicator__dot-active']}` : ''
    ])
    return <li key={index} className={classNames} onClick={() => this.go(index, true)} />
  }

  render() {
    return (
      <div className={style['carousel']} ref={this.initManagerRef}>
        <ul className={style['carousel__ul']} ref={this.initUlRef}>
          {this.renderItem()}
        </ul>
        {this.renderIndicator()}
      </div>
    )
  }
}

Carousel.defaultProps = {
  height:       500,
  time:         300,
  autoplay:     true,
  autoplayTime: 2000,
  vertical:     false, // 待扩展
  infinite:     true, // 待扩展
  indicator:    true // 待扩展
}

Carousel.propTypes = {
  list:         PropTypes.array.isRequired,
  height:       PropTypes.number.isRequired,
  time:         PropTypes.number.isRequired,
  vertical:     PropTypes.bool,
  autoplay:     PropTypes.bool,
  autoplayTime: PropTypes.number.isRequired,
  infinite:     PropTypes.bool,
  indicator:    PropTypes.bool
}

export default Carousel
