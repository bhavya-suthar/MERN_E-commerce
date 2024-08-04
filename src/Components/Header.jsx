import { Link } from "react-router-dom"
import logo from '../assets/logo.svg'
import Navbar from "./Navbar"
import { useState } from "react"

const Header = () => {

  const [menuOpened , setMenuOpened] = useState(true)

  return (
    <header className="fixed top-0 left-0 m-auto max_padd_container w-full bg-white ring-1 ring-slate-900/5 z-10 ">
    <div className="px-4 flexBetween py-3 max-xs:px-2">
        <div>
            <Link><img src={logo} alt="" height={66} width={88}/></Link>
        </div>
        {/* Navbar Desktop*/}
        <Navbar containerStyles={"hidden md:flex gap-x-5 xl:gap-x-10 medium-15"}/>

        {/* Navbar Mobile */}
        <Navbar containerStyles={`${menuOpened ? "flex item-start flex-col-gap-y-12 fixed top-20 right-8 p-12 bg-white rounded-3xl shadow-md w-64 medium-16 ring-1 ring-slate-900/5 transition-all duration-300" 
        : "flex item-start flex-col-gap-y-12 fixed top-20 right-8 p-12 bg-white rounded-3xl shadow-md w-64 medium-16 ring-1 ring-slate-900/5 transition-all duration-300"}`}/>

        {/* Buttons */}
        <div>Buttons</div>
    </div>
    </header>
  )
}

export default Header
