import React, { useEffect } from "react";

export default function useResizeObserver(getDom = () => null, observerFunc= () => {}) {

  useEffect(() => {
    let resizeObserver= null
    let dom= getDom()
    console.log('dom---->', dom)
    if(dom) {
      resizeObserver = new ResizeObserver(entries => {
        console.log('entries----->', entries)
        for (let entry of entries) {
          observerFunc && observerFunc(entry)
        }
      });
      if (dom instanceof Array && dom.length > 0) {
        dom.forEach(el => {
          resizeObserver.observe(el)
        });
      } else {
        resizeObserver.observe(dom)
      }
    }
    return () => {
      resizeObserver && resizeObserver.unobserve(dom)
    }
  }, [])
}