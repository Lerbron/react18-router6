import API from './api'
import http from '@/utils/http'
import request from "@/utils/request";

export const getNews= params => http.get(API.GET_NEWS, {params})

export const getDetail= params => http.get(API.GET_DETAIL.replace('${id}', params.id))

export const requestNews= data => request({
  url: API.GET_NEWS,
  data,
  interceptors: {
    requestInterceptors: config => {
      console.log('！！！！！！！！！！！接口请求拦截器！！！！！！！！！！！')
      return config
    },
    responseInterceptors: result => {
      console.log('！！！！！！！！！！！接口响应拦截器！！！！！！！！！！！')
      return result.data
    },
    responseInterceptorsCatch: err => {
      console.log('-------接口 responseInterceptorsCatch -----')
    },
    requestInterceptorsCatch: err => {
      console.log('---接口 requestInterceptorsCatch------')
    }
  }
})



export const requestDetail = data => request({
  url: API.GET_DETAIL.replace('${id}', data.id),
  // canRepeat: true,
})