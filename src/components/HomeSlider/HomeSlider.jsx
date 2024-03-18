import React from 'react'
import Slider from 'react-slick';
import style from './HomeSlider.module.scss'
import imgSlider1 from '../../assets/img/slider-image-1.jpeg';
import imgSlider2 from '../../assets/img/slider-image-2.jpeg';
import imgSlider3 from '../../assets/img/slider-image-3.jpeg';
import imgSlider4 from '../../assets/img/ad-banner-1.png';
import imgSlider5 from '../../assets/img/ad-banner-2.png';
import { Link } from 'react-router-dom';

export default function HomeSlider() {
  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    rtl: true
  };
  return (
    <div className={`row mt-5 ${style.mb8}`}>
      <div className="col-xxl-8 col-xl-7">
        <div className={`${style.homeSlider} home-slider`}>
        <div className="slider-container">
      <Slider {...settings}>
        <div className='rounded-3 position-relative'>
        <img src={imgSlider3} className={`w-100 rounded-3 ${style.response}`} height={525} alt="imgSlider" />
        <div style={{fontFamily: '"Inter", sans-serif'}} className={`col-xxl-7 col-lg-9 position-absolute top-0 start-0 ${style.py14} ${style.px8} ${style.psLg12} ${style.pyLg16}`}>
          <div className="d-flex align-items-center mb-4">
          <span>Exclusive Offer</span>
          <span className="badge bg-danger ms-2">20%</span>
          </div>
          <h2 className={`text-dark fw-bold mb-3 ${style.display5}`}>Cokoladni Kolutici Lasta</h2>
          <p className={`${style.fs5} text-dark`}>Only on this week... Don’t miss</p>
          <div className="mb-4 mt-4">
              <span className="text-dark">Start from
                <span className={`${style.fs4} text-danger ms-1`}>185EGP</span>
              </span>
          </div>
          <Link to="/products" className='btn btn-success'>Shop Deals Now
          <i className="fa-solid fa-arrow-right ms-2"></i>
            </Link>
        </div>
        </div>
        <div className='rounded-3 position-relative'>
        <img src={imgSlider1} className={`w-100 rounded-3 ${style.response}`} height={525} alt="imgSlider" />
        <div style={{fontFamily: '"Inter", sans-serif'}} className={`col-xxl-7 col-lg-9 position-absolute top-0 start-0 ${style.py14} ${style.px8} ${style.psLg12} ${style.pyLg16}`}>
          <div className="d-flex align-items-center mb-4">
          <span>Exclusive Offer</span>
          <span className="badge bg-danger ms-2">15%</span>
          </div>
          <h2 className={`text-dark fw-bold mb-3 ${style.display5}`}>Best Online Deals,<br/> Free Stuff</h2>
          <p className={`${style.fs5} text-dark`}>Only on this week... Don’t miss</p>
          <div className="mb-4 mt-4">
              <span className="text-dark">Start from
                <span className={`${style.fs4} text-danger ms-1`}>150EGP</span>
              </span>
          </div>
          <Link to="/products" className='btn btn-success'>Shop Deals Now
          <i className="fa-solid fa-arrow-right ms-2"></i>
            </Link>
        </div>
        </div>
        <div className='rounded-3 position-relative'>
        <img src={imgSlider2} className={`w-100 rounded-3 ${style.response}`} height={525} alt="imgSlider" />
        <div style={{fontFamily: '"Inter", sans-serif'}} className={`col-xxl-7 col-lg-9 position-absolute top-0 start-0 ${style.py14} ${style.px8} ${style.psLg12} ${style.pyLg16}`}>
          <div className="d-flex align-items-center mb-4">
          <span>Exclusive Offer</span>
          <span className="badge bg-danger ms-2">35%</span>
          </div>
          <h2 className={`text-dark fw-bold mb-3 ${style.display5}`}>Chocozay wafer<br/>-rolls Deals</h2>
          <p className={`${style.fs5} text-dark`}>Only on this week... Don’t miss</p>
          <div className="mb-4 mt-4">
              <span className="text-dark">Start from
                <span className={`${style.fs4} text-danger ms-1`}>200EGP</span>
              </span>
          </div>
          <Link to="/products" className='btn btn-success'>Shop Deals Now
          <i className="fa-solid fa-arrow-right ms-2"></i>
            </Link>
        </div>
        </div>
      </Slider>
      </div>
        </div>
      </div>
      <div className="col-xxl-4 col-xl-5 col-12 d-lg-flex d-xl-block gap-3 gap-xl-0">
        <div className={`position-relative w-100 ${style.mb6}`}>
        <img src={imgSlider4} className='w-100 rounded-3 ' height={250} alt="imgSlider" />
        <div style={{fontFamily: '"Inter", sans-serif'}} className={`position-absolute top-0 start-0 ${style.py9} ${style.px8}`}>
          <h3 className={`mb-0 fw-bold ${style.fs3}`}>10% cashback on<br/>personal care</h3>
          <div className={`${style.mt4} ${style.mb5} ${style.fs5}`}>
              <p className="mb-0">Max cashback: $12</p>
              <span>Code:
                <span className="fw-bold text-dark">CARE12</span>
              </span>
            </div>
            <Link to="/products" className="btn btn-dark">Shop Now</Link>
        </div>
        </div>
      <div className='position-relative w-100 '>
      <img src={imgSlider5} className='w-100 rounded-3' height={250} alt="imgSlider" />
      <div style={{fontFamily: '"Inter", sans-serif'}} className={`position-absolute top-0 start-0 ${style.py9} ${style.px8}`}>
          <h3 className={`mb-0 fw-bold ${style.fs3}`}>Say yes to<br/>season’s fresh</h3>
          <div className={`${style.mt4} ${style.mb5} ${style.fs5}`}>
          <p className={`mb-0 ${style.fs5}`}>Refresh your day<br/>the fruity way</p>
            </div>
            <Link to="/products" className="btn btn-dark">Shop Now</Link>
        </div>
      </div>
      </div>
    </div>
  )
}
