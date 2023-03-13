import axios, { CancelToken } from "axios";


export default class Request {
  instance= null;
  interceptorsObj= undefined;
  cancelTokenMap= new Map();
  constructor(config= {}) {
    this.instance= axios.create(config);
    this.interceptorsObj= config.interceptors

    // 全局请求拦截器
    this.instance.interceptors.request.use(
      (config) => {
        console.log('=====全局请求拦截器======', config)
        let {
          canRepeat,
          url,
          method
        }= config
        
        // 处理同一时间的重复请求   canRepeat 同一个接口响应未回来时，是否取消重复请求
        if (!canRepeat) {
          const key = url + '&' + method;
          this.cancelTokenMap.has(key) && this.cancelTokenMap.get(key)('The operation is too frequent~')
          config.cancelToken = new CancelToken((c) => {
            this.cancelTokenMap.set(key, c)
          });
        }

        return config
      },
      err => Promise.reject(err),
    )

    // 实例请求拦截器
    this.instance.interceptors.request.use(
      this.interceptorsObj?.requestInterceptors,
      this.interceptorsObj?.requestInterceptorsCatch,
    )

    // 全局响应拦截器
    this.instance.interceptors.response.use(
      result => {
        console.log('============全局响应拦截器============')
        let { config }= result
        let { method, url }= config
        const key = url + '&' + method;
        this.cancelTokenMap.has(key) && this.cancelTokenMap.delete(key)
        return result
      },
      err => {
        console.log('---全局err-----', err)
        return Promise.reject(err)
      }
    )

    // 实例响应拦截器
    this.instance.interceptors.response.use(
      this.interceptorsObj?.responseInterceptors,
      this.interceptorsObj?.responseInterceptorsCatch,
    )

  }

  request(config) {
    return new Promise((resolve, reject) => {
      // 如果我们为单个请求设置拦截器，这里使用单个请求的拦截器
      if (config.interceptors?.requestInterceptors) {
        config = config.interceptors.requestInterceptors(config)
      }

      this.instance.request(config)
        .then(res => {
          // 如果我们为单个响应设置拦截器，这里使用单个响应的拦截器
          if (config.interceptors?.responseInterceptors) {
            res = config.interceptors.responseInterceptors(res)
          }

          resolve && resolve(res)
        })
        .catch((err) => {
          if (config.interceptors?.responseInterceptorsCatch) {
            config.interceptors.responseInterceptorsCatch(err)
          }
          reject && reject(err)
        })

    })
  }

  cancelAllRequest() {
    for (const [, cancelToken] of this.cancelTokenMap) {
      cancelToken('cancel all request')
    }
    this.cancelTokenMap.clear()
  }
}