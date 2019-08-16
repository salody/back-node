import React, { Component, PureComponent } from 'react'
import { FixedSizeList as List } from 'react-window'
import Hammer from 'hammerjs'
import axios from 'axios'

class ItemRenderer extends PureComponent {
  render() {
    // Access the items array using the "data" prop:
    const item = this.props.data[this.props.index]
    if (item) {
      return (
        <div style={this.props.style}>
          <h1>试题{this.props.index + 1}</h1>
          <div>试题说明: {item.title}</div>

          {item.title_images.map((img, index) => (
            <div key={index}>
              <img
                onClick={() => {
                  dd.previewImage({
                    current: index,
                    urls:    [...item.title_images]
                  })
                }}
                src={img}
                alt=""
                width={150}
              />
            </div>
          ))}

          {item.options.map(option => (
            <div key={option.id}>
              <label>
                <input
                  onChange={this.handleOptionChange}
                  type="radio"
                  id={option.id}
                  name="contact"
                  value={option.option_order}
                />
                {option.option_order}: {option.title}
              </label>
            </div>
          ))}
        </div>
      )
    }
    return null
  }

  handleOptionChange = e => {
    console.log(this.props)
    console.log(e.target)
    this.setState({
      selectedOption: e.target.value
    })

    if (e.target.value === 'A') {
      this.props.gotoNext()
    }
  }
}

class SwiperList extends Component {
  isMoving = false

  state = {
    windowWidth: 0,
    activeIndex: 0,
    questions:   []
  }

  constructor(props) {
    super(props)
    this.listRef = React.createRef()
    this.outerRef = React.createRef()
  }

  componentDidMount() {
    let params = {
      params: {
        access_token: '2333333333333333'
      }
    }
    let url = `https://api.coolcollege.cn/mock/32/v2/{enterprise-id}/users/{user-id}/exams/{exam-id}/query`
    axios.get(url, params).then(res => {
      this.setState({
        questions: res.data.questions
      })
    })
    this.isMoving = false
    this.setState({
      windowWidth: window.innerWidth
    })

    if (this.listRef) {
      window.requestAnimationFrame(() => {
        this.listRef.current.scrollToItem(this.state.activeIndex)
      })
    }
    const animateEl = this.outerRef.current.children[0]
    animateEl.style.transition = 'transform .25s'

    const manager = new Hammer.Manager(animateEl)
    const Swipe = new Hammer.Swipe()
    manager.add(Swipe)

    // Subscribe to a desired event
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
    this.setState({
      activeIndex: this.state.activeIndex + 1
    })
    setTimeout(() => {
      animateEl.style.transform = `translateX(-${window.innerWidth}px)`

      setTimeout(() => {
        animateEl.style.transition = ''
        this.listRef.current.scrollToItem(this.state.activeIndex)
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
    this.setState({
      activeIndex: this.state.activeIndex - 1
    })
    setTimeout(() => {
      console.log(this.state.activeIndex)
      animateEl.style.transform = `translateX(${window.innerWidth}px)`

      setTimeout(() => {
        animateEl.style.transition = ''
        this.listRef.current.scrollToItem(this.state.activeIndex)
        animateEl.style.transform = `translateX(0px)`
        this.isMoving = false
        window.requestAnimationFrame(() => {
          animateEl.style.transition = 'transform .25s'
        })
      }, 500)
    }, 0)
  }

  render() {
    return (
      <div style={{ height: '100%', background: 'blue', color: '#fff' }}>
        <List
          ref={this.listRef}
          outerRef={this.outerRef}
          itemData={this.state.questions}
          height={'100%'}
          itemCount={1000}
          itemSize={this.state.windowWidth}
          layout="horizontal"
          width={this.state.windowWidth}
          gotoNext={this.swipeNext}>
          {props => <ItemRenderer gotoNext={this.swipeNext} {...props} />}
        </List>
        <div
          onClick={() => {
            this.setState({
              activeIndex: 499
            })
            this.listRef.current.scrollToItem(499)
          }}
          style={{ height: '40px', background: 'red', position: 'fixed', bottom: 0 }}>
          跳转到第500道题
        </div>
      </div>
    )
  }
}

export default SwiperList
