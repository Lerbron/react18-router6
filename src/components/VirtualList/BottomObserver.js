import React, { memo, useRef, useCallback } from "react";
import useIntersectionObserver from '@/hooks/useIntersectionObserver'

export default memo(props => {
  let { reachBottom }= props

  const domRef= useRef(null)
  const getDom= () => domRef.current

  const intersectionCallback= useCallback((data) => {
    console.log('intersectionCallback--->', data.isIntersecting)
    reachBottom && reachBottom()
  }, [reachBottom])

  useIntersectionObserver({getDom, intersectionCallback})

  return (
    <div ref={domRef} style={{height: '1px'}}></div>
  )
})