import axios from 'axios';
import { useFormik } from 'formik';
import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { userContext } from '../../context/TokenContext';
import { Helmet } from 'react-helmet';
import { toast } from 'react-toastify';


export default function ResetPassword() {
  const[isLoading,setLoading] = useState(false);
  const[errMsg, setErr] = useState(null);
  let navigate = useNavigate();
  let {setToken} = useContext(userContext);

  let schemaValidation = Yup.object({
    email: Yup.string().required('Email is required').email('Enter avalid email'),
    newPassword: Yup.string().required('This is password is required').matches(/^[A-Z][a-z0-9]{6,8}$/, 'Enter avalid password'),
  })


  async function resetPassword(val) {
    setLoading(true);
    let {data} = await axios.put(`https://ecommerce.routemisr.com/api/v1/auth/resetPassword`, val).catch((err)=> {
      // console.log(err)
      setErr('Incorrect email or password');
      setLoading(false);
      
    })
    // console.log(data)
    if(data.token) {
      localStorage.removeItem('userToken');
      localStorage.removeItem('userId');
      setToken(null);
      toast.success('Success')
      navigate('/signin');
      setErr('');
      setLoading(false);
      localStorage.removeItem('code');
    }
  }

  let formik = useFormik({
    initialValues: {
      email:'',
      newPassword:'',
    },
    validationSchema: schemaValidation ,
    onSubmit: resetPassword
  })


  return (
    <div className='my-5 '>
                    <Helmet>
                <meta charSet="utf-8" />
                <meta name='description' content='Reset your password securely. Regain access to your profile and protect your account.'/>
                <title>Reset Password </title>
            </Helmet>
    <h1 className='text-main text-center'>Reset Password </h1>
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
        <div className="col-md-12">
          <label htmlFor="newPassword">New Password</label>
          <input type="password" id='newPassword' value={formik.values.newPassword} name='newPassword' onBlur={formik.handleBlur} onChange={formik.handleChange} className='form-control mt-1' />
            {formik.errors.newPassword && formik.touched.newPassword ? 
              <p className='text-danger mt-1'>{formik.errors.newPassword}</p>
              : ''
            }
        </div>

        {errMsg !== null ?
          <p className='text-danger text-center mt-1'>{errMsg}</p>
          : ''
          }
        <div className="col-md-12 text-end my-3">
          <button type='submit' disabled={!(formik.isValid && formik.dirty)} className='btn bg-main text-light'>Reset Password
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
  )
}
