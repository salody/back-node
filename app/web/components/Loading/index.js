const Loading = {
  show: config => {
    if (typeof dd !== 'undefined') {
      config = Object.assign({}, config, {
        content: 'loading',
        delay:   1000
      })
      dd.showLoading(config)
    }
  },
  hide: () => {
    if (typeof dd !== 'undefined') {
      dd.hideLoading()
    }
  }
}

export default Loading
