import React from 'react'
import style from './OfflinePage.module.scss';
import offline from '../../assets/img/offline.jpg'
import { Helmet } from 'react-helmet';

export default function OfflinePage() {
  return (
    <>
                      <Helmet>
                <meta charSet="utf-8" />
                <meta name='description' content='Oops! you are currently offline'/>
                <title>Offline</title>
            </Helmet>
<div className={` text-center ${style.my10}`}>
    <img src={offline} alt="" className={`img-fluid rounded-4 ${style.woffline }`} />
    <h3 className='fw-bold text-center my-3'>You are offline!</h3>
  <p p className={`fw-bold text-muted fs-5 mb-3 text-center ${style.fsp7}`}>Please check your internet connection</p>
      </div>
</>
  )
}
