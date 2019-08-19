import React from 'react'
import { connect } from 'react-redux'
import API from '@/utils/api'
import { ddPostMsg } from '@/utils/toolFunc'
import './index.less'

const aliPreviewHost = 'https://dd.coolcollege.cn/ac/eapp/docreader/index.html'

const mapStateToProps = ({ userInfo, previewDoc }) => {
  return {
    userInfo,
    previewDoc
  }
}

class DocReader extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      encodeUrl: ''
    }
  }
  componentDidMount() {
    const { previewDoc } = this.props
    const { docTitle } = previewDoc
    window.title = docTitle
    ddPostMsg({
      msg:   'setTitle',
      title: docTitle
    })
    this.initDocPage()
  }
  initDocPage = () => {
    const { userInfo, previewDoc } = this.props
    const { docType, docTitle, url, aliUrl } = previewDoc
    const { userId, access_token, documentMode, watermarks, name, position, jobnumber } = userInfo
    let documentWatermarks = []
    if (watermarks.length > 0) {
      watermarks.forEach(element => {
        if (element.type === 'document') {
          documentWatermarks = element.param.comment
        }
      })
    }
    let watermarkInfo = {
      name,
      position,
      jobnumber
    }
    const paramsData = {
      isSaveProgress:     false,
      isSaveRecord:       false,
      access_token,
      userId,
      hostUrl:            API.ENTERPRISE,
      courseId:           '',
      resourceId:         '',
      courseType:         1,
      planId:             '',
      studyTimeLimit:     '',
      studyTime:          '',
      saveProgressUrl:    '',
      type:               'eapp',
      documentWatermarks: documentWatermarks,
      watermarkInfo:      watermarkInfo
    }
    let paramsStr = JSON.stringify(paramsData)
    // eslint-disable-next-line no-useless-escape
    let nameStr = (docTitle + '.' + docType).replace(/[\|\~\`\(\)\@\#\$\%\^\&\*\{\}\"\L\<\>\?]/g, '') // 传文档名字
    let urls = `${GLOBAL.DOC_HOST}/?i=13399&ssl=1&iparms=${encodeURIComponent(
      paramsStr
    )}&furl=${url}?attname=${nameStr}`
    if (documentMode === 'compat' && aliUrl.indexOf('preview.imm.aliyun.com') > -1) {
      newUrl = aliUrl.split('?')[1].split('=')[1]
      let newUrl = `${aliPreviewHost}?aurl=${newUrl}&attname=${nameStr}&iparms=${encodeURIComponent(paramsStr)}`
      this.setState({
        encodeUrl: newUrl
      })
    } else {
      this.setState({
        encodeUrl: urls
      })
    }
  }
  render() {
    let { encodeUrl } = this.state
    return (
      <div className="doc-reader-container">
        <iframe style={{ width: '100%', height: '100%' }} src={encodeUrl} frameBorder="0" allowFullScreen />
      </div>
    )
  }
}

export default connect(mapStateToProps)(DocReader)
