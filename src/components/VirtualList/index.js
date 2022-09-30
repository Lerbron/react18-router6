import React, { memo, useCallback, useEffect, useRef } from "react";
import BottomObserver from "./BottomObserver";

export default memo(props => {
  let {
    dataSource= [],
    renderItem,
    loadMore,
    hasMore= true,
    initialLoad= true,
    isLoading,
    ...restProps
  }= props

  const reachBottom= useCallback(() => {
    if (hasMore) {
      loadMore && loadMore()
    }
  }, [hasMore, loadMore])

  useEffect(() => {
    if (initialLoad) {
      loadMore && loadMore()
    }
  }, [])


  const renderDataSource= () => {
    return dataSource instanceof Array && dataSource.length > 0 && dataSource?.map((data, idx) => (<li className="virtual-list-item" key={idx}>{renderItem(data)}</li>))
  }

  return (
    <div className="virtual-list-container">
      <ul className="virtual-list-wrap">
        {renderDataSource()}
      </ul>
      {isLoading && <div>loading...</div>}
      <BottomObserver reachBottom={reachBottom}/>
    </div>
  )
})