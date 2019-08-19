import axios from 'axios'
import Qs from 'qs'
import apiInfo from '@/utils/api'
import { Loading } from '@/components'
import Modal from '@/components/Modal'
import errorInfo from '@/utils/errorInfo'
// import history from '../routes/history'

class Request {
  constructor(props = {}) {
    // 设置axios为form-data
    const isFormData = props.type === 'formData'
    let request
    if (isFormData) {
      request = axios.create({
        timeout:          50000,
        'Content-Type':   'application/x-www-form-urlencoded',
        transformRequest: [
          function(data) {
            data = Qs.stringify(data)
            return data
          }
        ]
      })
    } else {
      request = axios.create({
        timeout: 50000
      })
    }

    request.interceptors.request.use(this.handleRequest)

    request.interceptors.response.use(this.handleSuccess, this.handleError)

    this.request = request
  }

  handleRequest(config) {
    // Do something before request is sent
    // if (store.user.token) {
    //   // 让每个请求携带token-- ['X-Token']为自定义key 请根据实际情况自行修改
    //   config.headers['X-Token'] = getToken()
    // }
    const token = apiInfo.access_token
    if (token) {
      config.params.access_token = token
      config.data = config.data || {}
      config.data.access_token = token
    }
    // console.log(token)
    return config
  }

  handleSuccess(response) {
    return response
    // const res = response.data
    // if (res.code === 801) {
    //   message.error(res.msg)
    //   // todo 这里的跳转在正式线上需要做改变，需要跳转到vue项目的login页面，或者在钉钉容器中做重新免登
    //   // history.push('/')
    //   window.location.href = `${GLOBAL.ENTERPRISE_HOST}/#/index-auth-login?source=login`
    //   return Promise.reject('error')
    // }
    // if (res.status === 200) {
    //   // 50008:非法的token; 50012:其他客户端登录了;  50014:Token 过期了;
    //   if (res.code === 50008 || res.code === 50012 || res.code === 50014) {
    //     // 请自行在引入 MessageBox
    //     // import { Message, MessageBox } from 'element-ui'
    //   }
    //   return Promise.reject('error')
    // } else {
    //   return response
    // }
  }

  handleError(error) {
    if (__IS_BROWSER) {
      Loading.hide()
      if (error.response && error.response.status === 401) {
        const res = error.response.data
        if (res.code === 'enterpriseapi.2001') {
          dd.postMessage({
            msg: 'invalidToken'
          })
        }
      } else if (error.response) {
        console.log('lalal')
        const errCode = error.response.data.code
        Modal.alert({
          title:        'ERROR',
          content:      `${errorInfo[errCode].content}`,
          clickHandler: () => {
            // if (typeof dd !== 'undefined') {
            //   dd.postMessage({
            //     msg: 'serverErr'
            //   })
            // }
          }
        })
        // store.dispatch('createAlert', { type: 'success', message: '内部错误' })
      }
      // if (res.code === 'crawler.005') {
      //   store.dispatch('createAlert', { type: 'success', message: '当前链接不支持添加' })
      // }
    }
    return Promise.reject(error)
  }

  get({ url = '', params = {} }) {
    // this.request.get(url)
    return this.request.request({
      url,
      params,
      method:       'get',
      responseType: 'json'
    })
  }

  post({ url = '', params = {}, data = {} }) {
    return this.request.request({
      url,
      data,
      params,
      method:       'POST',
      responseType: 'json'
    })
  }
}

const httpRequest = {
  requestBody: new Request(),
  formData:    new Request({ type: 'formData' })
}

export default httpRequest.requestBody
export const formDataRequest = httpRequest.formData
