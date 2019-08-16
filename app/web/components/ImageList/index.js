import React, { Component } from 'react'
import PropTypes from 'prop-types'

import Image from '@/components/Image'
import style from './index.module.less'

class ImageBox extends Component {
  constructor(props) {
    super(props)
  }
  handlePreviewImage = url => {
    // 预览图片
    if (typeof dd !== 'undefined') {
      dd.previewImage({
        urls: [url]
      })
    }
  }
  render() {
    const { url } = this.props
    return (
      <div className={style.imageBox} onClick={() => this.handlePreviewImage(url)}>
        <Image mode="contain" src={url} />
      </div>
    )
  }
}
class ImageList extends Component {
  componentDidMount() {}
  render() {
    const { imageList } = this.props
    // console.log(121212, imageList)
    const imagesCount = imageList.length
    // console.log(imagesCount)
    if (imagesCount < 7) {
      switch (imagesCount) {
        case 1:
          return (
            <div className={`${style.singleContainer} ${style.container}`}>
              {imageList.map((element, index) => (
                <ImageBox key={index} url={element.url} />
              ))}
            </div>
          )
        case 2:
          return (
            <div className={`${style.doubleContainer} ${style.container}`}>
              {imageList.map((element, index) => (
                <ImageBox key={index} url={element.url} />
              ))}
            </div>
          )
        case 3:
          return (
            <div className={`${style.threefoldContainer} ${style.container}`}>
              {imageList.map((element, index) => (
                <ImageBox key={index} url={element.url} />
              ))}
            </div>
          )
        case 4:
          return (
            <div className={`${style.fourfoldContainer} ${style.container}`}>
              <div className={`${style.doubleContainer}`}>
                {imageList.slice(0, 2).map((element, index) => (
                  <ImageBox key={index} url={element.url} />
                ))}
              </div>
              <div className={`${style.doubleContainer}`}>
                {imageList.slice(2, 4).map((element, index) => (
                  <div key={index} className={style.imageBox}>
                    <ImageBox key={index} url={element.url} />
                  </div>
                ))}
              </div>
            </div>
          )
        case 5:
          return (
            <div className={`${style.fivefoldContainer} ${style.container}`}>
              <div className={`${style.doubleContainer}`}>
                {imageList.slice(0, 2).map((element, index) => (
                  <ImageBox key={index} url={element.url} />
                ))}
              </div>
              <div className={`${style.threefoldContainer}`}>
                {imageList.slice(2, 5).map((element, index) => (
                  <ImageBox key={index} url={element.url} />
                ))}
              </div>
            </div>
          )
        case 6:
          return (
            <div className={`${style.sixfoldContainer} ${style.container}`}>
              <div className={`${style.threefoldContainer}`}>
                {imageList.slice(0, 3).map((element, index) => (
                  <ImageBox key={index} url={element.url} />
                ))}
              </div>
              <div className={`${style.threefoldContainer}`}>
                {imageList.slice(3, 6).map((element, index) => (
                  <ImageBox key={index} url={element.url} />
                ))}
              </div>
            </div>
          )
        default:
          return null
      }
    } else {
      return (
        <div className={`${style.multifoldContainer} ${style.container}`}>
          {imageList.map((element, index) => (
            <ImageBox key={index} url={element.url} />
          ))}
        </div>
      )
    }
  }
}

ImageList.propTypes = {
  imageList: PropTypes.array.isRequired
}

export default ImageList
