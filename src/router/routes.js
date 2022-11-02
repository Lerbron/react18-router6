import React from "react";
import Home from "@/containers/Home";
import Page1 from "@/containers/Page1";
import Login from "@/containers/Login";
import List from '@/containers/List'
import NotFound from "@/containers/NotFound";
import Graph from "@/containers/Graph";

const routes= [
  {
    path: '/',
    element: Home,
  },
  {
    path: '/page/:id',
    element: Page1,
    meta: {
      requireAuth: true
    }
  },
  {
    path: '/list',
    element: List
  },
  {
    path: '/login',
    element: Login
  },
  {
    path: '/graph',
    element: Graph
  },
  {
    path: '/404',
    element: NotFound
  }
]

export default routes