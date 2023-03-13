import Request from "./request";
import Qs from 'qs'


const requestInstance= new Request({
  interceptors: {
    // 请求拦截器
    requestInterceptors: config => {
      console.log('----实例请求拦截器------')
      return config
    },

    requestInterceptorsCatch: err => {
      console.log('====实例 requestInterceptorsCatch====')
      return err
    },
    // 响应拦截器
    responseInterceptors: (result) => {
      console.log('----实例响应拦截器------')
      return result?.data
    },

    responseInterceptorsCatch: err => {
      console.log('=========实例 responseInterceptorsCatch=========', err)
      let errResponse= err?.response??{}

      if (errResponse?.status === 404) {
        console.log('err 404')
      }

      return Promise.reject(errResponse)
    }
  },
  paramsSerializer: function (params) {
    return Qs.stringify(params, {
      arrayFormat: 'repeat'
    })
  }
})


const request= config => {
  let { method='get' }= config

  method= method.toLocaleLowerCase()
  if (method === 'get') {
    config.params = config.data
  }

  return requestInstance.request(config)
}


export const cancelAllRequest= () => {
  return requestInstance.cancelAllRequest()
}


export default request