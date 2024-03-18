
import { useFormik } from 'formik';
import React, { useContext,useState } from 'react'
import { cartContext } from '../../context/CartContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { Helmet } from 'react-helmet';



export default function CheckOut() {
  localStorage.removeItem('code');
  localStorage.removeItem('verifycode');
  
  const[isLoading,setLoading] = useState(false);
  const[isLoadingg,setLoadingg] = useState(false);
  // const[errMsg, setErr] = useState(null);
  let{checkOutPayment,setCartNumber, header,cartId} = useContext(cartContext);


  const[errMsg, setErr] = useState(null);
  let schemaValidation = Yup.object({
    details: Yup.string().min(5, 'min length is 5').max(100, 'max lenght is 100 Character').required('Details is required'),
    phone: Yup.string().required('Phone is required').matches(/^01[0125][0-9]{8}$/, 'Enter avalid phone number'),
    city: Yup.string().min(3, 'min length is 3').max(15, 'max lenght is 15 char').required('City is required'),
  })

    let navigate = useNavigate();
    


  async function payment(val){
    setLoading(true);
    let data = await checkOutPayment(cartId, val);
    // console.log(data)
    if(data.data.status === 'success') {
      window.location = data.data.session.url;
    }else {
      toast.error('Error');
      setErr('Error, try again later')
    }
  }


  function confirmCashPayment() {
      const details = document.getElementById('details').value;
      const phone = document.getElementById('phone').value;
      const city = document.getElementById('city').value;
      const shippingAddress = {
        "shippingAddress":{
          "details": details,
          "phone": phone,
          "city": city
          }
      }
    axios.post(`https://ecommerce.routemisr.com/api/v1/orders/${cartId}`,shippingAddress,
        {
        headers: header
        }
    ).then((res)=> {
        if(res.status === 201) {
          // console.log(res)
          setLoadingg(true);
          toast.success('Payment Completed Successfully');
          setCartNumber();
          setTimeout(()=> {
            navigate('/allorders')
          }, 1500)
        }
    }).catch((err)=> {
        toast.error('Error during payment');
        setErr('Payment failed. Please try again later.')
        setLoadingg(false);
    })
}


  let formik = useFormik({
    initialValues: {
      details: "",
      phone: "",
      city: ""
    },
    validationSchema: schemaValidation ,
    // onSubmit: payment
    onSubmit: async (values) => {
      try {
        await payment(values);
      } catch (error) {
        setErr('Payment failed. Please try again later.')
        toast.error('Error during payment');
        setLoading(false);
        // console.error("Error during payment:", error);
        return error;
      }
    }
  })






  return (
    <div className='my-5 '>
              <Helmet>
                <meta charSet="utf-8" />
                <meta name='description' content='Securely complete your purchase. Explore our payment options and finalize your order. Shop confidently!' />
                <title>Payment</title>
            </Helmet>
    <h1 className='text-main text-center'>Payment Now </h1>
    <form onSubmit={formik.handleSubmit} className='mt-4'>
      <div className='row'>
        <div className="col-md-8 m-auto bg-light p-4 shadow rounded-1">
          <div className="row gy-4">
        <div className="col-md-12">
          <label htmlFor="city">City</label>
          <input type="text" id='city' value={formik.values.city} name='city' onBlur={formik.handleBlur} onChange={formik.handleChange} className='form-control mt-1' />
          {formik.errors.city && formik.touched.city ? 
                <p className='text-danger mt-1'>{formik.errors.city}</p>
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
          <label htmlFor="details">Details</label>
          <textarea type="text" id='details' style={{maxHeight:'125px'}} value={formik.values.details} onBlur={formik.handleBlur}  name='details' onChange={formik.handleChange} className='form-control mt-1' />
          {formik.errors.details && formik.touched.details ? 
                <p className='text-danger  mt-1'>{formik.errors.details}</p>
              : ''
            }
        </div>
        {errMsg !== null ?
          <p className='text-danger text-center mt-1'>{errMsg}</p>
          : ''
          }
          </div>
        </div>
      </div>
      <div className="col-md-12 text-center mt-5">
          <button type='submit' disabled={!(formik.isValid && formik.dirty)} className='btn bg-main text-light '>Confirm Online Payment
          {isLoading?
          <span>
            <i className='fa-solid text-light mx-2 fa-spinner fa-spin'></i>
          </span>
          : ''
        }
          </button>
        </div>
    </form>
      <div className="col-md-12 text-center my-4 ">
      <button onClick={()=>{confirmCashPayment()}} disabled={!(formik.isValid && formik.dirty)} className='btn bg-main text-light '>Confirm Cash Payment
          {isLoadingg?
          <span>
            <i className='fa-solid text-light mx-2 fa-spinner fa-spin'></i>
          </span>
          : ''
        }
          </button>
      </div>
    </div>
  )

}

