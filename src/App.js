import React from "react";
import router from "@/router/index";
import { RouterProvider } from 'react-router-dom'
import { Provider } from "react-redux";
// import { configureStore } from '@reduxjs/toolkit'
import store from "@/store";
import useThemeDynamic from "@/hooks/useThemeDynamic";

// export const store = configureStore({
//   reducer: reducers,
// })

function App() {
  useThemeDynamic()

  return (
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  );
}

export default App;
