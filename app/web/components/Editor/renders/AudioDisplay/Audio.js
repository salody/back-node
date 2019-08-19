import React from 'react'
import SvgIcon from '@/components/Icon'
import request from '@/service/request'
import './Audio.less'

function formatTime(num) {
  num = parseInt(num)
  let minutes = parseInt(num / 60)
  let seconds = num % 60
  return `${minutes}:${seconds <= 9 ? '0' + seconds : seconds}`
}

class Audio extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isPlay:             false,
      duration:           0,
      currentTime:        formatTime(0),
      totalTime:          formatTime(0),
      timelineWidth:      0,
      playLineLeft:       0,
      cacheProgressWidth: 0
    }
    this.audioRef = React.createRef()
    this.timelineRef = React.createRef()
    this.playHeadRef = React.createRef()
  }
  componentDidMount() {
    let audioEle = this.audioRef.current
    let playIconEle = this.playHeadRef.current
    audioEle.addEventListener('timeupdate', this.timeUpdate)
    audioEle.addEventListener('ended', this.handleEnded)
    playIconEle.addEventListener('touchmove', this.handleDragStart)
    playIconEle.addEventListener('touchend', this.handleDragEnd)

    this.getDuration()
  }
  getDuration = () => {
    request.get({ url: `https://frontendapi.coolcollege.cn/media/getDuration?path=${this.props.src}` }).then(res => {
      if (res.data) {
        this.setDuration(res.data)
      }
    })
  }
  setDuration = duration => {
    this.setState(
      {
        totalTime: formatTime(duration),
        duration:  duration
      },
      () => {
        let timelineEle = this.timelineRef.current
        let hasCache = this.hasCached()
        let cacheProgressWidth = Math.floor((hasCache / duration) * timelineEle.scrollWidth)
        this.setState({
          timelineWidth: timelineEle.scrollWidth - 8,
          cacheProgressWidth
        })
      }
    )
  }
  timeUpdate = ({ target }) => {
    const { currentTime } = target
    let { isPlay, timelineWidth, duration } = this.state
    let hasCache = this.hasCached()
    let realTimelineWidth = timelineWidth + 8
    let cacheProgressWidth = Math.floor((hasCache / duration) * realTimelineWidth)
    this.setState({
      currentTime:        formatTime(currentTime >= duration ? 0 : currentTime),
      playLineLeft:       currentTime >= duration ? 0 : Math.floor((currentTime / duration) * timelineWidth),
      cacheProgressWidth: hasCache >= duration ? realTimelineWidth : cacheProgressWidth
    })
    if (currentTime >= duration && isPlay) {
      this.play()
    }
  }
  play = () => {
    let { isPlay, duration } = this.state
    if (duration <= 0) return
    this.setState({
      isPlay: !isPlay
    })
    if (isPlay) {
      this.audioRef.current.pause()
    } else {
      this.audioRef.current.play()
    }
  }
  handleEnded = () => {
    this.setState({
      isPlay:       false,
      playLineLeft: 0,
      currentTime:  formatTime(0)
    })
  }
  hasCached = () => {
    let audioEle = this.audioRef.current
    let buffered = audioEle.buffered
    let hasCache = buffered.length > 0 ? buffered.end(audioEle.buffered.length - 1) : 0
    return hasCache
  }
  timelineClick = e => {
    let timelineEle = this.timelineRef.current
    let audioEle = this.audioRef.current
    let hasCache = this.hasCached()
    let { timelineWidth, isPlay, cacheProgressWidth, duration } = this.state
    let newLeft = e.pageX - timelineEle.offsetLeft
    newLeft = newLeft <= 0 ? 0 : newLeft
    let currentTime = (duration * newLeft) / timelineWidth
    if (currentTime >= hasCache) {
      newLeft = cacheProgressWidth - 8
      audioEle.currentTime = hasCache
    } else {
      audioEle.currentTime = currentTime
    }
    this.setState({
      playLineLeft: newLeft
    })
    if (!isPlay) this.play()
  }
  handleDragStart = ({ touches }) => {
    let timelineEle = this.timelineRef.current
    let { timelineWidth, isPlay } = this.state
    let newLeft = touches[0].pageX - timelineEle.offsetLeft
    newLeft = newLeft <= 0 ? 0 : newLeft > timelineWidth ? timelineWidth : newLeft
    this.setState({
      playLineLeft: newLeft
    })
    if (isPlay) {
      this.play()
    }
  }
  handleDragEnd = () => {
    let { isPlay, timelineWidth, playLineLeft, duration } = this.state
    let audioEle = this.audioRef.current
    if (!isPlay) {
      let currentTime = (duration * playLineLeft) / timelineWidth
      let hasCache = this.hasCached()
      if (currentTime >= hasCache) {
        audioEle.currentTime = hasCache
        this.setState({
          playLineLeft: Math.floor((hasCache / duration) * timelineWidth)
        })
      } else {
        audioEle.currentTime = (duration * playLineLeft) / timelineWidth
      }
      this.play()
    }
  }
  render() {
    const { src } = this.props
    let { isPlay, currentTime, totalTime, playLineLeft, cacheProgressWidth } = this.state
    return (
      <div className="audio-wrap">
        <audio className="audio-ele" ref={this.audioRef} src={src} preload="metadata" controls />
        <SvgIcon type={!isPlay ? 'icone-play' : 'icone-pause'} color="#565657" size={32} onClick={this.play} />
        <span className="audio-time">
          <span className="audio-time-current">{currentTime}</span>/
          <span className="audio-time-total">{totalTime}</span>
        </span>
        <div ref={this.timelineRef} className="audio-timeline" onClick={this.timelineClick}>
          <div
            ref={this.playHeadRef}
            onTouchEnd={this.handleDragEnd}
            style={{ left: playLineLeft + 'px' }}
            className="audio-timeline-play"></div>
          <div className="audio-timeline-played" style={{ width: playLineLeft + 'px' }} />
          <div className="audio-timeline-cached" style={{ width: cacheProgressWidth + 'px' }} />
        </div>
      </div>
    )
  }
}

export default Audio
