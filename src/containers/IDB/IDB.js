import React, { memo, useEffect } from "react";
import IDB from '@/utils/IDBUtil'


export default memo(props => {

  useEffect(() => {
    // IDB.readAllData('LIST')
    //   .then(result => {
    //     console.log('result--->', result)

    //   })
      IDB.addData('LIST', {order: 1, name: 'bruce', 'id': '0x001'})
        .then(res => {
          console.log('res=====>', res)
        })
      
      // IDB.addData('LIST', {order: 2, name: 'frank', 'id': '0x002'})
      //   .then(res => {
      //     console.log('res=====>', res)
      //   })
      // IDB.addData('LIST', {order: 4, name: 'Han', 'id': '0x004'})
      //   .then(res => {
      //     console.log('res=====>', res)
      //   })

      // IDB.addData('PEOPLE', {name: 'Bee', 'id': '0x001'})
      //   .then(res => {
      //     console.log('res=====>', res)
      //   })

      // IDB.getDataByKey('LIST', 1)
      //   .then(result => {
      //     console.log('getDataByKey result--->', result)
      //   })

      // IDB.getDataByIndex('LIST', 'id', '0x002')
      //   .then(result => {
      //     console.log('getDataByIndex result--->', result)
      //   })

      // IDB.getDataByIndexAndPage('LIST', 'id', '0x002', 1, 1)
      //   .then(result => {
      //     console.log('getDataByIndexAndPage result--->', result)
      //   })

      // IDB.getDataByPage('LIST', 2, 1)
      //   .then(result => {
      //     console.log('getDataByPage result--->', result)
      //   })




      // IDB.updateData('LIST', {order: 3, name: 'Lee', 'id': '0x003'})
      //   .then(result => {
      //     console.log('update--->', result)
      //   })

    // IDB.deleteData("LIST", 4)
    //   .then(res => {
    //     console.log('deleteData res===>', res)
    //   })
    // IDB.clearStore('PEOPLE')
    //   .then(res => {
    //     console.log('clearStore-->', res)
    //   })

    // IDB.clearAllStore()
    //   .then(res => {
    //     console.log('clearAllStore---', res)
    //   })

  }, [])

  return (
    <div>indexeddb</div>
  )
})