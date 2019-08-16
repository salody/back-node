import React from 'react'
import { withTranslation } from 'react-i18next'
import SvgIcon from '@/components/Icon'
import style from './index.module.less'

class Search extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      keyword: ''
    }
  }
  searchInput = ({ target: { value }, key }) => {
    this.setState({
      keyword: value
    })
    if (key === 'Enter') {
      this.props.onChange(value)
    }
  }
  search = () => {
    this.props.onChange(this.state.keyword)
  }
  clearKeyword = () => {
    this.setState({
      keyword:    ''
    })
    this.props.onChange('')
  }
  render () {
    const { t } = this.props
    let { keyword } = this.state
    return (
      <div className={`${style.searchContainer}`}>
        <input placeholder={t('practice.search')} className={`${style.searchInput}`}
          value={keyword} onChange={this.searchInput} onKeyPress={this.searchInput} onBlur={this.search}/>
        <div className={`${style.searchIcon}`}>
          <SvgIcon type="icone-search" color="#D1D7F2" size={32} />
        </div>
        {keyword ?
          <div className={`${style.searchClear}`} onClick={this.clearKeyword}>
            <SvgIcon type="icone-close-line" color="#D1D7F2" size={32}/>
          </div>
          :
          null
        }
      </div>
    )
  }
}

export default withTranslation()(Search)
