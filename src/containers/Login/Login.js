import React from "react";
import { useNavigate } from "react-router-dom";
import { getStorageRedirectUrl } from '@/utils/storages/userStorages'
import { Button } from "antd";
 
export default () => {
  const navigate= useNavigate()
  const onLogin= () => {
    localStorage.setItem('IS_LOGIN', "1")
    let url= getStorageRedirectUrl()
    navigate(url, { replace: true })
  }

  return <div>
    Login Page
    <Button type= 'primary' onClick={onLogin}>login</Button>
  </div>
}