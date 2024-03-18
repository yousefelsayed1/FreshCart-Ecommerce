import React from 'react'
import clock from '../../assets/img/clock.svg'
import gift from '../../assets/img/gift.svg'
import packagee from '../../assets/img/package.svg'
import refresh from '../../assets/img/refresh-cw.svg'
import style from './InformationHome.module.scss'
import { Link } from 'react-router-dom'

export default function InformationHome() {
  return (
    <section className={`${style.myLg14} ${style.my8}`}>
            <div className="container">
                <div className="row">
                  <div className="col-md-6 col-lg-3">
                      <div className={`${style.mb8} mb-xl-0`}>
                        <div className={`${style.mb6}`}><img src={clock} alt="clock"/></div>
                        <h3 className={`${style.mb3} ${style.h5}`}>10 minute grocery now</h3>
                        <p>Get your order delivered to your doorstep at the earliest from FreshCart pickup stores near you.</p>
                      </div>
                  </div>
                  <div className="col-md-6 col-lg-3">
                    <div className={`${style.mb8} mb-xl-0`}>
                        <div className={`${style.mb6}`}><img src={gift} alt="gift"/></div>
                        <h3 className={`${style.mb3} ${style.h5}`}>Best Prices &amp; Offers</h3>
                        <p>Cheaper prices than your local supermarket, great cashback offers to top it off. Get best pricess &amp; offers.</p>
                      </div>
                  </div>
                  <div className="col-md-6 col-lg-3">
                      <div className={`${style.mb8} mb-xl-0`}>
                        <div className={`${style.mb6}`}><img src={packagee} alt="package"/></div>
                        <h3 className={`${style.mb3} ${style.h5}`}>Wide Assortment</h3>
                        <p>Choose from 5000+ products across food, personal care, household, bakery, veg and non-veg &amp; other categories.</p>
                      </div>
                  </div>
                  <div className="col-md-6 col-lg-3">
                      <div className={`${style.mb8} mb-xl-0`}>
                        <div className={`${style.mb6}`}><img src={refresh} alt="refresh"/></div>
                        <h3 className={`${style.mb3} ${style.h5}`}>Easy Returns</h3>
                        <p>
                            Not satisfied with a product? Return it at the doorstep &amp; get a refund within hours. No questions asked
                            <Link className='mx-1 text-main' to=''>policy</Link>
                            .
                        </p>
                      </div>
                  </div>
                </div>
            </div>
          </section>
  )
}
