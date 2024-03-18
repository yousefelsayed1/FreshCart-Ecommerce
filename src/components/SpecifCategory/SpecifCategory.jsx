import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Oval } from 'react-loader-spinner'
import { useParams } from 'react-router-dom'
import style from './SpecifCategory.module.scss'
import { Helmet } from 'react-helmet'

export default function SpecifCategory() {
  localStorage.removeItem('code');
  localStorage.removeItem('verifycode');
  
  const [specificCategory, setSpecificCategory] = useState({})
  const [subSpecificCategory, setSubSpecificCategory] = useState({})
  const [isLoading, setIsLoading] = useState(true)
  let param = useParams()
  let id = param.id
  // console.log(id)

  async function getSpecificCategories(id){
    let {data} = await axios.get(`https://ecommerce.routemisr.com/api/v1/categories/${id}`)
    setSpecificCategory(data.data)
    // console.log(data.data)
    setIsLoading(false)
  }

  async function getSubAllSpecificCategories(id){
    let {data} = await axios.get(`https://ecommerce.routemisr.com/api/v1/categories/${id}/subcategories`)
    // console.log(data.data)
    setSubSpecificCategory(data.data)
  }



  useEffect(()=>{
    getSpecificCategories(id)
    getSubAllSpecificCategories(id)
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
    <div className="container mt-5 pt-3">
                                          <Helmet>
                <meta charSet="utf-8" />
                <meta name='description' content={`Explore our premium collection of ${specificCategory.name}. Explore quality products that define style and elegance.`}/>
                <title>{specificCategory.name}</title>
            </Helmet>
    <div className="card specificCard mb-3 p-3">
  <div className="row g-0 ">
    <div className="col-md-4 mt-4">
    <img src={specificCategory.image} className={`w-100 rounded-4 ${style.maxHeight}`} alt={specificCategory.image}/>
    </div>
    <div className="col-md-8 d-flex align-items-center">
      <div className="card-body">
        <h1 className="card-title fw-bolder text-center mb-3">{specificCategory.name}</h1>
        <h3 className='card-title fw-bolder mb-3 ms-3'>SubCategories</h3>
        <div className=' d-flex flex-wrap justify-content-center'>
        {subSpecificCategory.length > 0 ? 
        subSpecificCategory.map((data)=> 
          <p key={data._id} className=' badge fs-6 fw-bolder bg-main mx-2 rounded p-2 '>{data.name}</p>
        )
        
        :
        <p className=' badge bg-danger fs-5 mx-auto p-2'>No data to Show here</p>}
        </div>
      </div>
    </div>
    </div>
    </div>
    </div>
  }
    </>
  )
}
