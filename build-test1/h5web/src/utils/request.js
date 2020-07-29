import axios from 'axios'

// axios.defaults.headers['Content-Type'] = 'application/json;charset=utf-8'
// 创建axios实例
const service = axios.create({
  // 超时
  timeout: 100000
})
// request拦截器
service.interceptors.request.use(
  config => {
    // 添加全局openid
    config.headers = {
      openID: localStorage.openID
    }
    return config
  },
  error => {
    console.log(error)
    Promise.reject(error)
  }
)

// 响应拦截器
service.interceptors.response.use(res => {
    
    return res.data
  },
  error => {
    console.log('err' + error)
    return Promise.reject(error)
  }
)

export default service
