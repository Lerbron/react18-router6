import React from "react";
import { BrowserRouter, Routes, Route, useRoutes } from "react-router-dom";
import routes from "./routes";
import AuthRouteElement from "./AuthRouteElement";

import CoreLayout from '@/components/CoreLayout'

const AppRouter = () => {

  const renderRoute = () => {
    return routes.map(route => {
      let { element: Element, meta, path } = route
      if (meta && meta.requireAuth) {
        return <Route key={path} path={path} element={<AuthRouteElement route={route} />} />
      }
      return (
        <Route key={path} path={path} element={<Element />} />
      )
    })
  }
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<CoreLayout />}>
          {renderRoute()}
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default AppRouter