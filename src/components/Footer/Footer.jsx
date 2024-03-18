import React from 'react';
import style from './Footer.module.scss'
import amazon from '../../assets/img/Amazon-Pay-logo.svg'
import american from '../../assets/img/american-express.svg'
import masterCard from '../../assets/img/mastercard.svg'
import paypal from '../../assets/img/paypal.svg'
import visa from '../../assets/img/visa.svg'
import appstore from '../../assets/img/appstore-btn.svg'
import googleplay from '../../assets/img/googleplay-btn.svg'

export default function Footer() {
  return (
    <>
    <div className='pt-5 pb-4 bg-main-light mt-4'>
    <div className="container">
      <h2>Get the freshCart app</h2>
      <p className=' text-muted'>We will send you a link, open it on your phone to download the app</p>
      <div className='row pb-2'>
    <div className="col-md-9 col-xlg-10">
    <div className="mb-3">
      <input type="email" className="form-control" placeholder='Enter Email Address'/>
    </div>
    </div>
    <div className={`col-md-3 col-xlg-2 ${style.w75}`}>
    <button type="submit" className={`btn bg-main text-light fw-bolder w-100 ${style.fsbtn}`} >Share App Link</button>
    </div>
  </div>
        <div className={`d-flex justify-content-between align-items-center flex-wrap py-3 ${style.borderTop}`}>
          <ul className=' list-unstyled d-flex text-lg-start text-center'>
            <li className={`mt-1 ${style.fs8}`}>Payment Partners</li>
            <li><img src={amazon}  className='payment' alt='amazonpayment'/></li>
            <li><img src={american}  className='mt-1 mx-2'alt='americanexpresspayment'/></li>
            <li><img src={masterCard}  className='mt-1 mx-2' alt='masterCardpayment'/></li>
            <li><img src={paypal} className='mt-1 mx-2' alt='paypalpayment'/></li>
            <li><img src={visa} className='mt-1 mx-2' alt='visapayment'/></li>
          </ul>
          <ul className=' list-unstyled d-flex align-items-center'>
            <li className={`${style.fs8}`}>Get deliveries with FreshCart</li>
            <li><img src={appstore} alt='appstore-btn' className='appsStore mx-2'/></li>
            <li><img src={googleplay} alt='appstore-btn' className='appsStore mx-2'/></li>
          </ul>
        </div>
        <div className="text-center mt-3">
        <span className="small text-muted">© 2024 FreshCart eCommerce. All rights reserved.</span>
        </div>
    </div>
    </div>
    </>
  )
}
