import React from 'react'
import { connect } from 'dva';
import router from 'umi/router';
import { ICON_CONFIG } from '@/utils/icon'
import SvgIcon from '@/components/Icon'
import './index.less'

const mapStateToProps = () => ({})

@connect()
class DocDisplay extends React.Component {
  linkToPreview = () => {
    const { mediaData } = this.props
    const { type, path, url, name } = mediaData.meta.record
    this.props.dispatch({
      type:    'previewDoc/init',
      payload: {
        url,
        docType:  type,
        docTitle: name,
        aliUrl:   path
      },
    });
    router.push('/previewDoc')
  }
  render() {
    const { mediaData } = this.props
    const { type } = mediaData.meta.record
    return (
      <div className="article-doc" onClick={this.linkToPreview}>
        <span className="article-doc-icon">
          <SvgIcon type={ICON_CONFIG[type === 'audio/mp3' ? 'mp3' : type]} color="#000" size={32} />
        </span>
        <span className="article-doc-name">{mediaData.name}</span>
        <span className="article-doc-link">点我查看</span>
      </div>
    )
  }
}

export default DocDisplay
