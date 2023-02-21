import React from "react";
import Home from "@/containers/Home";
import Page1 from "@/containers/Page1";
import Login from "@/containers/Login";
import List from '@/containers/List'
import NotFound from "@/containers/NotFound";
import Graph from "@/containers/Graph";
import Editor from "@/containers/Editor";
import IDB from "@/containers/IDB";
import DPlayer from "@/containers/DPlayer/DPlayer";

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
    path: 'editor',
    element: Editor
  },
  {
    path: '/idb',
    element: IDB
  },
  {
    path: '/player',
    element: DPlayer
  },
  {
    path: '/404',
    element: NotFound
  }
]

export default routes