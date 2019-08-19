import React from 'react'
import './index.less'

class VideoDisplay extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    const {
      mediaData: { meta }
    } = this.props
    return (
      <div className="article-video">
        <video src={meta.record.url} autoPlay={false} controls={true} loop={false} preload="auto" />
      </div>
    )
  }
}

export default VideoDisplay
