
const Login = () => {
  return (
    <section className="max_padd_container flexCenter flex-col pt-32">
    <div className="max-w-[555px] h-[600px] bg-white m-auto px-14 py-10 rounded-md">
    <h3 className="h3">Sign Up</h3>
    <div className="flex flex-col gap-4 mt-7">
      <input type="text" placeholder="Your Name" className="h-14 w-full pl-5 bg-slate-900/5 outline-none rounded-xl" />
      <input type="text" placeholder="Email Address" className="h-14 w-full pl-5 bg-slate-900/5 outline-none rounded-xl" />
      <input type="text" placeholder="Password" className="h-14 w-full pl-5 bg-slate-900/5 outline-none rounded-xl" />
    </div>
    <button>Countinue</button>
    <p>Already have an account? <span>Login</span></p>
    <div>
      <input type="checkbox" name="" id="" />
      <p>By continuing, i agree to the terms of use & privacy policy</p>
    </div>
    </div>
    </section>
  )
}

export default Login
