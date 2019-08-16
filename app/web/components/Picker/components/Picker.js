import React from 'react'
import classNames from 'classnames'
import './Picker.less'

class Picker extends React.Component {
  static defaultProps = {
    prefixCls: 'cl-picker'
  }

  scrollHanders = (() => {
    let scrollY = -1
    let lastY = 0
    let startY = 0
    let scrollDisabled = false
    let isMoving = false

    const setTransform = (nodeStyle, value) => {
      nodeStyle.transform = value
      nodeStyle.webkitTransform = value
    }

    const setTransition = (nodeStyle, value) => {
      nodeStyle.transition = value
      nodeStyle.webkitTransition = value
    }

    const scrollTo = (_x, y, time = 0.3) => {
      if (scrollY !== y) {
        scrollY = y
        if (time && !this.props.noAnimate) {
          setTransition(this.contentRef.style, `cubic-bezier(0,0,0.2,1.15) ${time}s`)
        }
        setTransform(this.contentRef.style, `translate3d(0,${-y}px,0)`)
        setTimeout(() => {
          this.scrollingComplete()
          if (this.contentRef) {
            setTransition(this.contentRef.style, '')
          }
        }, +time * 1000)
      }
    }

    const Velocity = ((minInterval = 30, maxInterval = 100) => {
      let _time = 0
      let _y = 0
      let _velocity = 0
      const recorder = {
        record: y => {
          const now = +new Date()
          _velocity = (y - _y) / (now - _time)
          if (now - _time >= minInterval) {
            _velocity = now - _time <= maxInterval ? _velocity : 0
            _y = y
            _time = now
          }
        },
        getVelocity: y => {
          if (y !== _y) {
            recorder.record(y)
          }
          return _velocity
        }
      }
      return recorder
    })()

    const onFinish = () => {
      isMoving = false
      let targetY = scrollY

      const height = (this.props.children.length - 1) * this.itemHeight

      let time = 0.3

      const velocity = Velocity.getVelocity(targetY) * 4
      if (velocity) {
        targetY = velocity * 40 + targetY
        time = Math.abs(velocity) * 0.1
      }

      if (targetY % this.itemHeight !== 0) {
        targetY = Math.round(targetY / this.itemHeight) * this.itemHeight
      }

      if (targetY < 0) {
        targetY = 0
      } else if (targetY > height) {
        targetY = height
      }

      scrollTo(0, targetY, time < 0.3 ? 0.3 : time)
      this.onScrollChange()
    }

    const onStart = y => {
      if (scrollDisabled) {
        return
      }

      isMoving = true
      startY = y
      lastY = scrollY
    }

    const onMove = y => {
      if (scrollDisabled || !isMoving) {
        return
      }

      scrollY = lastY - y + startY
      Velocity.record(scrollY)

      this.onScrollChange()
      setTransform(this.contentRef.style, `translate3d(0,${-scrollY}px,0)`)
    }

    return {
      touchstart: evt => onStart(evt.touches[0].pageY),
      mousedown:  evt => onStart(evt.pageY),
      touchmove:  evt => {
        evt.preventDefault()
        onMove(evt.touches[0].pageY)
      },
      mousemove: evt => {
        evt.preventDefault()
        onMove(evt.pageY)
      },
      touchend:    () => onFinish(),
      touchcancel: () => onFinish(),
      mouseup:     () => onFinish(),
      getValue:    () => {
        return scrollY
      },
      scrollTo,
      setDisabled: (disabled = false) => {
        scrollDisabled = disabled
      }
    }
  })()

  constructor(props) {
    super(props)

    let selectedValueState
    const { selectedValue, defaultSelectedValue } = this.props
    if (selectedValue !== undefined) {
      selectedValueState = selectedValue
    } else if (defaultSelectedValue !== undefined) {
      selectedValueState = defaultSelectedValue
    } else {
      const children = React.Children.toArray(this.props.children)
      selectedValueState = children && children[0] && children[0].props.value
    }
    this.state = {
      selectedValue: selectedValueState
    }
  }

  componentDidMount() {
    const { contentRef, indicatorRef, maskRef, rootRef } = this
    // const rootHeight = rootRef.getBoundingClientRect().height;
    // const itemHeight = this.itemHeight = indicatorRef.getBoundingClientRect().height;
    const rootHeight = rootRef.offsetHeight
    const itemHeight = (this.itemHeight = indicatorRef.offsetHeight)
    let num = Math.floor(rootHeight / itemHeight)
    if (num % 2 === 0) {
      num--
    }
    num--
    num /= 2
    contentRef.style.padding = `${itemHeight * num}px 0`
    indicatorRef.style.top = `${itemHeight * num}px`
    maskRef.style.backgroundSize = `100% ${itemHeight * num}px`
    this.scrollHanders.setDisabled(this.props.disabled)
    this.props.select(this.state.selectedValue, this.itemHeight, this.scrollTo)

    const passiveSupported = this.passiveSupported()
    const willPreventDefault = passiveSupported ? { passive: false } : false
    const willNotPreventDefault = passiveSupported ? { passive: true } : false
    Object.keys(this.scrollHanders).forEach(key => {
      if (key.indexOf('touch') === 0 || key.indexOf('mouse') === 0) {
        const pd = key.indexOf('move') >= 0 ? willPreventDefault : willNotPreventDefault
        rootRef.addEventListener(key, this.scrollHanders[key], pd)
      }
    })
  }

