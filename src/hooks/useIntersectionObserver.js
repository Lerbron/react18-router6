import React, { useEffect } from "react";


export default function useIntersectionObserver({
  getDom= () => null,
  intersectionCallback= () => {},
  options={}
}) {
  useEffect(() => {
    let dom= getDom(), observer= null
    if (dom) {
      options = options || {};
      observer = new IntersectionObserver(([entry]) => {
        if (entry && entry.isIntersecting) {
          console.log('entery----->', entry)
          intersectionCallback && intersectionCallback(entry)
        }
      }, options);
  
      observer.observe(dom);
    }
    return () => {
      observer && observer.disconnect()
    }
  }, [intersectionCallback])
}