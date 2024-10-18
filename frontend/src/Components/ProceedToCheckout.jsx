import axios from 'axios';
import { Formik } from "formik";
import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { Link, useNavigate } from 'react-router-dom';
import * as yup from "yup";

import { countries } from "../jsonFolder/countries";
import { cities } from "../jsonFolder/cities";

const ProceedToCheckout = () => {
  const [paymentMethod, setPaymentMethod] = useState("COD");

  const defaulValues = {
    fullname: "",
    email: "",
    address: "",
    city: "",
    country: "",
    paymentMethod: "COD", // Default payment method
    cardNumber: "",
    cardExpiry: "",
    cardCVV: "",
  };

  const validationSchema = yup.object().shape({
    fullname: yup.string().required("* Full Name is required"),
    email: yup
      .string()
      .email("Invalid email")
      .required("* Email is required"),
    address: yup.string().required("* Address is required"),
    city: yup.string().required("* City is required"),
    country: yup.string().required("* Country is required"),
    paymentMethod: yup.string().required("* Payment method is required"),
    // Validation for card fields only if "Card Payment" is selected
    cardNumber: yup
      .string()
      .when("paymentMethod", {
        is: "Card",
        then: yup.string().required("* Card Number is required"),
      }),
    cardExpiry: yup
      .string()
      .when("paymentMethod", {
        is: "Card",
        then: yup.string().required("* Card Expiry is required"),
      }),
    cardCVV: yup
      .string()
      .when("paymentMethod", {
        is: "Card",
        then: yup.string().required("* CVV is required"),
      }),
  });
  const [fromCity, setFromCity] = useState([]);
  // console.log("🚀 ~ Registration ~ fromCity:", fromCity)

  const navigate =  useNavigate()

  const handleCities = (e) => {
    const selectedCountry = e.target.value;
    const filteredCities = cities.find(
      (element) => element.country === selectedCountry
    );
    setFromCity(filteredCities ? filteredCities.cities : []);
  };


  // const handleSubmit = async (values, actions) => {
  //   // Simulate sending the form to a server
  //   console.log("Form Values Submitted:", values);
  //   actions.resetForm();
  // };


  const handleSubmit = async (values, actions) => {
    try {
      console.log("Form Values Submitted:", values);
    const token = localStorage.getItem('auth-token');
    console.log("🚀 ~ handleSubmit ~ token:", token)
  
      // Call the order API using axios
      const response = await axios.post('http://localhost:4000/order', values, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
  
      if (response.status === 201) {
        console.log("Order placed successfully:", response.data);
        alert("Order placed successfully!");
        actions.resetForm();
      } else {
        console.error("Error placing order:", response.data);
        alert("Error placing order: " + response.data.error);
      }
    } catch (error) {
      console.error("Order submission error:", error);
      // Check if the error response exists
      if (error.response) {
        alert("Error: " + error.response.data.errors);
      } else {
        alert("An error occurred while placing the order.");
      }
    }
  };
  


  return (
    <div className='max_padd_container p-14'>
    <div
      className="container bg-light rounded-4 p-4 shadow mt-10"
      style={{ marginTop: "70px", width: "480px" }}
    >
      <Formik
        initialValues={defaulValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({
          values,
          handleChange,
          handleSubmit,
          handleBlur,
          errors,
          touched,
        }) => (
          <Form onSubmit={handleSubmit}>
          <div className='d-flex gap-2'>
            <Form.Group className="mb-3">
              <Form.Label>
                Full Name <span style={{ color: "red" }}>*</span>
              </Form.Label>
              <Form.Control
                type="text"
                name="fullname"
                placeholder="Enter Full Name"
                value={values.fullname}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {errors.fullname && touched.fullname ? (
                <p style={{ color: "red" }}>{errors.fullname}</p>
              ) : null}
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>
                Email <span style={{ color: "red" }}>*</span>
              </Form.Label>
              <Form.Control
                type="email"
                name="email"
                placeholder="Enter Email"
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {errors.email && touched.email ? (
                <p style={{ color: "red" }}>{errors.email}</p>
              ) : null}
            </Form.Group>
            </div>

            <Form.Group className="mb-3">
              <Form.Label>
                Address <span style={{ color: "red" }}>*</span>
              </Form.Label>
              <Form.Control
                type="text"
                name="address"
                placeholder="Enter Address"
                value={values.address}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {errors.address && touched.address ? (
                <p style={{ color: "red" }}>{errors.address}</p>
              ) : null}
            </Form.Group>

            <div className="d-flex gap-3 mb-3">
              <select
                id="country"
                name="country"
                // value={values.country}
                className="country w-50 border rounded-2"
                onBlur={handleBlur}
                onChange={(e) => {
                  handleCities(e);
                  handleChange(e);
                }}
              >
                <option>Select Country</option>
                {countries.map((ele) => (
                  <option>{ele.name}</option>
                ))}
              </select>
              {errors.country && touched.country ? (
                <p className="text-danger">{errors.country}</p>
              ) : null}

              <select
                id="city"
                name="city"
                className="city w-50 border rounded-1"
                value={values.city}
                onChange={handleChange}
                onBlur={handleBlur}
              >
                <option value="">Select City</option>
                {fromCity.map((city) => (
                  <option>{city}</option>
                ))}
              </select>
              {errors.city && touched.city ? (
                <p className="text-danger">{errors.city}</p>
              ) : null}

              <br />
            </div>

            <Form.Group className="mb-3">
              <Form.Label>
                Payment Method <span style={{ color: "red" }}>*</span>
              </Form.Label>
              <Form.Check
                type="radio"
                name="paymentMethod"
                label="Cash on Delivery"
                value="COD"
                checked={values.paymentMethod === "COD"}
                onChange={(e) => {
                  setPaymentMethod(e.target.value);
                  handleChange(e);
                }}
              />
              <Form.Check
                type="radio"
                name="paymentMethod"
                label="Card Payment"
                value="Card"
                checked={values.paymentMethod === "Card"}
                onChange={(e) => {
                  setPaymentMethod(e.target.value);
                  handleChange(e);
                }}
              />
              {errors.paymentMethod && touched.paymentMethod ? (
                <p style={{ color: "red" }}>{errors.paymentMethod}</p>
              ) : null}
            </Form.Group>

            {paymentMethod === "Card" && (
              <>
                <Form.Group className="mb-3">
                  <Form.Label>
                    Card Number <span style={{ color: "red" }}>*</span>
                  </Form.Label>
                  <Form.Control
                    type="text"
                    name="cardNumber"
                    placeholder="Enter Card Number"
                    value={values.cardNumber}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {errors.cardNumber && touched.cardNumber ? (
                    <p style={{ color: "red" }}>{errors.cardNumber}</p>
                  ) : null}
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>
                    Expiry Date <span style={{ color: "red" }}>*</span>
                  </Form.Label>
                  <Form.Control
                    type="text"
                    name="cardExpiry"
                    placeholder="MM/YY"
                    value={values.cardExpiry}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {errors.cardExpiry && touched.cardExpiry ? (
                    <p style={{ color: "red" }}>{errors.cardExpiry}</p>
                  ) : null}
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>
                    CVV <span style={{ color: "red" }}>*</span>
                  </Form.Label>
                  <Form.Control
                    type="text"
                    name="cardCVV"
                    placeholder="CVV"
                    value={values.cardCVV}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {errors.cardCVV && touched.cardCVV ? (
                    <p style={{ color: "red" }}>{errors.cardCVV}</p>
                  ) : null}
                </Form.Group>
              </>
            )}

            <div className='d-flex justify-between'>


            <Button variant="primary" type="submit" className=" btn_dark_rounded w-48">
              Confirm Payment
            </Button>
            
            <Button variant="primary" onClick={()=> navigate('/')} className="btn_dark_rounded w-32">
              Cancel
            </Button>

            </div>
           </Form>
        )}
      </Formik>
    </div>
    </div>
  );
};

export default ProceedToCheckout;
