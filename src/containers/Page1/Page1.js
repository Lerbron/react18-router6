import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux'
import { decrement } from '@/store/modules/counter'
import { getDetail } from "@/service/servers";

 
export default () => {
  const navigate= useNavigate()
  const count= useSelector(state => state.counter.count)
  const dispatch= useDispatch()
  const [detailInfo, setDetailInfo]= useState(null)

  const {id}= useParams()

  const goback= () => {
    navigate(-1)
  }

  const onDecrement= () => {
    dispatch(decrement())
  }


  useEffect(() => {
    getDetail({id})
      .then(res => {
        console.log('getDetail res====>', res)
        let detailInfo= res?.data?.data||{}
        setDetailInfo(detailInfo)
      })
  }, [])

  return <div>
    Page id: {id}<br />
    count: {count}
    <button onClick={onDecrement}>decrement</button>
    <button onClick={goback}>Back home</button>
    <div>{detailInfo?.title}</div>
    <div dangerouslySetInnerHTML={{__html: detailInfo?.content}}/>
  </div>
}