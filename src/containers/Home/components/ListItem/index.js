import React, { memo, useRef } from "react";
import { useNavigate } from "react-router-dom";
import useResizeObserver from "@/hooks/useResizeObserver";

import './index.scss'

export default memo(props => {
  let { data }= props
  console.log('item------>')
  const navigate= useNavigate()
  const domRef= useRef(null)

  // const getDom= () => domRef.current
  // const observerFunc= data => {
  //   console.log('data--->', data?.contentRect?.height)
  // }

  // useResizeObserver(getDom, observerFunc)

  const goDetail= (id) => {
    navigate(`/page/${id}`)
  }

  return (
    <div ref={domRef} className="item-container" key={data.id} onClick={()=>goDetail(data.id)}>
      <div>{data?.title}</div>
      <div dangerouslySetInnerHTML={{__html: data.content}} />
    </div>
  )
})
