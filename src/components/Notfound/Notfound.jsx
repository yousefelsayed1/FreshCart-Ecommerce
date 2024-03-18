import React from 'react';
import notFound from '../../assets/img/error.svg'
import style from './Notfound.module.scss'
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';

export default function Notfound() {
  localStorage.removeItem('code');
  localStorage.removeItem('verifycode');
  return (
    <>
                  <Helmet>
                <meta charSet="utf-8" />
                <meta name='description' content="Oops! The page you are looking for doesn't exist. Explore other sections or return to our homepage." />
                <title>Not Found</title>
            </Helmet>
        <div className={`d-flex align-items-center justify-content-center ${style.my10}`}
    style={{display: "flex",justifyContent: "center", alignItems: "center",}}>
    <img src={notFound} alt="" className="img-fluid" />
  </div>
    <h3 className='fw-bold text-center mb-3'>Page Not Found!</h3>
    <p className={`fw-bold text-muted fs-5 mb-3 text-center ${style.fsp7}`}>The page you were looking for could not be found.</p>
    <div className="d-flex justify-content-center my-3">
    <Link type="submit" className={`btn bg-main text-light fw-bolder mx-auto ${style.fsbtn}`} >Go To Home Page</Link>
    </div>
    
    </>

  )
}
