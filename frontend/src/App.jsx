import { BrowserRouter, Route, Routes, Navigate, Outlet, useLocation } from "react-router-dom";
import Header from "./Components/Header";
import Home from "./Pages/Home";
import Category from "./Pages/Category";
import PropTypes from "prop-types";
import Login from "./Pages/Login";
import Footer from "./Components/Footer";
import Product from "./Pages/Product";
import CartItems from "./Components/CartItems";
// import bannermens from "./assets/bannermens.png";
// import bannerwomens from "./assets/bannerwomens.png";
// import bannerkids from "./assets/bannerkids.png";
// import bannermens from "./assets/mensbanner.jfif";
import bannermens from "./assets/mens_banner1.png";
// import bannerwomens from "./assets/womenbenner.jfif";
import bannerwomens from "./assets/womens_banner.png";
// import bannerwomens from "./assets/womenbanner2.jfif";
// import bannerkids from "./assets/kidsbanner2.png";
// import bannerkids from "./assets/kidsbenner.jfif";
import bannerkids from "./assets/kids_banner2.png";
import ProceedToCheckout from "./Components/ProceedToCheckout";

import { ToastContainer } from 'react-toastify';
import About from "./Pages/About";
import Contact from "./Pages/Contact";



export default function App() {
  // Simulate an authentication check (should be replaced with real token validation logic)
  const isAuthenticated = () => {
    const token = localStorage.getItem("auth-token");
    return token !== null && token !== undefined;
  };

  // Public Route: Redirect to Home if authenticated
  const PublicRoute = ({ children }) => {
    if (isAuthenticated()) {
      return <Navigate to="/" replace />;
    }
    return children;
  };

  PublicRoute.propTypes = {
    children: PropTypes.node.isRequired,
  };

  // Private Route: Redirect to Login if not authenticated
  const PrivateRoute = () => {
    const location = useLocation();
    if (!isAuthenticated()) {
      return <Navigate to="/login" state={{ from: location }} replace />;
    }
    return <Outlet />;
  };

  return (
    <main className="bg-primarygray text-tertiary">
      <BrowserRouter>
        <Header />
        <Routes>
          {/* Public Routes */}

          <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />
          <Route path="/" element={<Home />} />
          <Route path="/mens" element={<Category category="men" banner={bannermens} />} />
          <Route path="/womens" element={<Category category="women" banner={bannerwomens} />} />
          <Route path="/kids" element={<Category category="kid" banner={bannerkids} />} />
          <Route path="/about" element={<About/>} />
          <Route path="/contact" element={<Contact/>} />

          {/* Private Routes */}
          <Route element={<PrivateRoute />}>
            <Route path="/product" element={<Product />} />
            <Route path="/product/:productId" element={<Product />} />
            <Route path="/cart-page" element={<CartItems />} />
            <Route path="/paymentform" element={<ProceedToCheckout />} />
          </Route>
        </Routes>
        <Footer />
      </BrowserRouter>
      <ToastContainer />

    </main>
  );
}
