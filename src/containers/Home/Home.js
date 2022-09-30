import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux'
import { increment, incrementByAmount } from '@/store/modules/counter'
import { getHomeList, getUserInfo } from '@/store/modules/test'
import { Button, DatePicker } from 'antd'
 
export default () => {
  const navigate= useNavigate()
  const dispatch= useDispatch()
  const { count } = useSelector(state => state.counter)
  const { listInfo, userInfo } = useSelector(state => state.test)
  const [page, setPage]= useState(1)


  const renderList= () => {
    let { items }= listInfo
    return items?.length > 0 && items?.map(item => {
      return <div key={item.id} onClick={()=>goDetail(item.id)}>
        <div>{item?.title}</div>
      </div>
    })
  }

  const goDetail= (id) => {
    navigate(`/page/${id}`)
  }

  const onAdd= () => {
    dispatch(increment())
  }

  const onAddByPayload= () => {
    dispatch(incrementByAmount(3))
  }

  const _getNews= () => {
    let params= {
      limit: 20,
      page
    }
    dispatch(getHomeList(params))
  }

  const onNext= () => {
    setPage(page => page + 1)
  }


  useEffect(() => {
    console.log('count----->', count)
  }, [count])

  useEffect(() => {
    console.log('listInfo---->', listInfo)
  }, [listInfo])

  useEffect(() => {
    dispatch(getUserInfo(6))
  }, [])


  useEffect(() => {
    _getNews()
  }, [page])


  return <div>
    Home Page
    <br />
    count: {count}
    <button onClick={onAdd}>count add</button>
    <br />
    <button onClick={onAddByPayload}>add by 3</button>
    <br />
    {renderList()}
    <button onClick={onNext}>next</button>
    <br />
    userId: {userInfo?.userId}<br />
    name: {userInfo?.name}<br />
    age: { userInfo?.age}
    <br />

    <Button type="primary">antd button</Button>
    <DatePicker />
  </div>
}