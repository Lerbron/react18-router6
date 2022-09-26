import React from "react";
import { useNavigate, useParams } from "react-router-dom";
 
export default () => {
  const navigate= useNavigate()
  const {id}= useParams()
  console.log('params id ====>', id)
  const goback= () => {
    navigate(-1)
  
  }

  return <div>
    Page id: {id}
    <button onClick={goback}>Back home</button>
  </div>
}