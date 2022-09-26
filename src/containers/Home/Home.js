import React from "react";
import { useNavigate } from "react-router-dom";
 
export default () => {
  const navigate= useNavigate()
  const goPage1= () => {
    navigate('/page/1?title=111')
  
  }
  return <div>
    Home Page
    <button onClick={goPage1}>To page1</button>
  </div>
}