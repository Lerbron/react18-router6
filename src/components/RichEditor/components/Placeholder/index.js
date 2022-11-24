import React, { memo } from "react";

import './index.scss'

export default memo(props => {
  let { placeholder }= props
  return (
    <div className="rich-editor-placeholder">{placeholder}</div>
  )
})