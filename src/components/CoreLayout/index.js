import React, { memo, useEffect } from "react";
import { Outlet } from "react-router-dom";
import { connect } from "react-redux";
import { add } from "@/actions/testActions";


const CoreLayout= memo(props => {
  let {
    num 
  }= props
  const onAdd= () => {
    add()
  }
  return (
    <div className="core-layout">
      <Outlet />
      {num}
      <button onClick={onAdd}>add</button>
    </div>
  )
})


const mapStateToProps = (state, ownProps) => {
  return {
    num: state.test.num
  }
}


export default connect(mapStateToProps, null)(CoreLayout)