import React, { useContext, useEffect } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { userContext } from '../../context/TokenContext'
import { cartContext } from '../../context/CartContext';
import style from './Navbar.module.scss';
import freshcartLogo from '../../assets/img/freshcart-logo.svg'


export default function Navbar() {
  let {cartNumber, getCart, wishListNumber, getWishList} = useContext(cartContext);
  let {userToken, setToken} = useContext(userContext);
  let navigate = useNavigate();
  
  function logOut() {
    localStorage.removeItem('userToken');
    localStorage.removeItem('userId');
    localStorage.removeItem('userProfile')
    setToken(null);
    navigate('/signin');
  }

/*   useEffect(()=>{
      (async()=> {
        if(localStorage.getItem("userToken") !== null){
          getCart();
          getWishList();
        }
        // console.log(cartNumber)
      })()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); */


  useEffect(()=>{
    (async ()=> {
      if(localStorage.getItem("userToken") !== null){
        await getCart();
        await getWishList();
      }
    }
    )()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[]);

  return (
    <>
      <nav
        className="navbar navbar-expand-sm navbar-light bg-light"
      >
        <div className="container">
          <Link className="navbar-brand" to='/'>
          {/* <i className="fa-solid text-main fa-cart-shopping"></i><span className='fw-bold ms-2'>FreshCart</span> */}
          <img src={freshcartLogo} alt="logo" />
          </Link>
          <button
            className="navbar-toggler d-lg-none"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#collapsibleNavId"
            aria-controls="collapsibleNavId"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse " id="collapsibleNavId">
            {userToken !== null ?
                        <ul className="navbar-nav me-2 mt-2 mt-lg-0 links">
                        <li className="nav-item">
                          <NavLink className="nav-link" to="home">Home</NavLink>
                        </li>
                        <li className="nav-item">
                          <NavLink className="nav-link" to="products">Products</NavLink>
                        </li>
                        <li className="nav-item">
                          <NavLink className="nav-link" to="categories">Categories</NavLink>
                        </li>
                        <li className="nav-item">
                          <NavLink className="nav-link" to="brands">Brands</NavLink>
                        </li>
                        <li className="nav-item">
                          <NavLink className="nav-link" to="allorders">Orders</NavLink>
                        </li>
                      </ul>
                      : ''
          }

            <ul className="navbar-nav ms-auto mt-2 mt-lg-0 social">
              {userToken === null ?
              <>
                  <li className="nav-item">
                        <NavLink className="nav-link" to="signup">Register</NavLink>
                  </li>
                  <li className="nav-item">
                        <NavLink className="nav-link" to="signin">Login</NavLink>
                  </li>
              </>
              :''
            }

            {userToken !== null ?
            <div className='d-flex justify-content-between align-items-center'>
              <li className="nav-item d-flex align-items-center me">
                <a href='https://www.facebook.com/' target='_blank' rel="noopener noreferrer"><i className="fa-brands fa-facebook mx-2"></i></a>
                <a href='https://twitter.com/' target='_blank' rel="noopener noreferrer"><i className="fa-brands fa-twitter mx-2"></i></a>
                <a href='https://www.instagram.com/' target='_blank' rel="noopener noreferrer"><i className="fa-brands fa-instagram ms-2 me-3"></i></a>
                
                
                
              </li>
              <li className="nav-item position-relative ">
                          <NavLink className="nav-link" to="wishlist">
                          <i className="fa-regular fa-heart fs-5"></i>
                            <span className='position-absolute top-0 bg-main badge text-light'>{wishListNumber}</span>
                            </NavLink>
                        </li>

                        <li className="nav-item mx-1">
                          <NavLink className="nav-link" to="profile">
                          <i className="fa-regular fa-user fs-5"></i>
                            </NavLink>
                        </li>

              <li className="nav-item position-relative me">
                          <NavLink className="nav-link" to="cart">
                            {/* <i className='fa-solid fa-shopping-cart fs-5'></i> */}
                            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="28" fill="currentColor" className="bi bi-cart4" viewBox="0 0 16 16">
                              <path d="M0 2.5A.5.5 0 0 1 .5 2H2a.5.5 0 0 1 .485.379L2.89 4H14.5a.5.5 0 0 1 .485.621l-1.5 6A.5.5 0 0 1 13 11H4a.5.5 0 0 1-.485-.379L1.61 3H.5a.5.5 0 0 1-.5-.5M3.14 5l.5 2H5V5zM6 5v2h2V5zm3 0v2h2V5zm3 0v2h1.36l.5-2zm1.11 3H12v2h.61zM11 8H9v2h2zM8 8H6v2h2zM5 8H3.89l.5 2H5zm0 5a1 1 0 1 0 0 2 1 1 0 0 0 0-2m-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0m9-1a1 1 0 1 0 0 2 1 1 0 0 0 0-2m-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0"/>
                                </svg>
                            <span className='position-absolute top-0 bg-main badge text-light'>{cartNumber}</span>
                            </NavLink>
                        </li>
              <li onClick={()=>{logOut()}} className="nav-item ">
                <Link className="nav-link loghover">
                  <div className="d-flex align-items-center">
                  Logout <i className={`fa-solid fa-arrow-right-from-bracket ${style.fs14} ms-2`}></i>
                  </div>
                  </Link>
              </li>
            </div>
            : ''
          }
            </ul>
          </div>
        </div>
      </nav>
      
    </>
  )
}
