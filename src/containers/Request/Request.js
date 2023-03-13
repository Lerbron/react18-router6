import React, { memo, useEffect } from "react";
import { requestNews, requestDetail } from '@/service/servers'
import { cancelAllRequest } from "@/utils/request";

import { Button } from "antd";


export default memo(props => {

  const getDetail= () => {
    requestDetail({id: '639ebb35f0ccae2b10e0fb64'})
    .then(res => {
      console.log('res detail=======>', res)
    })
  }

  const getNews= () => {
    let params = {
      limit: 20,
      page: 1
    }
    requestNews(params)
      .then(result => {
        console.log('requestNews result====>', result)
      }, err => {
        console.log('requestNews err =======>', err)
      })
  }

  const cancelAll= () => {
    cancelAllRequest()
  }

  useEffect(() => {
    getNews()
    // getDetail()
    
  }, [])

  return(
    <>
      <div>test request page</div>
      <Button onClick={getDetail}>FETCH DETAIL</Button><br></br>
      <Button onClick={cancelAll}>CANCEL ALL</Button>

    </>
  )
})