import { NavLink } from "react-router-dom"
import { MdCategory, MdContacts, MdHomeFilled, MdShop2 } from "react-icons/md"
import { TbMoodKidFilled } from "react-icons/tb"
import { IoAlertCircle } from "react-icons/io5";

const Navbar = ({containerStyles}) => {
  return (
    <nav className={`${containerStyles }`}>
    <NavLink to={'/'} className={({isActive})=> isActive ? "active_link" : ""}><div className="flexCenter gap-x-1"><MdHomeFilled/>Home</div></NavLink>
    <NavLink to={'/mens'} className={({isActive})=> isActive ? "active_link" : ""}><div className="flexCenter gap-x-1"><MdCategory/>Men's</div></NavLink>
    <NavLink to={'/womens'} className={({isActive})=> isActive ? "active_link" : ""}><div className="flexCenter gap-x-1"><MdShop2/>Women's</div></NavLink>
    <NavLink to={'/kids'} className={({isActive})=> isActive ? "active_link" : ""}><div className="flexCenter gap-x-1"><TbMoodKidFilled />kid's</div></NavLink>
    <NavLink to={'/about'} className={({isActive})=> isActive ? "active_link" : ""}><div className="flexCenter gap-x-1"><IoAlertCircle />    About Us</div></NavLink>
    <NavLink to={'/contact'} className={({isActive})=> isActive ? "active_link" : ""}><div className="flexCenter gap-x-1"><MdContacts/>Contact Us</div></NavLink>

    </nav>
  )
}

export default Navbar
