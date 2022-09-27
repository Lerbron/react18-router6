import * as actionTypes from './actionTypes'
import { store } from '@/App'

export const add= (payload= 1) => {
  store.dispatch({
    type: actionTypes.ADD,
    payload: payload
  })
}
