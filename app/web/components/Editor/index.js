import React from 'react'
import BraftEditor from 'braft-editor'
import 'braft-editor/dist/index.css'
import ImageDisplay from './renders/ImageDisplay'
import AudioDisplay from './renders/AudioDisplay'
import VideoDisplay from './renders/VideoDisplay'
import DocDisplay from './renders/DocDisplay'
import './index.less'

class Editor extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      editorState: BraftEditor.createEditorState(props.content)
    }
    this.editorInstance = React.createRef()
  }
  blockRendererFn = (block, superProps) => {
    let blockRenderer = null
    const entityKey = block.getEntityAt(0)
    if (!entityKey) {
      return null
    }
    const contentState = superProps.editorState.getCurrentContent()
    const entity = contentState.getEntity(entityKey)
    const mediaType = entity.getType()
    const mediaData = entity.getData()
    const mediaProps = {
      ...superProps,
      block: block,
      mediaData,
      entityKey
    }
    switch (mediaType) {
      case 'IMAGE':
        blockRenderer = {
          component: () => <ImageDisplay {...mediaProps} />,
          editable:  false
        }
        break
      case 'CUSTOMER_AUDIO':
        blockRenderer = {
          component: () => <AudioDisplay {...mediaProps} />,
          editable:  false
        }
        break
      case 'CUSTOMER_VIDEO':
        blockRenderer = {
          component: () => <VideoDisplay {...mediaProps} />,
          editable:  false
        }
        break
      case 'DOC':
        blockRenderer = {
          component: () => <DocDisplay {...mediaProps} />,
          editable:  false
        }
        break
      default:
        break
    }
    return blockRenderer
  }
  render() {
    let { editorState } = this.state
    return (
      <div className="editor-container">
        <BraftEditor
          ref={instance => (this.editorInstance = instance)}
          value={editorState}
          readOnly={true}
          controls={[]}
          blockRendererFn={this.blockRendererFn}
        />
      </div>
    )
  }
}

export default Editor
