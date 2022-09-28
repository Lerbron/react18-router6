import axios, { CancelToken } from 'axios';
import Qs from 'qs'


export const pendingReq = {};


const http = axios.create({
  // baseURL: window.app.PC_SERVICE_BASE_URL,
  paramsSerializer: function (params) {
    return Qs.stringify(params, {
      arrayFormat: 'repeat'
    })
  }
});

http.interceptors.request.use(config => {

  // 频繁操作时，取消同一个接口的前一次请求
  const key = config.url + '&' + config.method;
  pendingReq[key] && pendingReq[key]('The operation is too frequent~');
  config.cancelToken = new CancelToken((c) => {
    pendingReq[key] = c;
  });

  return config;
}, (error) => {
  // 对请求错误做些什么
  console.log('err:', error)
  return Promise.reject(error);
});

http.interceptors.response.use(response => {
  const key = response.config.url + '&' + response.config.method;
  pendingReq[key] && delete pendingReq[key];
  return response
}, err => {
  let errResponse = err?.response??{}
  console.log('errObj:', errResponse)
  return Promise.reject(errResponse);

})
export default http