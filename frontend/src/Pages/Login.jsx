import { useState } from "react";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';


const Login = () => {

  const notify = () => toast.success("Login SuccessFul!",{
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "dark",
    });

  const notifyError = () => toast.error("Please Enter valid Credential!",{
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "dark",
    });

    const notifySignUp = () => toast.success("Registration SuccessFul!",{
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      });
  
    const notifyErrorSignUp = () => toast.error("Please Enter valid Credential!",{
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
  const [formData,setFormData] = useState({
    username:"",
    email:"",
    password:""
  })

  const changeHandler = (e)=>{
    setFormData({...formData,[e.target.name]:e.target.value})
    
  }

  const login = async ()=>{
    console.log(" inside login function",formData)
    let responseData;
    await fetch('http://localhost:4000/login',{
      method:"POST",
      headers:{
        Accept:'application/formData',
        'Content-Type':'application/json'
      },
      body:JSON.stringify(formData)
    }).then((response)=>response.json()).then((data)=>responseData = data)

    if(responseData.success){
      localStorage.setItem('auth-token',responseData.token);
      window.location.replace('/')
      notify()
    }else{
      // alert(responseData.errors)
      notifyError()
    }
  }

  const signup = async () =>{
    console.log("inside sign up function",formData);
    let responseData;
    await fetch('http://localhost:4000/signup',{
      method:"POST",
      headers:{
        Accept:'application/formData',
        'Content-Type':'application/json'
      },
      body:JSON.stringify(formData)
    }).then((response)=>response.json()).then((data)=>responseData = data)

    if(responseData.success){
      localStorage.setItem('auth-token',responseData.token);
      window.location.replace('/')
      notifySignUp()
    }else{
      // alert(responseData.errors)
      notifyErrorSignUp()
    }
  }

  return (
    <section className="max_padd_container flexCenter flex-col pt-32">
      <div className="max-w-[555px] h-[600px] bg-white m-auto px-14 py-10 rounded-md">
        <h3 className="h3">{state}</h3>
        <div className="flex flex-col gap-4 mt-7">
          {state === "Sign Up" ? (
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={changeHandler}
              placeholder="Your Name"
              className="h-14 w-full pl-5 bg-slate-900/5 outline-none rounded-xl"
            />
          ) : (
            ""
          )}
          <input
            type="text"
            name="email"
            value={formData.email}
            onChange={changeHandler}
            placeholder="Email Address"
            className="h-14 w-full pl-5 bg-slate-900/5 outline-none rounded-xl"
          />
          <input
            type="text"
            name="password"
            value={formData.password}
            onChange={changeHandler}
            placeholder="Password"
            className="h-14 w-full pl-5 bg-slate-900/5 outline-none rounded-xl"
          />
        </div>
        <button
          onClick={() => {
            state == "Login" ? login() : signup();

          }}
          className="btn_dark_rounded my-5 w-full !rounded-md"
        >
          Countinue
        </button>
        {state === "Sign Up" ? (
          <p className="text-black font-bold">
            Already have an account?
            <span
              onClick={() => {
                setState("Login");
              }}
              className="text-secondary underline cursor-pointer"
            >
              Login
            </span>
          </p>
        ) : (
          <p className="text-black font-bold">
            Create an account?
            <span
              onClick={() => {
                setState("Sign Up");
              }}
              className="text-secondary underline cursor-pointer"
            >
              Click Here
            </span>
          </p>
        )}
        <div className="flexCenter mt-6 gap-3">
          <input type="checkbox" name="" id="" />
          <p>By continuing, i agree to the terms of use & privacy policy</p>
        </div>
      </div>
    </section>
  );
};

export default Login;
