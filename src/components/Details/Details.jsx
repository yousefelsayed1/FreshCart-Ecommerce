import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useContext } from 'react';
import { Oval } from 'react-loader-spinner';
import { useParams } from 'react-router-dom';
import Slider from "react-slick";
import { cartContext } from '../../context/CartContext';
import { toast } from 'react-toastify';
import StarRating from '../StarRating/StarRating';
import { Helmet } from 'react-helmet';



export default function Details() {
  localStorage.removeItem('code');
  localStorage.removeItem('verifycode');

  let {addToCart, addToWishList, setWishListNumber, getWishList, deleteWishList, setDataWishList} = useContext(cartContext);

  let params = useParams();
  // console.log(params)
  let productId = params.id;
  const[productDetails, setDetails] = useState(null);
  const[isLoading, setLoading] = useState(true)
  const [matchingProductIds, setMatchingProductIds] = useState([]);

  async function getProductDetails() {
    let {data} = await axios.get(`https://ecommerce.routemisr.com/api/v1/products/${productId}`);
    // console.log(data.data);
    setDetails(data.data);
    setLoading(false);
  }

  useEffect(() => {
    getProductDetails();
    (async () => {
      try {
        let { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/products/${productId}`);
        let detail = data.data; // This is the detail object
        // console.log(detail);
  
        let dataa = await getWishList();
        let wish = dataa.data.data; // This is the array of objects
        // console.log(wish);
  
        // Check if the wish array contains the detail object's ID
        const matchingProduct = wish.find((item) => item.id === detail.id);
  
        if (matchingProduct) {
          // Extract the matching ID
          const matchId = matchingProduct.id;
          // console.log('Matching ID:', matchId);
          setMatchingProductIds(matchId)
          // console.log(matchingProductIds)
        } else {
          // console.log('No matching ID found.');
        }
      } catch (error) {
        // console.error('Error fetching data:', error);
        return error;
      }
    })();
  }, []);
  
  

  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 1500,
    arrows: false,
  };

  async function addToMyCart(id) {
/*     let {data} = await addToCart(id);
    // console.log(data);
    if(data.status === 'success') {
      toast.success(data.message);
      setCartNumber(data.numOfCartItems);
    } */
    await addToCart(id);
  }


async function addToMyWishList(e, id) {
  let { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/products/${productId}`);
  let detail = data.data; // This is the detail object
  // console.log(detail);

  let dataa = await getWishList();
  let wish = dataa.data.data; // This is the array of objects
  // console.log(wish);

  const matchingProduct = wish.find((item) => item.id === detail.id);
  
  if (matchingProduct) {
    e.target.classList.replace('fa-solid', 'fa-regular' );
    let data = await deleteWishList(id);
    // console.log(data.data.data.length);
    if(data.status === 200) {
      setDataWishList(data.data.data);
      setWishListNumber(data.data.data.length);
      toast.error('Product removed from wishlist');
    }
  }else{
    e.target.classList.replace('fa-regular', 'fa-solid' );
    let {data} = await addToWishList(id);
    // console.log(data.data.length);
    if(data.status === 'success') {
      toast.success(data.message);
      setWishListNumber(data.data.length);
  }
  }
}


  return (

    <div className='container my-5 details'>
    {!isLoading?
          <div className="row">
          {productDetails?
          <>
                      <Helmet>
                <meta charSet="utf-8" />
                <meta name='description' content='Fresh Cart provide extensive information about each product, including detailed descriptions, images, and customer reviews' />
                <title>{productDetails.title}</title>
            </Helmet>
              <div className="col-md-4">
              { productDetails?.images.length > 1?
              <div className="slider-container mb-5">
              <Slider {...settings}>
              {productDetails?.images.map((img, index) => (
                <div key={index} >
                <img src={img} className="w-100" alt="productCover" />
                </div>
              ))}
              </Slider>
              </div>
            :
          <img src={productDetails?.imageCover} className='w-100' alt="productCover"/>
            }
        {/* <img src={productDetails?.imageCover} className='w-100' alt="productCover"/> */}
              </div>
                <div className="col-md-8 d-flex flex-column justify-content-around">
                  <div>
                  <p className='text-main mb-3'>{productDetails?.category.name}</p>
                    <h2 className='fw-bold mb-3'>{productDetails?.title}</h2>
                    <p className='mb-3'>{productDetails?.description}</p>
                    <StarRating rating={productDetails?.ratingsAverage}/>
                  </div>
                  <div>
                    <div className="d-flex justify-content-between mt-3">
                      <div className='price d-flex'>
                      <span className='text-main me-2 '>Price: </span>
                      <p>{productDetails?.price}EGP</p>
                      </div>
                      <button onClick={(e)=>{addToMyWishList(e,productDetails._id)}} className='btnAction'>
                <i className={`fa-${matchingProductIds===productDetails._id ? 'solid' : 'regular'} fa-heart fs-5`} ></i>
              </button>
                    </div>
                    <button onClick={()=>{addToMyCart(productDetails._id)}} className='btn bg-main text-light w-100 mt-3'>Add To Cart</button>
                  </div>
                </div>
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
  )
}
