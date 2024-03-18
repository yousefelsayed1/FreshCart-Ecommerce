// import { jwtDecode } from 'jwt-decode';
import React from 'react';
import imgUser from '../../assets/img/avatar-370-456322-512.webp';
import style from './Profile.module.scss'
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';


export default function Profile() {

  localStorage.removeItem('code');
  localStorage.removeItem('verifycode');
  
  let userProfile = JSON.parse(localStorage.getItem('userProfile'))
  // console.log(userProfile)
  let fullName = userProfile.name;
  let firstTwoWords = fullName.split(' ').slice(0, 2).join(' ');
  // console.log( firstTwoWords);

  // let getUserToken = localStorage.getItem('userToken');
  // let decodedToken = jwtDecode(getUserToken);
  // console.log(decodedToken)

  return (
    <div style={{fontFamily:'"Fira Sans Condensed", sans-serif'}} className="my-4">
              <Helmet>
                <meta charSet="utf-8" />
                <meta name='description' content='View and manage your personalized profile. Explore account settings and preferences.'/>
                <title>Your Profile</title>
            </Helmet>
      <div className='text-center'>
        <img src={imgUser} className={`${style.w2}`} alt="userAvatar" />
        <h3 className='my-2 ' >{firstTwoWords}</h3>
      </div>
      <div className='row'>
        <div className='col-md-8 m-auto p-3 '>
      <h3 className=' fw-normal'>Account Details</h3>
        </div>
        <div className="col-md-8 m-auto bg-light p-3  rounded-1">
          <div className="row gy-4">
        <div className="col-md-12">
        <label htmlFor="name">Full Name</label>
          <input type="text" id='name' name='email' className={`form-control mt-1 ${style.nameIcon} ${style.fs18} ${style.formBackground}`} placeholder={userProfile.name} disabled />
        </div>
        <div className="col-md-12">
        <label htmlFor="email">Email address</label>
          <input type="email" id='email' name='email' className={`form-control mt-1 ${style.emailIcon} ${style.fs18} ${style.formBackground}`} placeholder={userProfile.email} disabled />
        </div>
          </div>
        </div>
        <div className='col-md-8 m-auto p-3 mt-2 '>
      <h3 className=' fw-normal'>Manage Account</h3>
        </div>
            <div className="col-md-12 text-center mt-2">
          <Link to='/forgetpassword' className='btn bg-main text-light w-50'>Reset password
          </Link>
        </div>
      </div>
    </div>
  )
}
