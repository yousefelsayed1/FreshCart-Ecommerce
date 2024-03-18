import axios from 'axios';
import { useFormik } from 'formik';
import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import * as Yup from 'yup';


export default function Signup() {
  localStorage.removeItem('code');
  localStorage.removeItem('verifycode');
  
  let navigate = useNavigate();
  const[isLoading,setLoading] = useState(false);
  const[errMsg, setErr] = useState(null);
  let schemaValidation = Yup.object({
    name: Yup.string().min(3, 'min length is 3').max(15, 'max lenght is 15 char').required('Name is required'),
    email: Yup.string().required('Email is required').email('Enter avalid email'),
    phone: Yup.string().required('Phone is required').matches(/^01[0125][0-9]{8}$/, 'Enter avalid phone number'),
    password: Yup.string().required('Password is required').matches(/^[A-Z][a-z0-9]{6,8}$/, 'Enter avalid password'),
    rePassword: Yup.string().required('Confirm password is required').oneOf([Yup.ref('password')], 'not matched')
  })

  async function signUp(val){
    // console.log(val)
    setLoading(true);
    let {data} = await axios.post('https://ecommerce.routemisr.com/api/v1/auth/signup', val).catch((err)=> {
        // console.log(err.response.data.message);
        setErr(err.response.data.message);
        setLoading(false);
      })
      // console.log(data)
      if (data.message === 'success') {
        toast.success('Register Success');
        navigate('/signin');
        setLoading(false);
      }
  }

  let formik = useFormik({
    initialValues: {
      name: '',
      email:'',
      password:'',
      rePassword:'',
      phone:''
    },
    validationSchema: schemaValidation ,
    onSubmit: signUp
  })
  return (
    <div className='my-3'>
                              <Helmet>
                <meta charSet="utf-8" />
                <meta name='description' content='Join our community! Sign up now to access exclusive offers and personalized features.'/>
                <title>Sign Up</title>
            </Helmet>
    <h1 className='text-main text-center'>Register Now </h1>
    <form onSubmit={formik.handleSubmit}>
      <div className='row'>
        <div className="col-md-8 m-auto bg-light p-4 shadow rounded-1">
          <div className="row gy-4">
          <div className="col-md-12">
          <label htmlFor="name">Name</label>
          <input type="text" id='name' value={formik.values.name} name='name' onBlur={formik.handleBlur} onChange={formik.handleChange} className='form-control mt-1' />
            {formik.errors.name && formik.touched.name ? 
          <p className='text-danger mt-1'>{formik.errors.name}</p>
          : '' 
          }
        </div>
        <div className="col-md-12">
          <label htmlFor="email">Email</label>
          <input type="email" id='email' value={formik.values.email} name='email' onBlur={formik.handleBlur} onChange={formik.handleChange} className='form-control mt-1' />
            {formik.errors.email && formik.touched.email ? 
                <p className='text-danger mt-1'>{formik.errors.email}</p>
              : ''
            }
        </div>
        <div className="col-md-12">
          <label htmlFor="phone">Phone</label>
          <input type="tel" id='phone' value={formik.values.phone} name='phone' onBlur={formik.handleBlur} onChange={formik.handleChange} className='form-control mt-1' />
              {formik.errors.phone && formik.touched.phone ? 
                <p className='text-danger mt-1'>{formik.errors.phone}</p>
              : ''
              }
        </div>
        <div className="col-md-12">
          <label htmlFor="password">Password</label>
          <input type="password" id='password' value={formik.values.password} name='password' onBlur={formik.handleBlur} onChange={formik.handleChange} className='form-control mt-1' />
            {formik.errors.password && formik.touched.password ? 
              <p className='text-danger mt-1'>{formik.errors.password}</p>
              : ''
            }
        </div>
        <div className="col-md-12">
          <label htmlFor="rePassword">RePassword</label>
          <input type="password" id='rePassword' value={formik.values.rePassword} name='rePassword' onBlur={formik.handleBlur} onChange={formik.handleChange} className='form-control mt-1' />
            {formik.errors.rePassword && formik.touched.rePassword ? 
              <p className='text-danger mt-1'>{formik.errors.rePassword}</p>
              : ''
            }
        </div>
            {errMsg !== null ?
          <p className='text-danger text-center'>{errMsg}</p>
          : ''
          }
        <div className="col-md-12 text-end my-3">
          <button type='submit' disabled={!(formik.isValid && formik.dirty)} className='btn bg-main text-light'>Register
          {isLoading?
          <span>
            <i className='fa-solid text-light mx-2 fa-spinner fa-spin'></i>
          </span>
          : ''
        }
          </button>
        </div>
        <p className="text-muted mt-2">I have account <Link className=' logpage text-main fw-bold' to="/signin"> Login</Link></p>
          </div>
        </div>
      </div>
    </form>
    </div>

  )
}
