import axios from 'axios';
import { useFormik } from 'formik'
import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import * as Yup from 'yup';


export default function ForgetPassword() {
  localStorage.removeItem('verifycode');
  const[isLoading,setLoading] = useState(false);
  const[errMsg, setErr] = useState(null);
  let navigate = useNavigate();

  let schemaValidation = Yup.object({
    email: Yup.string().required('Email is required').email('Enter avalid email'),
  })

  async function sendCode(val) {
    setLoading(true);
    let {data} = await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords`, val).catch((err)=> {
      // console.log(err)
      setErr('Verify the email address and try again');
      setLoading(false);
      toast.error('Oops! Email address is not found');
      
    })
    if(data.statusMsg === 'success'){
      document.querySelector('.forgetPassword').classList.add('d-none');
      document.querySelector('.VerifyCode').classList.remove('d-none');
      localStorage.setItem('code','success')
      setErr('');
      setLoading(false);
    }
  }

  let formik = useFormik({
    initialValues: {
      email:''
    },
    validationSchema: schemaValidation ,
    onSubmit: sendCode
  })




  let schemaValidation2 = Yup.object({
    resetCode: Yup.string().required('Code is required')
  })

function removeExtraSpace(val) {
    let value ={
    resetCode:val.resetCode.trim().split(/ +/).join(' ')
  }
  return value;
  }


  async function sendData(val) {
    // console.log(val)
    setLoading(true);
    let value = removeExtraSpace(val)
    let {data} = await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode`, value).catch((err)=> {
      setErr('Enter a valid code');
      setLoading(false);
      toast.error('Oops! Verification code is incorrect');
    })
    if(data.status === 'Success') {
      localStorage.setItem('verifycode', 'Success')
      navigate('/resetpassword');
      setErr('');
      setLoading(false);
    }
  }

  let verifyFormik = useFormik({
    initialValues: {
      resetCode:''
    },
    validationSchema: schemaValidation2 ,
    onSubmit:  sendData
  })


  return (
    <>
    <div className='my-5 forgetPassword'>
        <Helmet>
                <meta charSet="utf-8" />
                <meta name='description' content='Recover access to your account. Reset your password securely and regain control. Act now!' />
                <title>Forgotten Password</title>
            </Helmet>
    <h1 className='text-main text-center'>Find Your Account </h1>
    <form onSubmit={formik.handleSubmit} className='mt-4'>
      <div className='row'>
        <div className="col-md-8 m-auto bg-light p-4 shadow rounded-1">
          <div className="row gy-4">
        <div className="col-md-12">
          <label htmlFor="email">Email</label>
          <input type="email" id='email' value={formik.values.email} name='email' onBlur={formik.handleBlur} onChange={formik.handleChange} className='form-control mt-1' />
            {formik.errors.email && formik.touched.email ? 
                <p className='text-danger mt-1'>{formik.errors.email}</p>
              : ''
            }
        </div>
        {errMsg !== null ?
          <p className='text-danger text-center mt-1'>{errMsg}</p>
          : ''
          }
        <div className="col-md-12 text-end my-3">
          <button type='submit' disabled={!(formik.isValid && formik.dirty)} className='btn bg-main text-light'>Next
          {isLoading?
          <span>
            <i className='fa-solid text-light mx-2 fa-spinner fa-spin'></i>
          </span>
          : ''
        }
          </button>
        </div>
          </div>
        </div>
      </div>
    </form>
    </div>
    <div className='my-5 VerifyCode d-none'>
    <h1 className='text-main text-center'>Verify Code </h1>
    <form onSubmit={verifyFormik.handleSubmit} className='mt-4'>
      <div className='row'>
        <div className="col-md-8 m-auto bg-light p-4 shadow rounded-1">
          <div className="row gy-4">
        <div className="col-md-12">
          <label htmlFor="resetCode">Verfiy Code</label>
          <input type="text" id='resetCode' value={verifyFormik.values.resetCode} name='resetCode' onBlur={verifyFormik.handleBlur} onChange={verifyFormik.handleChange} className='form-control mt-1' />
            {verifyFormik.errors.resetCode && verifyFormik.touched.resetCode ?
                <p className='text-danger mt-1'>{verifyFormik.errors.resetCode}</p>
              : ''
            }
        </div>
        {errMsg !== null ?
          <p className='text-danger text-center mt-1'>{errMsg}</p>
          : ''
          }
        <div className="col-md-12 text-end my-3">
          <button type='submit' disabled={!(verifyFormik.isValid && verifyFormik.dirty)} className='btn bg-main text-light'>Send
          {isLoading?
          <span>
            <i className='fa-solid text-light mx-2 fa-spinner fa-spin'></i>
          </span>
          : ''
        }
          </button>
        </div>
          </div>
        </div>
      </div>
    </form>
    </div>
    </>

  )
}
