import React, { useEffect, useState } from 'react'
import { useContext } from 'react'
import { cartContext } from '../../context/CartContext'
import { Link } from 'react-router-dom';
import { Oval } from 'react-loader-spinner';
import style from './Cart.module.scss'
import { Helmet } from 'react-helmet';
import { toast } from 'react-toastify';


export default function Cart() {
  localStorage.removeItem('code');
  localStorage.removeItem('verifycode');
  
  const [data, setData] = useState([]);
  const[cartPrice, setPrice] = useState(0);
  const[isLoading, setLoading] = useState(true)
  let {getCart, updateCart, deleteCart, setCartNumber, clearCart} = useContext(cartContext);


  useEffect(()=>{
      (async ()=> {
          let data = await getCart();
          // console.log(data)
          if(data?.status === 200) {
            setData(data.data.data.products);
            let cartNum = data.data.numOfCartItems;
            if(cartNum === 0) {
              cartNum = "";
            }
            setCartNumber(cartNum);
            setPrice(data.data.data.totalCartPrice);
          }
        
        setLoading(false);
      }
      )()

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function removeProduct(id) {
    let data = await deleteCart(id);
    // console.log(data);
    setData(data.data.data.products);
    let cartNum = data.data.numOfCartItems;
    if(cartNum === 0) {
      cartNum = "";
    }
    setCartNumber(cartNum);
    setPrice(data.data.data.totalCartPrice);
    toast.error('Product removed from Shopping Cart');
  }

  async function clearProduct() {
    await clearCart();
    // console.log(data);
    toast.error('Shopping Cart Empty');
    setData([]);
    setCartNumber('');
    setPrice(0);
  }

  async function updateProduct(id, count) {
    if(count === 0) {
      removeProduct(id);
    }else {
      let data = await updateCart(id, count);
      setData(data.data.data.products);
      let cartNum = data.data.numOfCartItems;
      if(cartNum === 0) {
        cartNum = "";
      }
      setCartNumber(cartNum);
      setPrice(data.data.data.totalCartPrice);
    }
  }

  return (
    <div className='container'>
            <Helmet>
                <meta charSet="utf-8" />
                <meta name='description' content='Explore your shopping cart items, view discounts, and proceed to checkout. Shop now!' />
                <title>Shopping Cart</title>
            </Helmet>
    <h2 className='fw-bold my-4'>Shopping Cart</h2>
    {data.length > 0 ?
        <div className="text-end">
        <button onClick={()=>{clearProduct()}} className={`btn btn-outline-danger me-3  ${style.fs9}`}>
              <i className='fa-regular fa-trash-can mx-2'></i>clear Cart
        </button>
            <Link to="/checkout">
            <button disabled={data.length === 0} className={`btn bg-main text-light ${style.fs9} `}>Online Payment</button>
          </Link>
        </div>
    :
    ''
    }
    <div className="row">
      <div className="col-md-11 bg-main-light shadow p-5 my-5 m-auto">
        {!isLoading?
        <>
                <h3 className={`${style.fs10}`}><span className='text-main fw-bold'>Total Price: </span>{cartPrice}<span className=' mx-1'>EGP</span></h3>
        {data?.length === 0 ?
      <h3 className='text-center mt-3'>Shopping Cart Empty</h3>
        :
        data?.map((product)=>{
          return <div className="row border-bottom border-dark py-5" key={product._id}>
            <div className="col-md-2">
              <img src={product.product.imageCover} className='w-100' alt="productCover" />
            </div>
            <div className="col-md-10 d-flex justify-content-between align-items-center">
              <div>
                <h5 className={`mt-3 ${style.fs10}`}>{product.product.title}</h5>
                <p className='text-main'>{product.price}<span className='mx-1'>EGP</span></p>
                <button onClick={()=>{removeProduct(product.product._id)}} className={`btn btn-outline-danger ${style.fs9} ${style.pad}`}>
                  <i className='fa-regular fa-trash-can mx-2'></i>Remove
                </button>
              </div>
              <div className='d-flex align-items-center mt-5'>
                <button onClick={()=>{updateProduct(product.product._id, product.count+1)}} className={`btn btn-outline-success ${style.fs9} ${style.pad}`}>+</button>
                <span className='mx-2'>{product.count}</span>
                <button onClick={()=>{updateProduct(product.product._id, product.count-1)}} className={`btn btn-outline-success ${style.fs9} ${style.pad}`}>-</button>
              </div>
            </div>
          </div>
          
        })
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
      </div>
    </div>
    </div>
  )
}

