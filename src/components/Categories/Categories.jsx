import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Slider from 'react-slick';
import style from './Categories.module.scss'
import { Link } from 'react-router-dom';



export default function Categories() {

  
const[categoryList, setCategory] = useState([]);

  async function getCategory() {
    let {data} = await axios.get(`https://ecommerce.routemisr.com/api/v1/categories`);
    setCategory(data.data);
  }

  useEffect(()=> {
    getCategory();
  }, [])

  var settings = {
    dots: true,
    infinite: true,
    slidesToShow: 6,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    pauseOnHover: true,
    responsive: [
      {
        breakpoint: 1200, // Desktop
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 992, // Desktop
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768, // Tablet
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480, // Mobile
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
    ],
  };
  return (
    <>
    <div className='category my-5'>
      <Slider {...settings}>
        {categoryList.map((category, index)=> {
          return <div key={index}>
          <Link to={`/categories/${category._id}`}>
            <div className={`card ${style.cardProduct} rounded-4`}>
              <div className={`card-body text-center ${style.py8}`}>
              <img src={category.image} className={`w-100 mb-3 rounded-4`} height={240} alt={category.name} />
            <p className={` ${style.fs6} ${style.textTruncate }`}>{category.name}</p>
              </div>
            </div>
          </Link>
          </div>
        })}
      </Slider>
    </div>
    </>

  )
}
