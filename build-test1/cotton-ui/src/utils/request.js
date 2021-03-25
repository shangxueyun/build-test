import axios from 'axios'
import { Notification, MessageBox, Message } from 'element-ui'
import store from '@/store'
import { getToken } from '@/utils/auth'
import qs from 'qs'

axios.defaults.headers['Content-Type'] = 'application/json;charset=utf-8'
// 创建axios实例
const service = axios.create({
  // axios中请求配置有baseURL选项，表示请求URL公共部分
  baseURL: process.env.VUE_APP_BASE_API,
  // 超时
  timeout: 100000
})
// request拦截器
service.interceptors.request.use(
  config => {
    if (config.url.search('Yapi') > -1)
    config.baseURL = ''
    // 请求类型参数解析
    if (config.method == 'get' || config.method == 'GET' || config.method == 'Get') {
      if (!config.url.includes('?') || !config.url.includes('&')) {
        if (config.data) {
          config.url += '?' + qs.stringify(config.data)
        }
      }
    }

    if (getToken()) {
      config.headers['Authorization'] = 'Bearer ' + getToken() // 让每个请求携带自定义token 请根据实际情况自行修改
    }
    return config
  },
  error => {
    console.log(error)
    Promise.reject(error)
  }
)

service.HostUrlYapi = () => {
  return process.env.NODE_ENV === 'development' ? '' : ''
}
// 响应拦截器
service.interceptors.response.use(res => {
    // 文件跳转携带权限key
    window.sessionStorage.setItem('Authorization', res.config.headers.Authorization)
    
    const code = res.data.code
    if (code === 401) {
      MessageBox.alert('登录状态已过期，您可以继续留在该页面，或者重新登录','系统提示', {
        confirmButtonText: '重新登录',
        type: 'warning',
        callback: action => {
          store.dispatch('LogOut').then(() => {
            location.reload() // 为了重新实例化vue-router对象 避免bug
          })
        }
      })
    } else {
      return res.data
    }
  },
  error => {
    console.log('err' + error)
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

export default service
