import React from 'react'
import { ICON_CONFIG } from '@/utils/icon'
import SvgIcon from '@/components/Icon'
import Audio from './Audio'
import './index.less'

class AudioDisplay extends React.Component {
  render() {
    const {
      mediaData: { meta }
    } = this.props
    return (
      <div className="article-audio">
        <span className="article-audio-icon">
          <SvgIcon type={ICON_CONFIG['mp3']} color="#000" size={32} />
        </span>
        <div className="article-audio-play">
          <Audio src={meta.record.url} />
        </div>
      </div>
    )
  }
}

export default AudioDisplay
