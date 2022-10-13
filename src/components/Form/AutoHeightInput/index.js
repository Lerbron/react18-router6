import React, { memo, useRef, useEffect } from "react";

import './index.scss'

export default memo(props => {

  let {
    placeholder= '请输入',
    defaultValue= '',
    ...restProps
  }= props

  const ref = useRef(null)
  const offsetHeightRef = useRef(0)
  const mountedRef= useRef(false)


  const onInput = e => {
    const event = e || window.event
    const target = event.target || event.srcElement
    target.style.height = ''
    target.style.height = target.scrollHeight + offsetHeightRef.current + 'px'
  }


  const getOffsetHeight = () => {
    const attrs = ['box-sizing', 'padding-top', 'padding-bottom', 'border-top', 'border-bottom']

    const style = window.getComputedStyle(ref.current)
    const [boxSizing, paddingTop, paddingBottom, borderTop, borderBottom] = attrs.map(item => style.getPropertyValue(item))
    if (boxSizing === 'content-box') {
      offsetHeightRef.current = -(parseFloat(paddingTop)) - parseFloat(paddingBottom)
    } else {
      offsetHeightRef.current = parseFloat(borderTop) + parseFloat(borderBottom)
    }
  }


  useEffect(() => {
    getOffsetHeight()
    let dom = ref.current
    dom.addEventListener('input', onInput, false)
    mountedRef.current= true
    return () => {
      dom.removeEventListener('input', onInput, false)
    }
  }, [])


  useEffect(() => {
    if (mountedRef.current) {
      ref.current.value= defaultValue
      ref.current.style.height= ref.current.scrollHeight + offsetHeightRef.current + 'px'
    }
  }, [defaultValue])

  return (
    <textarea
      className="auto-height-input"
      ref={ref}
      placeholder={placeholder}
      defaultValue={defaultValue}
      {...restProps}
    />
  )
})