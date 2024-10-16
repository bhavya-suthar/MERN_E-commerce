import { Formik } from "formik";
import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import * as yup from "yup";
import { countries } from "../jsonFolder/countries";
import { cities } from "../jsonFolder/cities";
// import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";
const ProceedToCheckout = () => {
  const count = 50;
  console.log("🚀  ProceedToCheckout  count:", count);

  const [showPassword, setShowPassword] = useState(false);
  const [showConPassword, setShowConPassword] = useState(false);

  const [selectedDate, setSelectedDate] = useState(new Date());

  const [fromCity, setFromCity] = useState([]);
  console.log("🚀  ProceedToCheckout  fromCity:", fromCity);

  const defaulValues = {
    userName: "",
    fullname: "",
    email: "",
    password: "",
    confirmPass: "",
    gender: "male",
    country: "",
    city: "",
    date: null,
    address: "",
    terms: false,
  };

  const validationSchema = yup.object().shape({
    userName: yup.string().required("* userName is required"),
    fullname: yup.string().required("* fullName is required"),
    email: yup
      .string()
      .matches(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, "Invalid email")
      .required("* email is required"),
    password: yup.string().required("* Password is required"),
    confirmPass: yup
      .string()
      .required()
      .oneOf([yup.ref("password")], "Password didn't match "),
    gender: yup.string().required("* Gender is required"),
    country: yup.string().required("* Country is required"),
    city: yup.string().required("* City is required"),
    date: yup.date().nullable().required("* Date is required"),
    address: yup.string().required("* Address is required"),
    terms: yup.boolean().oneOf([true], "* Please agree terms & conditions"),
  });

  const selectCity = (e) => {
    const fndcity = e;
    console.log("🚀  selectCity  fndcity:", fndcity);

    const selectedCountry = cities.find((ele) => ele.country === e);
    console.log("🚀  selectCity  selectedCountry:", selectedCountry);
    setFromCity(selectedCountry ? selectedCountry.cities : []);
  };
  const handleSubmit = async (values, actions) => {
    const token = localStorage.getItem("auth-token");

    if (!token) {
      console.error("Authentication token is missing");
      return;
    }

    try {
      const response = await fetch("http://localhost:4000/order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": token,
        },
        body: JSON.stringify(values),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Order successfully created:", data);
        actions.resetForm();
      } else {
        const errorData = await response.json();
        console.error("Order creation error:", errorData);
      }
    } catch (error) {
      console.error("Network error:", error);
    }
  };

  return (
    <>
      <div
        className="container bg-light rounded-4 p-4 shadow"
        style={{ marginTop: "70px", width: "480px" }}
      >
        <h2 className="text-center">ProceedToCheckout</h2>
        <Formik
          initialValues={defaulValues}
          validationSchema={validationSchema}
          // onSubmit={(values, action) => {
          //     console.log("🚀  ProceedToCheckout  value:", values)
          //     action.resetForm();

          // }

          onSubmit={handleSubmit}
        >
          {({
            values,
            handleChange,
            handleSubmit,
            handleBlur,
            errors,
            touched,
            setFieldValue,
          }) => (
            <Form onSubmit={handleSubmit}>
              <div className="d-flex justify-content-center gap-2 pt-5">
                <Form.Group className="mb-3 w-35 text-start">
                  <Form.Label>
                    Full Name <span style={{ color: "red" }}>*</span>
                  </Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter Full Name"
                    name="fullname"
                    value={values.fullname}
                    onBlur={handleBlur}
                    onChange={handleChange}
                  />
                  {errors.fullname && touched.fullname ? (
                    <p style={{ color: "red" }}>{errors.fullname}</p>
                  ) : null}
                </Form.Group>

                <Form.Group className="mb-3 w-35 text-start">
                  <Form.Label>
                    User Name <span style={{ color: "red" }}>*</span>
                  </Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter User Name"
                    name="userName"
                    value={values.userName}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {errors.userName && touched.userName ? (
                    <p style={{ color: "red" }}>{errors.userName}</p>
                  ) : null}
                </Form.Group>
              </div>
              <div className="w-90">
                <Form.Group className="mb-3 text-start">
                  <Form.Label>
                    Email <span style={{ color: "red" }}>*</span>
                  </Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter email"
                    name="email"
                    value={values.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {errors.email && touched.email ? (
                    <p style={{ color: "red" }}>{errors.email}</p>
                  ) : null}
                </Form.Group>
              </div>

              <div className="d-flex justify-content-center gap-2">
                <Form.Group className="mb-3 w-35 text-start">
                  <Form.Label>
                    Password <span style={{ color: "red" }}>*</span>
                  </Form.Label>
                  <div style={{ position: "relative" }}>
                    <Form.Control
                      type={showPassword ? "text" : "password"}
                      placeholder="Password"
                      name="password"
                      value={values.password}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    <span
                      onClick={() => setShowPassword(!showPassword)}
                      style={{
                        position: "absolute",
                        top: "50%",
                        right: "20px",
                        cursor: "pointer",
                        transform: "translateY(-50%)",
                      }}
                    >
                      {showPassword ? (
                        <i className="fa-solid fa-eye"></i>
                      ) : (
                        <i className="fa-solid fa-eye-slash"></i>
                      )}
                    </span>
                  </div>
                  {errors.password && touched.password ? (
                    <p style={{ color: "red" }}>{errors.password}</p>
                  ) : null}
                </Form.Group>

                <Form.Group className="mb-3 w-35 text-start">
                  <Form.Label>
                    Confirm Password <span style={{ color: "red" }}>*</span>
                  </Form.Label>
                  <div style={{ position: "relative" }}>
                    <Form.Control
                      type={showConPassword ? "text" : "password"}
                      placeholder="Confirm Password"
                      name="confirmPass"
                      value={values.confirmPass}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    <span
                      onClick={() => setShowConPassword(!showConPassword)}
                      style={{
                        position: "absolute",
                        top: "50%",
                        right: "20px",
                        cursor: "pointer",
                        transform: "translateY(-50%)",
                      }}
                    >
                      {showConPassword ? (
                        <i className="fa-solid fa-eye"></i>
                      ) : (
                        <i className="fa-solid fa-eye-slash"></i>
                      )}
                    </span>
                  </div>
                  {errors.confirmPass && touched.confirmPass ? (
                    <p style={{ color: "red" }}>{errors.confirmPass}</p>
                  ) : null}
                </Form.Group>
              </div>

              <div>
                <Form.Group className="mb-3 text-start d-flex gap-4">
                  <Form.Label>
                    Gender <span style={{ color: "red" }}>*</span>
                  </Form.Label>
                  {errors.gender && touched.gender ? (
                    <p style={{ color: "red" }}>{errors.gender}</p>
                  ) : null}
                  <Form.Check
                    type="radio"
                    name="gender"
                    value="male"
                    checked
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  <Form.Label>Male</Form.Label>

                  <Form.Check
                    type="radio"
                    name="gender"
                    value="female"
                    checked={values.gender === "female"}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  <Form.Label>Female</Form.Label>
                </Form.Group>
              </div>

              <div>
                <Form.Group className="mb-3 w-35 text-start d-flex justify-content-center gap-2">
                  <Form.Select
                    aria-label="Default select example"
                    // value={values.country}
                    name="country"
                    onChange={(e) => {
                      selectCity(e.target.value);
                      handleChange(e);
                    }}
                    // onChange={handleChange}
                    onBlur={handleBlur}
                  >
                    <option>
                      Select Country <span style={{ color: "red" }}>*</span>
                    </option>
                    {countries.map((ele, index) => (
                      <option key={index}>{ele.name}</option>
                    ))}
                  </Form.Select>
                  {errors.country && touched.country ? (
                    <p style={{ color: "red" }}>{errors.country}</p>
                  ) : null}

                  <Form.Select
                    aria-label=""
                    // value={values.city}
                    name="city"
                    onChange={handleChange}
                    onBlur={handleBlur}
                  >
                    <option>
                      Select City <span style={{ color: "red" }}>*</span>
                    </option>
                    {fromCity.length ? (
                      fromCity.map((city, i) => <option key={i}>{city}</option>)
                    ) : (
                      <option>No City found</option>
                    )}
                  </Form.Select>
                  {errors.city && touched.city ? (
                    <p style={{ color: "red" }}>{errors.city}</p>
                  ) : null}
                </Form.Group>
              </div>

              <div style={{ display: "flex", gap: "5px" }}>
                <Form.Label>
                  Date<span style={{ color: "red" }}>*</span>
                </Form.Label>
                {/* <DatePicker 
                selected={values.date} 
                onChange={(date)=> {setFieldValue("date", date); }}
                onBlur={handleBlur}
                // readOnly={true}
                /> */}
                <Form.Control
                  type="date"
                  name="date"
                  value={values.date}
                  onChange={handleChange}
                  onBlur={handleBlur}
                ></Form.Control>
                {errors.date && touched.date ? (
                  <p style={{ color: "red" }}>{errors.date}</p>
                ) : null}
              </div>

              <div className="mt-2">
                <Form.Label>
                  Address <span style={{ color: "red" }}>*</span>
                </Form.Label>
                <div style={{ position: "relative" }}>
                  <Form.Control
                    as="textarea"
                    name="address"
                    value={values.address}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    maxLength={50}
                  ></Form.Control>
                  <p style={{ position: "absolute", top: "-2%", right: "6px" }}>
                    {values.address.length}/{count}
                  </p>
                  {/* {/ {values.address.length >= 10 ? <p>can't add</p> : ""} /} */}
                </div>
                {errors.address && touched.address ? (
                  <p style={{ color: "red" }}>{errors.address}</p>
                ) : null}
              </div>

              <div className="d-flex mt-3 gap-2">
                <Form.Check
                  type="checkbox"
                  name="terms"
                  value={values.terms}
                  // checked={values.terms  === true}
                  onChange={handleChange}
                  onBlur={handleBlur}
                ></Form.Check>
                <Form.Label>
                  Agree terms & conditions.{" "}
                  <span style={{ color: "red" }}>*</span>
                </Form.Label>
                {errors.terms && touched.terms ? (
                  <p style={{ color: "red" }}>{errors.terms}</p>
                ) : null}
              </div>

              <div className="d-flex justify-content-center gap-5 mt-3">
                <Button variant="primary" type="submit">
                  ProceedToCheckout
                </Button>
              </div>

              <Form.Label className="pt-2" style={{ marginLeft: "25px" }}>
                Already have an account?
                <Link to={"/login"} style={{ textDecoration: "none" }}>
                  {" "}
                  SignIn
                </Link>
              </Form.Label>
            </Form>
          )}
        </Formik>
      </div>
    </>
  );
};

export default ProceedToCheckout;
