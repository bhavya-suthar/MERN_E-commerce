// import React from 'react'
import output from "../assets/output.png";
// import profileImg from "../assets/profile.png"
import user from "../assets/user.svg";


const Navbar = () => {
  const handleLogout = () => {
       window.location.href = "http://localhost:5174/"; // Redirect to admin panel

  };
  return (
    <nav className="max_padd_container flexBetween  bg-white py-2 ring-1 ring-slate-900/5 relative">
      <div>
        <img src={output} alt="" className="h-10" />
      </div>
      <div className="uppercase bold-22 text-white bg-secondary px-3 rounded-md tracking-widest line-clamp-1 max-xs:bold-18 max-xs:py-2 max-xs:px-1">
        Admin Panel
      </div>
      {/* <div><img src={profileImg} alt="" className='h-12 w-12 rounded-full' /></div> */}
      <div 
      // className=" text-white bg-secondary px-3 rounded-md max-xs:bold-18 max-xs:py-2 max-xs:px-1"
      className={"btn_secondary_rounded flexCenter gap-x-2 "}  
      >
        <button onClick={handleLogout} className="flex flex-row ">              <img src={user} alt="logoutIcon" height={19} width={19} />
        Logout</button>
      </div>
    </nav>
  );
};

export default Navbar;
