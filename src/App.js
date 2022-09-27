import React, { useState, useEffect } from "react";
import router from "@/router/index";
import { RouterProvider } from 'react-router-dom'

import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import thunkMiddleware from "redux-thunk";
import reducers from "@/reducers/index";


export const store = createStore(reducers, applyMiddleware(thunkMiddleware));

function App() {

  return (
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  );
}

export default App;
