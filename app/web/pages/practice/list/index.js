import React from 'react'
import { connect } from 'dva'
import withRouter from 'umi/withRouter';
import Link from 'umi/link';
import request from '@/service/request'
import { ActionSheet } from '@/components/Modal'
import NoData from '@/components/NoData'
import Loading from '@/components/Loading'
import { ddPostMsg } from '@/utils/toolFunc'
import API from '@/utils/api'
import SvgIcon from '@/components/Icon'
import List from '@/components/List'
import Search from '@/components/Search'
import PracticeItem from './item'
import ChooseType from './ChooseType'
import style from './index.module.less'
import { formatMessage } from 'umi-plugin-locale';

const mapStateToProps = ({ user }) => ({
    token:        user.info.access_token,
    userId:       user.info.userId,
    enterpriseId: user.info.enterpriseId
  })


class PracticeList extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      list:            [],
      pageNumber:      1,
      pageSize:        20,
      hasNextPage:     true,
      openMenuSheet:   false,
      currentPractice: {
        id:    '',
        type:  '',
        title: ''
      },
      isShowLoading:    false,
      chooseTypeConfig: {
        visible:    false,
        onCancel:   this.hiddenChooseType,
        onContinue: this.continuePractice,
        onBeginNew: this.beginNew
      }
    }
  }
  componentDidMount() {
    window.title = formatMessage({id: 'practiceList.pageTitle'})
    ddPostMsg({
      msg:   'setTitle',
      title: formatMessage({id: 'practiceList.pageTitle'})
    })
    this.getList()
  }

  // client and server both call
  static getInitialProps = async ({ store, route, isServer }) => {
    // new dva ins
    const e = {
      access_token: '60230a490b0d5d961b9ce39419c56c5c',
      enterpriseId: '948467577997365248',
      userId:       '1789916475256082432',
      watermarks:   [],
      name:         'ss',
      avatar:       'https://static.dingtalk.com/media/lADOjM5cK80C7s0C6g_746_750.jpg',
      position:     '职位职位',
      jobnumber:    '00011',
      language:     'zh_TW'
    }
    store.dispatch({
      type:    'user/saveUserInfo',
      payload: {
        userInfo: e
      }
    })
    API.initApi(e)
    // await this.getList()
  }

  getList = (keyword = '') => {
    const url = API.getPracticeList()
    const { pageNumber, pageSize } = this.state
    const params = {
      access_token: this.props.token,
      page_number:  pageNumber,
      page_size:    pageSize,
      keyword
    }
    if (this.state.list.length === 0) {
      Loading.show()
      this.setState({
        isShowLoading: true
      })
    }
    return request.get({ url, params }).then(res => {
      this.setState({
        list:        this.state.list.concat(res.data.list),
        hasNextPage: res.data.has_next_page === 'true'
      })
      if (this.state.isShowLoading) {
        this.setState({
          isShowLoading: false
        })
        Loading.hide()
      }
    })
  }
  loadMore = () => {
    if (this.state.hasNextPage) {
      this.setState(
        {
          pageNumber: this.state.pageNumber + 1
        },
        () => {
          this.getList()
        }
      )
    }
  }
  search = keyword => {
    this.setState(
      {
        pageNumber: 1,
        list:       []
      },
      this.getList(keyword)
    )
  }
  closeMenuSheet = () => {
    this.setState({
      openMenuSheet: false
    })
  }
  handleItemClick = ({ id, title, isNew, type }) => {
    this.setState(
      {
        currentPractice: {
          id,
          title,
          type
        }
      },
      () => {
        if (isNew) {
          this.showMenuSheet()
        } else {
          this.showChoosePracticeType()
        }
      }
    )
  }
  showMenuSheet = () => {
    this.setState({
      openMenuSheet: true
    })
  }
  showChoosePracticeType = () => {
    const { chooseTypeConfig } = this.state
    chooseTypeConfig.visible = true
    this.setState({
      chooseTypeConfig
    })
  }
  hiddenChooseType = (cb = () => {}) => {
    const { chooseTypeConfig } = this.state
    chooseTypeConfig.visible = false
    this.setState(
      {
        chooseTypeConfig
      },
      cb
    )
  }
  continuePractice = () => {
    const { currentPractice } = this.state
    this.hiddenChooseType(() => {
      // this.props.changePracticeType(true)
      this.props.dispatch({
        type:    'practice/changePracticeType',
        payload: { isContinue: true }
      })
      setTimeout(() => {
        if (currentPractice.type === 'bank') {
          this.props.history.push({
            pathname: '/practiceBankList',
            search:   `?practiceId=${currentPractice.id}`
          })
        } else {
          this.props.history.push({
            pathname: `/practice/${currentPractice.id}`,
            search:   '?continue=true&type=all'
          })
        }
      }, 100)
    })
  }
  beginNew = () => {
    this.hiddenChooseType(() => {
      setTimeout(this.showMenuSheet, 100)
    })
  }
  handleMenuClick = toggleChangePracticeType => {
    this.setState({
      openMenuSheet: false
    })
    if (toggleChangePracticeType) {
      this.props.dispatch({
        type:    'practice/changePracticeType',
        payload: { isContinue: false }
      })
    }
  }
  render() {
    // const { t } = this.props
    const { currentPractice, chooseTypeConfig } = this.state
    return (
      <div className={`${style.practiceList}`}>
        <div className={`${style.practiceSearch}`}>
          <Search onChange={this.search} />
        </div>
        {this.state.list.length > 0 || this.state.isShowLoading ? (
          <List
            height="100%"
            handleScrollDown={this.loadMore}
            lowerThreshold={300}
            className={`${style.listContainer}`}>
            {this.state.list.map((item, index) => <PracticeItem practice={item} key={index} handleClick={this.handleItemClick} />)}
          </List>
        ) : (
          <NoData />
        )}
        {this.state.openMenuSheet ? (
          <ActionSheet isOpen={this.state.openMenuSheet} onRequestClose={this.closeMenuSheet}>
            <div className={`${style.menuSheet}`} onClick={this.handleMenuClick}>
              <Link
                to={{
                  pathname: `/practice/${currentPractice.id}`,
                  search:   '?type=all&order=fixed'
                }}>
                <SvgIcon type="icone-sequence" color="#000" size={32} />
                {formatMessage({id: 'practiceList.sequence'})}
              </Link>
            </div>
            <div className={`${style.menuSheet}`} onClick={this.handleMenuClick}>
              <Link
                to={{
                  pathname: `/practice/${currentPractice.id}`,
                  search:   '?type=all&order=random'
                }}>
                <SvgIcon type="icone-random" color="#000" size={32} />
                {formatMessage({id: 'practiceList.random'})}
              </Link>
            </div>
            <div className={`${style.menuSheet}`} onClick={() => this.handleMenuClick(true)}>
              <Link
                to={{
                  pathname: '/practiceBankList',
                  search:   `?practiceId=${currentPractice.id}`
                }}>
                <SvgIcon type="iconxuanzetiku" color="#000" size={32} />
                {formatMessage({id: 'practiceList.chooseBank'})}
              </Link>
            </div>
          </ActionSheet>
        ) : null}
        <ChooseType {...chooseTypeConfig} />
      </div>
    )
  }
}

export default connect(
  mapStateToProps,
)((withRouter(PracticeList)))
