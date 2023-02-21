import React, { memo, useEffect, useState } from "react";

import CalcWorker from '@/workers/calc.worker'

export default memo(props => {

  const [result, setResult]= useState(0)

  useEffect(() => {
    const calcWorker = new CalcWorker();
    calcWorker.postMessage(1000000000)
    calcWorker.onmessage = (e) => {
      setResult(e.data)
      // 关闭worker线程
      calcWorker.terminate()
    }
  }, [])

  return (
    <>
      <div>Test Web Worker</div>
      <div>calculate 1 ~ 10 result: {result}</div>
    </>
  )
})