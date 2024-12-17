import { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const notify = () =>
    toast.success("Login Successful!", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });

  const notifyError = () =>
    toast.error("Please Enter Valid Credentials!", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });

  const notifySignUp = () =>
    toast.success("Registration Successful!", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });

  const notifyErrorSignUp = () =>
    toast.error("Please Enter Valid Credentials!", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });

  const [state, setState] = useState("Login");
  const [formData, setFormData] = useState({
    fname: "",
    lname: "",
    gender: "male",
    email: "",
    password: "",
    conPassword: "",
    MobileNo: "",
  });

  const changeHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const login = async () => {
    console.log("Inside login function", formData);
    if (
      formData.email === "admin123@gmail.com" &&
      formData.password === "admin123"
    ) {
      localStorage.setItem("email", formData.email);
      localStorage.setItem("password", formData.password);

      notify();
      window.location.href = "http://localhost:5173/";
      return;
    }
    let responseData;
    await fetch("http://localhost:4000/login", {
      method: "POST",
      headers: {
        Accept: "application/formData",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => (responseData = data));

    if (responseData.success) {
      localStorage.setItem("auth-token", responseData.token);
      window.location.replace("/");
      notify();
    } else {
      notifyError();
    }
  };

  const signup = async () => {
    console.log("Inside sign up function", formData);
    let responseData;
    await fetch("http://localhost:4000/signup", {
      method: "POST",
      headers: {
        Accept: "application/formData",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => (responseData = data));

    if (responseData.success) {
      localStorage.setItem("auth-token", responseData.token);
      window.location.replace("/");
      notifySignUp();
    } else {
      notifyErrorSignUp();
    }
  };

  return (
    <section className="max_padd_container flexCenter flex-col pt-32">
      <div className="w-[443px] h-auto  bg-white px-4 py-5 rounded-md">
        <h3 className="text-2xl font-bold text-center mb-6">{state}</h3>
        <div className="flex flex-col gap-4">
          {state === "Sign Up" && (
            <>
              <div className="flex gap-4">
                <input
                  type="text"
                  name="fname"
                  value={formData.fname}
                  onChange={changeHandler}
                  placeholder="First Name"
                  className="input-field"
                />
                <input
                  type="text"
                  name="lname"
                  value={formData.lname}
                  onChange={changeHandler}
                  placeholder="Last Name"
                  className="input-field"
                />
              </div>
              <div className="flex items-center gap-4">
                <label className="text-gray-600">Gender:</label>
                <label>
                  <input
                    type="radio"
                    name="gender"
                    value="male"
                    checked={formData.gender === "male"}
                    onChange={changeHandler}
                    className="mr-2"
                  />
                  Male
                </label>
                <label>
                  <input
                    type="radio"
                    name="gender"
                    value="female"
                    checked={formData.gender === "female"}
                    onChange={changeHandler}
                    className="mr-2"
                  />
                  Female
                </label>
              </div>
              <input
                type="number"
                name="MobileNo"
                value={formData.MobileNo}
                onChange={changeHandler}
                placeholder="Mobile Number"
                className="input-field"
              />
            </>
          )}
          <>
            {" "}
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={changeHandler}
              placeholder="Email"
              className="input-field"
            />
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={changeHandler}
              placeholder="Password"
              className="input-field"
            />
          </>
        </div>
        {state === "Sign Up" ? (
          <p className="mt-4 text-sm text-center">
            Already have an account?{" "}
            <span
              onClick={() => setState("Login")}
              className="text-blue-500 cursor-pointer"
            >
              Login
            </span>
          </p>
        ) : (
          <p className="mt-4 text-sm text-center">
            Create an account?{" "}
            <span
              onClick={() => setState("Sign Up")}
              className="text-blue-500 cursor-pointer"
            >
              Sign Up
            </span>
          </p>
        )}
        <button
          onClick={() => (state === "Login" ? login() : signup())}
          className="btn-primary mt-6 w-full"
        >
          Continue
        </button>
      </div>
    </section>
  );
};

export default Login;
