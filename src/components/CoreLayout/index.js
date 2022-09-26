import React, { memo} from "react";
import { Outlet } from "react-router-dom";

const CoreLayout= memo(props => {
  return (
    <div className="core-layout">
      <Outlet />
    </div>
  )
})


export default CoreLayout