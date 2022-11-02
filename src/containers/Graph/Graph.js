import React, { memo, useEffect, useRef } from "react";
import ForceGraph from "@/components/ForceGraph";
import { createData } from "../../components/ForceGraph/testData";

import './index.scss'

export default memo(props => {
  const domRef= useRef(null)
  useEffect(() => {
    let data= createData(30, 45)
    new ForceGraph({
      container: domRef.current,
      data,
      nodeValue: node => node.value,
      fillStyle: '',
      nodeClick: node => {
        alert(node.nodeLabel)
      }
      // centerNode: 5
      // fontStyle: 'green',
      // nodeLabel: node => node.label
    })
  }, [])
  return (
    <div ref={domRef} className='force-graph'></div>
  )
})