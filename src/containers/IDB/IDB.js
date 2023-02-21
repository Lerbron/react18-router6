import React, { memo, useEffect } from "react";
import IDB from '@/utils/IDBUtil'


export default memo(props => {

  useEffect(() => {
    // IDB.readAll('LIST')
    //   .then(result => {
    //     console.log('result--->', result)

        // IDB.add('LIST', {order: 1, name: 'bruce'})
        //   .then(res => {
        //     console.log('res=====>', res)
        //   })
      // })

      // IDB.getDataByKey('LIST', 1)
      //   .then(result => {
      //     console.log('getDataByKey result--->', result)
      //   })


      // IDB.update('LIST', {order: 1, name: 'Lee'})
      //   .then(result => {
      //     console.log('update--->', result)
      //   })

    IDB.deleteStore('LIST')
      .then(res => {
        console.log('clearStore-->', res)
      })

  }, [])

  return (
    <div>indexeddb</div>
  )
})