import axios from "axios";
import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import style from "../../styles/Categories.module.scss";
import { Link } from "react-router-dom";

export default function Categories() {
  const [categoryList, setCategory] = useState([]);

  async function getCategory() {
    let { data } = await axios.get(
      `https://ecommerce.routemisr.com/api/v1/categories`,
    );
    setCategory(data.data);
  }

  useEffect(() => {
    getCategory();
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 600,
    slidesToShow: 5,
    slidesToScroll: 1,

    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: true,
    pauseOnFocus: true,

    swipeToSlide: true,
    draggable: true,

    arrows: true,

    responsive: [
      {
        breakpoint: 1400,
        settings: {
          slidesToShow: 4,
          arrows: true,
        },
      },

      {
        breakpoint: 992,
        settings: {
          slidesToShow: 3,
          arrows: false,
        },
      },

      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          arrows: false,
          dots: true,
        },
      },

      {
        breakpoint: 576,
        settings: {
          slidesToShow: 1,
          arrows: false,
          dots: false,
        },
      },
    ],
  };
  return (
    <>
      <div className="category my-5">
        <Slider {...settings}>
          {categoryList.map((category, index) => {
            return (
              <div key={index}>
                <Link to={`/categories/${category._id}`}>
                  <div className={`card ${style.cardProduct} rounded-4`}>
                    <div className={`card-body text-center ${style.py8}`}>
                      <img
                        src={category.image}
                        className="w-100 mb-3 rounded-4 d-block mx-auto"
                        style={{
                          maxWidth: "260px",
                          height: "240px",
                          objectFit: "cover",
                        }}
                        alt={category.name}
                      />
                      <p className={` ${style.fs6} ${style.textTruncate}`}>
                        {category.name}
                      </p>
                    </div>
                  </div>
                </Link>
              </div>
            );
          })}
        </Slider>
      </div>
    </>
  );
}
