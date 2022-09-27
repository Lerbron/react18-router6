import React from "react";
import { Route, createBrowserRouter, createRoutesFromElements, Navigate } from "react-router-dom";
import routes from "./routes";
import AuthRouteElement from "./AuthRouteElement";
import CoreLayout from '@/components/CoreLayout'


const renderRoute= () => {
  return routes.map(route => {
    let { element: Element, meta, path, redirect } = route
    if (meta && meta.requireAuth) {
      return <Route key={path} path={path} element={<AuthRouteElement route={route} />} />
    }
    return (
      <Route key={path} path={path} element={<Element />} />
    )
  })
}

const router= createBrowserRouter(
  createRoutesFromElements(
    <Route element={<CoreLayout />}>
      {renderRoute()}
      <Route path='*' element={<Navigate to='/404' replace />} />
    </Route>
  )
)

export default router