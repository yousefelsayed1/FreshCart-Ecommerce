import axios from 'axios'
import React from 'react'
import { Oval } from 'react-loader-spinner';
import { useQuery } from 'react-query';
import style from './Brands.module.scss'
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';


export default function Brands() {
  localStorage.removeItem('code');
  localStorage.removeItem('verifycode');
  
  async function getBrands() {
    return await axios.get(`https://ecommerce.routemisr.com/api/v1/brands`);
  }

  let {data, isLoading, isFetched} = useQuery('brands', getBrands)
  // console.log(data?.data.data);
  // console.log('isLoading', isLoading);
  // console.log('isFetched', isFetched);
  return (
    <div className='row'>
      <Helmet>
                <meta charSet="utf-8" />
                <meta name='description' content='Brands that push boundaries and introduce new ideas and consistently deliver on promises and  inspire and uplift their customers.' />
                <title>Brands</title>
            </Helmet>
      {!isLoading? <>
        {data?.data.data.map((brand)=> {
        return <div className="col-md-4 col-lg-3 py-2 cursor-pointer mt-4" key={brand._id}>
          <div className={`card ${style.brand} rounded-4`}>
            <Link to={brand._id}>
            <div className="card-body text-center">
          <img src={brand.image} className={`w-100 mb-3 rounded-4 ${style.maxHeight}`} alt={brand.name} />
          <p className='card-text text-main fw-bolder pt-2'>{brand.name}</p>
          </div>
            </Link>
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
  )
}
