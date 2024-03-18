import React, { useContext, useEffect, useState} from 'react';
import style from './WishList.module.scss';
import { cartContext } from '../../context/CartContext';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Oval } from 'react-loader-spinner';
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table';
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';
import { Helmet } from 'react-helmet';


export default function WishList() {
  localStorage.removeItem('code');
  localStorage.removeItem('verifycode');
  
  let {getWishList, addToCart, setCartNumber, deleteWishList, setWishListNumber, setDataWishList, dataWishList} = useContext(cartContext)

  const[isLoading, setLoading] = useState(true)


  useEffect(()=> {
  (async ()=> {
      let data = await getWishList();
      // console.log(data.data.data)
      // if(data.status === 200) {
        setDataWishList(data.data.data);
        let wishNum = data.data.data.length;
        if(wishNum === 0) {
          wishNum = "";
        }
        setWishListNumber(wishNum);
      // }
      setLoading(false);
  })()
  })

  async function addToMyCart(id) {
    await addToCart(id)
  }

  async function removeProductWishList(id) {
    let data = await deleteWishList(id);
    // console.log(data.data.data.length);
    if(data.status === 200) {
      setDataWishList(data.data.data);
      let wishNum = data.data.data.length;
      if(wishNum === 0) {
        wishNum = "";
      }
      setWishListNumber(wishNum);
    }
    toast.error('Product removed from wishlist');
  }

  return (
    <div className={`mt-5 ${style.mb5}`}>
                  <Helmet>
                <meta charSet="utf-8" />
                <meta name='description' content='Explore your personalized wishlist. Save and curate your favorite items for future shopping!'/>
                <title>Wishlist</title>
            </Helmet>
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className='mb-5'>
            <h1 className="mb-1 fw-bold">My Wishlist</h1>
            {dataWishList.length >0 ?
            <p>There are {dataWishList.length} products in this wishlist.</p>
            :
            ''
          }
            </div>
            <div>
            {!isLoading?
              <>
              {dataWishList.length === 0 ?
              <h3 className='text-center mt-3'>wishlist Empty</h3>
              :
                    <div className="table-responsive" >
                  <Table className={`table text-nowrap table-with-checkbox ${style.fs9}`}>
                  <Thead className="table-light">
                <Tr className='bg-main-light shadow'>
              <Th>No.</Th>
              <Th></Th>
              <Th>Product</Th>
            <Th>Price</Th>
              <Th>Actions</Th>
            <Th>Remove</Th>
            </Tr>
            </Thead>
            {dataWishList.map((product, index)=>{
                  
                  return <Tbody key={index}>
          <Tr className='border-bottom'>
            <Td className="align-middle">
              {index + 1}
            </Td>
            <Td className="align-middle">
              <img src={product.imageCover} className="icon-shape icon-xxl " alt="productCover"/>
            </Td>
            <Td className="align-middle">
              <div>
                <h5 className={`fs-6 mb-2 fw-bold ${style.fs8}`}><Link to={`/details/${product._id}`} className={`text-wrap ${style.textHover}`}>{product.title}</Link></h5>
                <small>Remaining quantity: {product.quantity}</small>
              </div>
            </Td>
            <Td className="align-middle">{product.price}EGP</Td>
            <Td className="align-middle">
            <button onClick={()=>{addToMyCart(product._id)}} className={`btn bg-main text-light ${style.fs9}`}>Add to Cart</button>
            </Td>
            <Td className="align-middle">
            <button onClick={()=>{removeProductWishList(product._id)}} className={`btn btn-outline-danger ${style.fs9}`}>
                    <i className='fa-regular fa-trash-can mx-2'></i>Remove
              </button>
            </Td>
        </Tr>
          </Tbody>
        })
      }
              </Table>
                </div>
                
    } 
            </> 
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
    <div>
          </div>
          </div>
        </div>
        </div>
        
    </div>
    </div>
  )
}


  
  