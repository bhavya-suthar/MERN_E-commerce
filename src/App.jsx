import { BrowserRouter, Route, Routes } from "react-router-dom"
import Header from "./Components/Header"
import Home from "./Pages/Home"
import Category from './Pages/Category'
import Cart from './Pages/Cart'
import Login from './Pages/Login'
import Product from './Pages/Product'
import Footer from './Components/Footer'

export default function App() {
  return (
    <main className="bg-primary text-tertiary">
    <BrowserRouter>

    <Header/>
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/mens" element={<Category/>}/>
      <Route path="/womens" element={<Category/>}/>
      <Route path="/kids" element={<Category/>}/>
      <Route path="/product" element={<Product/>}>
        <Route path=":productId" element={<Product/>}/>
      </Route>
      <Route path="/cart-page" element={<Cart/>}/>
      <Route path="/login" element={<Login/>}/>
    </Routes>
    <Footer/>
    </BrowserRouter>
    </main>
   )
}