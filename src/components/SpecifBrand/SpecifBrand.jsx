import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Oval } from 'react-loader-spinner';
import { useParams } from 'react-router-dom';
import style from './SpecifBrand.module.scss'
import { Helmet } from 'react-helmet';


export default function SpecifBrand() {
  localStorage.removeItem('code');
  localStorage.removeItem('verifycode');

  const [specificBrand, setSpecificBrand] = useState({})
  const [isLoading, setIsLoading] = useState(true)
  let param = useParams()
  let id = param.id
  // console.log(id)

  async function getSpecificBrands(id){
    let {data} = await axios.get(`https://ecommerce.routemisr.com/api/v1/brands/${id}`)
    // console.log(data.data)
    setSpecificBrand(data.data)
    setIsLoading(false)
  }
  useEffect(()=>{
    getSpecificBrands(id)
  },[])

  return (
    <>
    {isLoading? 
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
          : 
    <div className={`container ${style.mt7} pt-3`}>
                                    <Helmet>
                <meta charSet="utf-8" />
                <meta name='description' content={`Discover our exclusive collection from Brand ${specificBrand.name}. Explore quality products that define style and elegance.`}/>
                <title>{specificBrand.name}</title>
            </Helmet>
    <div className="card mb-3 text-center specificCard">
  <div className="row g-0">
    <div className="col-md-4">
    <img src={specificBrand.image} className={`w-100 rounded-4 ${style.maxHeight}`} alt={specificBrand.image} />
    </div>
    <div className="col-md-8 d-flex align-items-center">
      <div className="card-body">
        <h1 className="card-title fw-bolder text-center">{specificBrand.name}</h1>
      </div>
    </div>
  </div>
</div>
    </div>
    }
    </>
  )
}
