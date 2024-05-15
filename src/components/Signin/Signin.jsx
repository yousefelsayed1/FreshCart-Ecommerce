import axios from "axios";
import { useFormik } from "formik";
import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { userContext } from "../../context/TokenContext";
import { Helmet } from "react-helmet";
import { toast } from "react-toastify";

export default function Signin() {
  let { setToken, setUserData } = useContext(userContext);

  let navigate = useNavigate();
  const [isLoading, setLoading] = useState(false);
  const [errMsg, setErr] = useState(null);
  let schemaValidation = Yup.object({
    email: Yup.string()
      .required("Email is required")
      .email("Enter avalid email"),
    password: Yup.string()
      .required("This is password is required")
      .matches(
        /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
        "Minimum 8 characters, at least one letter and one number"
      ),
  });

  localStorage.removeItem("code");
  localStorage.removeItem("verifycode");

  async function signIn(val) {
    setLoading(true);
    return await axios
      .post("https://ecommerce.routemisr.com/api/v1/auth/signin", val)
      .then((data) => {
        if (data.data.message === "success") {
          localStorage.setItem("userToken", data.data.token);
          setToken(data.data.token);
          setUserData(data.data.user);
          localStorage.setItem("userProfile", JSON.stringify(data.data.user));
          toast.success("Login Success");
          navigate("/");
          setLoading(false);
        }
      })
      .catch((err) => {
        setErr(err.response.data.message);
        setLoading(false);
      });
  }

  let formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: schemaValidation,
    onSubmit: signIn,
  });

  return (
    <div className="my-5 ">
      <Helmet>
        <meta charSet="utf-8" />
        <meta
          name="description"
          content="Sign in to your account. Access personalized features and manage your profile securely."
        />
        <title>Sign IN</title>
      </Helmet>
      <h1 className="text-main text-center">Login Now </h1>
      <form onSubmit={formik.handleSubmit} className="mt-4">
        <div className="row">
          <div className="col-md-8 m-auto bg-light p-4 shadow rounded-1">
            <div className="row gy-4">
              <div className="col-md-12">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  value={formik.values.email}
                  name="email"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  className="form-control mt-1"
                />
                {formik.errors.email && formik.touched.email ? (
                  <p className="text-danger mt-1">{formik.errors.email}</p>
                ) : (
                  ""
                )}
              </div>
              <div className="col-md-12">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  id="password"
                  value={formik.values.password}
                  name="password"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  className="form-control mt-1"
                />
                {formik.errors.password && formik.touched.password ? (
                  <p className="text-danger mt-1">{formik.errors.password}</p>
                ) : (
                  ""
                )}
              </div>

              {errMsg !== null ? (
                <p className="text-danger text-center mt-1">{errMsg}</p>
              ) : (
                ""
              )}
              <div className="col-md-12 text-end my-3">
                <button
                  type="submit"
                  disabled={!(formik.isValid && formik.dirty)}
                  className="btn bg-main text-light"
                >
                  Login
                  {isLoading ? (
                    <span>
                      <i className="fa-solid text-light mx-2 fa-spinner fa-spin"></i>
                    </span>
                  ) : (
                    ""
                  )}
                </button>
              </div>
              <Link
                className="forget text-main fw-bold text-center text-decoration-underline "
                to="/forgetpassword"
              >
                Forgotten Password?
              </Link>
              <p className="text-muted">
                I don't haven account{" "}
                <Link className=" regest text-main fw-bold" to="/signup">
                  {" "}
                  Register
                </Link>
              </p>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
