import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table';
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';
import style from './Allorders.module.scss';
// import { userContext } from '../../context/TokenContext';
import { Oval } from 'react-loader-spinner';
import { Helmet } from 'react-helmet';



export default function Allorders() {
  localStorage.removeItem('code');
  localStorage.removeItem('verifycode');
  // const {decodeToken} = useContext( userContext)
  const[allOrders, setAllorders] = useState([]);
  const[isLoading, setLoading] = useState(true)


  function getUserOrders() {
    const userId = localStorage.getItem('userId');
    if(userId) {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/orders/user/${userId}`)
      .then((res)=> {
        // console.log(res.data)
      // res.data.map((order)=>{order.cartItems.map((product)=>{console.log(product)})})
        setAllorders(res.data);
        setLoading(false);
      })
      .catch((err)=> err)
    }

  }
  useEffect(()=>{
    (async()=> {
    await getUserOrders();
    })()
  }, [])

  
  return (
  <div className="container">
            <Helmet>
                <meta charSet="utf-8" />
                <meta name='description' content='An order overview page consolidates all order information.It displays details from order capture to fulfillment, payment, shipping, delivery, and service.' />
                <title>Your Orders</title>
            </Helmet>
      <div className={`py-5 p-md-5 ${style.mb6}`}>
                        <h2 className="mb-5">Your Orders</h2>
                        {!isLoading?
                      <div className="table-responsive">
                      <Table className="table mb-0 text-nowrap">
                          <Thead className="table-light">
                            <Tr>
                                <Th className={`${style.fs9} text-center`}>Product</Th>
                                {/* <th>&nbsp;</th> */}
                                <Th className={`${style.fs9} `}>Payment Method</Th>
                                <Th>&nbsp;</Th>
                                <Th className={`${style.fs9} text-center`}>Order Price</Th>
                                <Th className={`text-center ${style.fs9}`}>Details</Th>
                            </Tr>
                          </Thead>
                          {allOrders.length > 0 ?
                          
                          allOrders?.map((order, indx)=> {
                            return <Tbody className={`${style.fs9}`} key={indx}>
                              <Tr >
                                  <Td className="align-middle border-top-0 w-0">
                                  {order.cartItems.map((product, index)=>{
                                    return <div className='d-flex align-items-center' key={product._id}>
                                      <img src={product.product.imageCover} alt="Ecommerce" key={product._id} className="icon-shape icon-xxl d-block mb-2 align-middle " />
                                      <p key={index} className=' text-wrap ms-4 align-middle fw-bold '>{(product.product.title)}</p>
                                      </div> 
                                  })}
                                  </Td>
                                  <Td className="align-middle ">
                                    <h6 className={` ${style.fs9} text-center`}>{order.paymentMethodType}</h6>
                                  </Td>
                                  <Td></Td>
                                  <Td className="align-middle border-top-0 ">
                                  <h6 className={`text-main ${style.fs9} text-center`}>{order.totalOrderPrice}EGP</h6>
                                  </Td>
                                  <Td className="align-middle ">
                                  <p className='text-center'>This order is delivering to <br/><span className='text-main'>{order.shippingAddress.city}</span><br/> on phone number: <br/><span className='text-main'>{order.shippingAddress.phone}</span> </p>
                                  </Td>
                              </Tr>
                            </Tbody>
                            })
                        :
                        <Tbody>
                              <Tr className='text-main'>
                              <Td></Td>
                              <Td></Td>
                              <Td className='text-center text-main fs-5'> No orders!</Td>
                              <Td></Td>
                              <Td></Td>
                            </Tr>
                        </Tbody>
                      
                        }

                      </Table>
                    </div>
                          :
                          <div className=" vh-100 d-flex justify-content-center align-items-center">
                          <Oval
                        visible={true}
                        height="80"
                        width="80"
                        color="#4fa94d"
                        ariaLabel="oval-loading"
                        wrapperStyle={{}}
                        wrapperClass=""
                        />
                      </div>
                        }

      </div>
  </div>
  )
}
