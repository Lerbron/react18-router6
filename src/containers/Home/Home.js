import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux'
import { increment, incrementByAmount } from '@/store/modules/counter'
import { getHomeList, getUserInfo } from '@/store/modules/test'
 
export default () => {
  const navigate= useNavigate()
  const dispatch= useDispatch()
  const { count } = useSelector(state => state.counter)
  const { listInfo, userInfo } = useSelector(state => state.test)
  const goPage1= () => {
    navigate('/page/1?title=111')
  }
  const onAdd= () => {
    dispatch(increment())
  }

  const onAddByPayload= () => {
    dispatch(incrementByAmount(3))
  }

  useEffect(() => {
    console.log('count----->', count)
  }, [count])

  useEffect(() => {
    console.log('listInfo---->', listInfo)
  }, [listInfo])

  useEffect(() => {
    dispatch(getHomeList(4))
    dispatch(getUserInfo(5))
  }, [])

  return <div>
    Home Page
    <button onClick={goPage1}>To page1</button>
    count: {count}
    <button onClick={onAdd}>count add</button>
    <button onClick={onAddByPayload}>add by 3</button>
    <br />
    name: {userInfo?.name}<br />
    age: { userInfo?.age}
  </div>
}