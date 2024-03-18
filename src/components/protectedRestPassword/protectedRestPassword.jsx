import React from 'react'
import { Navigate } from 'react-router-dom';
export default function ProtectedRestPassword(myProps) {
  if (localStorage.getItem("code") !== null && localStorage.getItem("verifycode") !== null) {
    return myProps.children;
  }else {
    return <Navigate to='/forgetpassword'/>
  }
}
