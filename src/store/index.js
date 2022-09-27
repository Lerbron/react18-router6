import React from 'react'
import { configureStore } from '@reduxjs/toolkit'

const modulesFile= require.context('./modules', true, /\.js/)

const reducer= modulesFile.keys().reduce((modules, modulePath) => {
  const moduleName = modulePath.replace(/^.\/(.*)\.js/,'$1')
  return {...modules, [`${moduleName}`]: modulesFile(modulePath).default}
},{})

export default configureStore({
  reducer,
})