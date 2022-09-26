import React, { useState, useEffect } from "react";
import AppRouter from "@/router/index";

import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import thunkMiddleware from "redux-thunk";
import reducers from "@/reducers/index";


export const store = createStore(reducers, applyMiddleware(thunkMiddleware));

function App() {

  return (
    <Provider store={store}>
      <AppRouter />
    </Provider>
  );
}

export default App;
