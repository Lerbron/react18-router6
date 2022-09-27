import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux'
import { decrement } from '@/store/modules/counter'
 
export default () => {
  const navigate= useNavigate()
  const count= useSelector(state => state.counter.count)
  const dispatch= useDispatch()

  const {id}= useParams()
  console.log('params id ====>', id)

  const goback= () => {
    navigate(-1)
  
  }

  const onDecrement= () => {
    dispatch(decrement())
  }

  return <div>
    Page id: {id}<br />
    count: {count}
    <button onClick={onDecrement}>decrement</button>
    <button onClick={goback}>Back home</button>
  </div>
}