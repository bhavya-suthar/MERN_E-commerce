// import { useEffect } from "react";
import Navbar from "./Components/Navbar";
import Admin from "./Pages/Admin";
// import { useNavigate } from "react-router-dom"; // Ensure correct import

export default function App() {
  // const navigate = useNavigate();

  // useEffect(() => {
  //   const adminEmail = "admin123@gmail.com";
  //   const adminPassword = "admin123";

  //   // Check localStorage or a secure store for authentication
  //   const email = localStorage.getItem("email");
  //   const password = localStorage.getItem("password");

  //   // Validate credentials
  //   if (email === adminEmail && password === adminPassword) {
  //     console.log("Access granted to admin");
  //   } else {
  //     alert("Unauthorized access");
  //     window.location.href = "http://localhost:5174/"; // Redirect to admin panel
  //   }
  // }, [navigate]);
  
  return (
    <main className="bg-primarygray text-tertiary">
      <Navbar />
      <Admin />
    </main>
  );
}
