import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux'
import { increment, incrementByAmount } from '@/store/modules/counter'
import { getHomeList, getUserInfo } from '@/store/modules/test'
import { Button, DatePicker } from 'antd'

import AutoHeightInput from "@/components/Form/AutoHeightInput";
import MultipleLinesText from "../../components/MultipleLinesText";

import './index.scss'

export default () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { count } = useSelector(state => state.counter)
  const { listInfo, userInfo } = useSelector(state => state.test)
  const [page, setPage] = useState(1)
  const [defaultValue, setDefaultValue] = useState('')


  const renderList = () => {
    let { items } = listInfo
    return items?.length > 0 && items?.map(item => {
      return <div key={item.id} onClick={() => goDetail(item.id)}>
        <div>{item?.title}</div>
      </div>
    })
  }

  const goDetail = (id) => {
    navigate(`/page/${id}`)
  }

  const onAdd = () => {
    dispatch(increment())
  }

  const onAddByPayload = () => {
    dispatch(incrementByAmount(3))
  }

  const _getNews = () => {
    let params = {
      limit: 20,
      page
    }
    dispatch(getHomeList(params))
  }

  const onNext = () => {
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
    setTimeout(() => {
      setDefaultValue('dkjfak的咖啡机的咖啡机哦发的的咖啡机的苦dadklf d打卡发达的房间啊抖啊减肥fdalkf 的拉风')
    }, 3000)
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
    age: {userInfo?.age}
    <br />

    <Button type="primary">antd button</Button>
    <DatePicker />

    <AutoHeightInput
      placeholder='请输入内容'
      defaultValue={defaultValue}

    />
    <MultipleLinesText
      lines="5"
      content='浮动元素是如何定位的正如我们前面提到的那样，当一个元素浮动之后，它会被移出正常的文档流，然后向左或者向右平移，一直平移直到碰到了所处的容器的边框，或者碰到另外一个浮动的元素。在下面的图片中，有三个红色的正方形。其中有两个向左浮动，一个向右浮动。要注意到第二个向左浮动的正方形被放在第一个向左浮动的正方形的右边。如果还有更多的正方形这样浮动，它们会继续向右堆放，直到填满容器一整行，之后换行至下一行。浮动元素是如何定位的正如我们前面提到的那样，当一个元素浮动之后，它会被移出正常的文档流，然后向左或者向右平移，一直平移直到碰到了所处的容器的边框，或者碰到另外一个浮动的元素。在下面的图片中，有三个红色的正方形。其中有两个向左浮动，一个向右浮动。要注意到第二个向左浮动的正方形被放在第一个向左浮动的正方形的右边。如果还有更多的正方形这样浮动，它们会继续向右堆放，直到填满容器一整行，之后换行至下一行。 浮动元素是如何定位的正如我们前面提到的那样，当一个元素浮动之后，它会被移出正常的文档流，然后向左或者向右平移，一直平移直到碰到了所处的容器的边框，或者碰到另外一个浮动的元素。在下面的图片中，有三个红色的正方形。其中有两个向左浮动，一个向右浮动。要注意到第二个向左浮动的正方形被放在第一个向左浮动的正方形的右边。如果还有更多的正方形这样浮动，它们会继续向右堆放，直到填满容器一整行，之后换行至下一行。浮动元素是如何定位的正如我们前面提到的那样，当一个元素浮动之后，它会被移出正常的文档流，然后向左或者向右平移，一直平移直到碰到了所处的容器的边框，或者碰到另外一个浮动的元素。在下面的图片中，有三个红色的正方形。其中有两个向左浮动，一个向右浮动。要注意到第二个向左浮动的正方形被放在第一个向左浮动的正方形的右边。如果还有更多的正方形这样浮动，它们会继续向右堆放，直到填满容器一整行，之后换行至下一行。'
    />
  </div>
}