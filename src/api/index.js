import axios from 'axios'
// import store from '@/store'
import notification from 'ant-design-vue/es/notification'
// import { VueAxios } from './axios' // ?

// 创建 axios 实例
const request = axios.create({
  // API 请求的默认前缀
  baseURL: process.env.VUE_APP_BASE_URL,
  timeout: 15000 // 请求超时时间
})

// 异常拦截处理器
const errorHandler = (error) => {
  if (error.response) {
    const data = error.response.data
    // 从 localstorage 获取 token
    if (error.response.status === 403) {
      notification.error({
        message: 'Forbidden',
        description: data.message
      })
    }
    if (error.response.status === 401 ) {
    //  
    }
    if (error.response.status === 500) {
      notification.error({
        message: '错误',
        description: '服务器内部错误，请联系管理员！'
      })
    }
  }
  return Promise.reject(error)
}




// request interceptor 请求拦截
request.interceptors.request.use(config => config, errorHandler)

// response interceptor  响应拦截
request.interceptors.response.use((response) => {
  return response.data
}, errorHandler)

// const installer = {
//   vm: {},
//   install (Vue) {
//     Vue.use(VueAxios, request)
//   }
// }

/**
 * @method get
 * @param url 请求的url
 * @param params 请求携带的参数
 */
function get(url, params) {
    return request({
      url,
      method: 'get',
      params
    });
  }
  /**
   * @method post
   * @param url 请求的url
   * @param params 请求携带的参数
   */
  function post(url, data) {
    return request({
      url,
      method: 'post',
      data
    });
  }
  
export { get, post };
export default request

// export {
//   installer as VueAxios,
//   request as axios
// }

