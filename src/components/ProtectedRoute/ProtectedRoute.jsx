import React from 'react'
import { Navigate } from 'react-router-dom';

export default function ProtectedRoute(myProps) {
  if (localStorage.getItem("userToken") !== null) {
    return myProps.children;
  }else {
    return <Navigate to='/signin'/>
  }
  
}
