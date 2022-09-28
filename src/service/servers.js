import API from './api'
import http from '@/utils/http'

export const getNews= params => http.get(API.GET_NEWS, {params})

export const getDetail= params => http.get(API.GET_DETAIL.replace('${id}', params.id))