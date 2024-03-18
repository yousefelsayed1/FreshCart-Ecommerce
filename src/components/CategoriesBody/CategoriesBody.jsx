import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Oval } from 'react-loader-spinner';
import { Link } from 'react-router-dom';
import Categories from '../Categories/Categories';
import style from './CategoriesBody.module.scss'
import { Helmet } from 'react-helmet';


export default function CategoriesBody() {
  localStorage.removeItem('code');
  localStorage.removeItem('verifycode');
  
  const[categoryList, setCategory] = useState([]);
  const[isLoading, setLoading] = useState(true)
  const[searchTerm, setSearchTerm] = useState('');

  // console.log(searchTerm)

  async function getCategory() {
    let {data} = await axios.get(`https://ecommerce.routemisr.com/api/v1/categories`);
    setCategory(data.data);
    setLoading(false);
    return data;
  }
useEffect(()=> {
  getCategory();
},[])

  useEffect(()=> {
    (async ()=> {
      let data = await getCategory();
      // console.log(data)
      setCategory(data?.data.filter(cat => cat.name.toLowerCase().includes(searchTerm.toLocaleLowerCase())))
    })()
  }, [searchTerm])

  return (
    <>
      <Categories/>
      
      <div className={`container pt-3 ${style.mt6}`}>
        <Helmet>
                <meta charSet="utf-8" />
                <meta name='description' content='Explore our diverse product categories. Discover top-quality items for every need. Shop now!' />
                <title>Categories</title>
            </Helmet>
      {!isLoading?
      <>
        <input onChange={(e)=> setSearchTerm(e.target.value)} type='text' className='form-control my-5 w-50 mx-auto' placeholder='Search...'/>
      <div className="row">
        
        {categoryList.map((category)=>
        <div key={category._id} className="col-md-4 col-lg-3 py-2 cursor-pointer mt-4">
          <div className={`card ${style.category} rounded-4`}>
          <div className='text-center'>
          <Link to={category._id}>
            <div className="card-body">
            <img src={category.image} className={`w-100 mb-3 rounded-4 ${style.maxHeight}`} alt={category.image}/>
              <h6 className="card-text text-main fw-bolder pt-2">{category.name}</h6>
            </div>
          </Link>
          </div>
          </div>
          </div>
          )}
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


    
    </>

  )
}


