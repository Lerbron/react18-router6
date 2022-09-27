import React, { memo, useEffect } from "react";
import { Outlet } from "react-router-dom";
import { connect } from "react-redux";


const CoreLayout= memo(props => {

  return (
    <div className="core-layout">
      <Outlet />
    </div>
  )
})


const mapStateToProps = (state, ownProps) => {
  return {
   
  }
}


export default connect(mapStateToProps, null)(CoreLayout)