import React from "react";
import Home from "@/containers/Home";
import Page1 from "@/containers/Page1";
import Login from "@/containers/Login";

const routes= [
  {
    path: '/',
    element: Home,
  },
  {
    path: 'page/:id',
    element: Page1,
    meta: {
      requireAuth: true
    }
  },
  {
    path: '/login',
    element: Login
  }
]

export default routes