import React from 'react'
import './index.less'

class ImageDisplay extends React.Component {
  constructor(props) {
    super(props)
  }
  preview = () => {
    const { mediaData } = this.props
    if (typeof dd !== 'undefined') {
      dd.previewImage({
        urls: [mediaData.url]
      })
    }
  }
  render() {
    const { mediaData } = this.props
    return (
      <div className="article-img">
        <img src={mediaData.url} onClick={this.preview} />
      </div>
    )
  }
}

export default ImageDisplay
