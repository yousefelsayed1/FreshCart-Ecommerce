import React, { useContext, useEffect } from 'react'
import Navbar from '../Navbar/Navbar'
import { Outlet } from 'react-router-dom'
import { userContext } from '../../context/TokenContext';
import Footer from '../Footer/Footer';
import ProtectedRoute from './../ProtectedRoute/ProtectedRoute';



export default function MasterLayout() {

  let {setToken} = useContext(userContext);
  
  useEffect(()=> {
    if(localStorage.getItem("userToken") !== null){
      setToken(localStorage.getItem("userToken"))
    }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div>

    <Navbar/>
    <div className="container">
      <Outlet/>
    </div>
      <ProtectedRoute><Footer/></ProtectedRoute> 
  {/*     <Helmet>
                <meta charSet="utf-8" />
                <meta name='description' content='Explore FreshCart for farm-fresh produce, groceries, and more. Shop now for quality ingredients!' />
                <title>Fresh Cart Home</title>
            </Helmet> */}
    </div>
  )
}
