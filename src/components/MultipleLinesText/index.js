import React, { memo, useMemo, useState } from "react";
import { v4 as uuidv4 } from 'uuid';

import './index.scss'

export default memo(props => {
  let {
    lines= 3,
    content= '',
    unfoldText= 'Read more',
    foldText= 'Pick up'
  }= props

  const [checked, setChecked]= useState(false)
  const id= useMemo(() => uuidv4(), [])

  const onChange = e => {
    setChecked(e.target.checked)
  }

  return (
    <div className="wrapper">
      <input id={id} className="exp" type="checkbox" onChange={onChange} />
      <div className="text" line-clamp={lines}>
        {!checked && <label className="btn" htmlFor={id} unfold-text={unfoldText} fold-text={foldText}></label>}
        {content}
        {checked && <label className="btn fold-btn" htmlFor={id} unfold-text={unfoldText} fold-text={foldText}></label>}
      </div>
    </div>
  )
})