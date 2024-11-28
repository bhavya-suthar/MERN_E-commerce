// import React from "react";
import "react-toastify/dist/ReactToastify.css";

import { useState } from "react";
import { toast } from "react-toastify";

const Contact = () => {
  const [Input, setInput] = useState({
    name: "",
    email: "",
    phone: "",
    msg: "",
  });
  // console.log("🚀 ~ Contact ~ Input:", Input)

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInput({
      ...Input,
      [name]: value,
    });
  };

  // const notify = toast.success("🦄 Wow so easy!", {
  //   position: "top-right",
  //   autoClose: 5000,
  //   hideProgressBar: false,
  //   closeOnClick: true,
  //   pauseOnHover: true,
  //   draggable: true,
  //   progress: undefined,
  //   theme: "light",
  // });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("🚀 ~ handleSubmit ~ Input:", Input);


    toast.success("Thanks for Your Reasponse!!", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });

    setInput({
      name: "",
      email: "",
      phone: "",
      msg: "",
    });
  };
  return (
    <>
      <div className="max_padd_container flexCenter flex-col pt-32">
        <section className="contact_section layout_padding">
          <div className="container bg-image2 text-center mb-10">
            <h1 className="h1 overlay-text">Contact Us</h1>
          </div>
          <div className="container container-bg">
            <div className="row">
              <div className="grid grid-cols-2">
                <div className="col-lg-7 col-md-6 px-0">
                  <div className="map_container">
                    <div className="map-responsive">
                      <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2903297.800112199!2d67.94240088750001!3d23.025174600000003!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395e858f1cb72273%3A0x48916094e60f4013!2sFashion!5e1!3m2!1sen!2sin!4v1732689138705!5m2!1sen!2sin"
                        width="500"
                        height="450"
                        style={{ border: 0 }}
                        allowFullScreen=""
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                      ></iframe>{" "}
                    </div>
                  </div>
                </div>

                <div className="d-flex justify-content-center align-items-center bg-white w-auto ">
                  <form
                    action="#"
                    className="w-96 h-96"
                    onSubmit={handleSubmit}
                  >
                    <div className="mb-3">
                      <input
                        type="text"
                        name="name"
                        value={Input.name}
                        onChange={(e) => handleChange(e)}
                        placeholder="Name"
                        className="h-12 p-3 w-96 border border-2"
                      />
                    </div>
                    <div className="mb-3">
                      <input
                        type="email"
                        name="email"
                        value={Input.email}
                        onChange={(e) => handleChange(e)}
                        placeholder="Email"
                        className="h-12 p-3 w-96 border border-2"
                      />
                    </div>
                    <div className="mb-3">
                      <input
                        type="text"
                        name="phone"
                        value={Input.phone}
                        onChange={(e) => handleChange(e)}
                        placeholder="Phone"
                        className="h-12 p-3 w-96 border border-2"
                      />
                    </div>
                    <div className="mb-4">
                      <textarea
                        className="message-box p-3 border border-2 h-24 w-96"
                        placeholder="Message"
                        rows="4"
                        name="msg"
                        value={Input.msg}
                        onChange={(e) => handleChange(e)}
                      ></textarea>
                    </div>
                    <div className="d-flex justify-content-center">
                      <button type="submit" className="btn_dark_rounded w-full">
                        SEND
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Contact;