  componentWillUnmount() {
    Object.keys(this.scrollHanders).forEach(key => {
      if (key.indexOf('touch') === 0 || key.indexOf('mouse') === 0) {
        this.rootRef.removeEventListener(key, this.scrollHanders[key])
      }
    })
  }

  passiveSupported() {
    let passiveSupported = false

    try {
      const options = Object.defineProperty({}, 'passive', {
        get() {
          passiveSupported = true
          return false
        }
      })
      window.addEventListener('test', null, options)
    } catch (err) {
      console.warn(err)
    }
    return passiveSupported
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if ('selectedValue' in nextProps) {
      if (this.state.selectedValue !== nextProps.selectedValue) {
        this.setState(
          {
            selectedValue: nextProps.selectedValue
          },
          () => {
            this.props.select(
              nextProps.selectedValue,
              this.itemHeight,
              nextProps.noAnimate ? this.scrollToWithoutAnimation : this.scrollTo
            )
          }
        )
      }
    }
    this.scrollHanders.setDisabled(nextProps.disabled)
  }

  shouldComponentUpdate(nextProps, nextState) {
    return this.state.selectedValue !== nextState.selectedValue || this.props.children !== nextProps.children
  }

  componentDidUpdate() {
    this.props.select(this.state.selectedValue, this.itemHeight, this.scrollToWithoutAnimation)
  }

  scrollTo = top => {
    this.scrollHanders.scrollTo(0, top)
  }

  scrollToWithoutAnimation = top => {
    this.scrollHanders.scrollTo(0, top, 0)
  }

  fireValueChange = selectedValue => {
    if (selectedValue !== this.state.selectedValue) {
      if (!('selectedValue' in this.props)) {
        this.setState({
          selectedValue
        })
      }
      if (this.props.onValueChange) {
        this.props.onValueChange(selectedValue)
      }
    }
  }

  onScrollChange = () => {
    const top = this.scrollHanders.getValue()
    if (top >= 0) {
      const children = React.Children.toArray(this.props.children)
      const index = this.props.computeChildIndex(top, this.itemHeight, children.length)
      if (this.scrollValue !== index) {
        this.scrollValue = index
        const child = children[index]
        if (child && this.props.onScrollChange) {
          this.props.onScrollChange(child.props.value)
        } else if (!child && console.warn) {
          console.warn('child not found', children, index)
        }
      }
    }
  }

  scrollingComplete = () => {
    const top = this.scrollHanders.getValue()
    if (top >= 0) {
      this.props.doScrollingComplete(top, this.itemHeight, this.fireValueChange)
    }
  }

  getValue() {
    if ('selectedValue' in this.props) {
      return this.props.selectedValue
    }
    const children = React.Children.toArray(this.props.children)
    return children && children[0] && children[0].props.value
  }

  render() {
    const { props } = this
    const { prefixCls, itemStyle, indicatorStyle, indicatorClassName = '', children } = props
    const { selectedValue } = this.state
    const itemClassName = `${prefixCls}__item`
    const selectedItemClassName = `${itemClassName} ${prefixCls}__item-selected`
    const map = item => {
      const { className = '', style, value } = item.props
      return (
        <div
          style={{ ...itemStyle, ...style }}
          className={`${selectedValue === value ? selectedItemClassName : itemClassName} ${className}`}
          key={value}>
          {item.children || item.props.children}
        </div>
      )
    }
    // compatibility for preact
    const items = React.Children ? React.Children.map(children, map) : [].concat(children).map(map)

    const pickerCls = {
      [props.className]: !!props.className,
      [prefixCls]:       true
    }
    return (
      <div className={classNames(pickerCls)} ref={el => (this.rootRef = el)} style={this.props.style}>
        <div className={`${prefixCls}__mask`} ref={el => (this.maskRef = el)} />
        <div
          className={`${prefixCls}__indicator ${indicatorClassName}`}
          ref={el => (this.indicatorRef = el)}
          style={indicatorStyle}
        />
        <div className={`${prefixCls}__content`} ref={el => (this.contentRef = el)}>
          {items}
        </div>
      </div>
    )
  }
}

export default Picker
