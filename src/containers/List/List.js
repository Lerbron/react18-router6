import React, { memo, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getHomeList } from '@/store/modules/test'

import VirtualList from "@/components/VirtualList";
import ListItem from "@/containers/Home/components/ListItem";


import './index.scss'

export default memo(props => {

  const dispatch= useDispatch()
  const { listInfo } = useSelector(state => state.test)
  let { page, hasMore, status }= listInfo

  const getNews= useCallback(() => {
    if (status == 'pending') return null
    let params= {
      limit: 20,
      page: page
    }
    dispatch(getHomeList(params))
  }, [page, hasMore, status])

  return (
    <div className="list-container">
      <VirtualList
        dataSource={listInfo?.items||[]}
        renderItem={data => <ListItem data={data} />}
        loadMore={getNews}
        hasMore={hasMore}
        isLoading={status == 'pending'}
      />
    </div>
  )
})