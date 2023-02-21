import React from "react";
import {createRoot} from "react-dom/client";
import App from "./App";
import IDB from '@/utils/IDBUtil'

import '@/assets/styles/style.scss'

const container = document.getElementById("app");
const root = createRoot(container);
root.render(<App />);