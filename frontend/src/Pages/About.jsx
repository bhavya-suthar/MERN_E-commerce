import React from "react";
import about1 from "../assets/about1.jpg";
import about2 from "../assets/about2.jpg";
import about3 from "../assets/about3.jpg";
import about4 from "../assets/about4.jpg";

const About = () => {
  return (
    <>
      <div className="max_padd_container flexCenter flex-col pt-32">
        <div className="container bg-image text-center">
          <h1 className="h1 overlay-text">About Us</h1>
        </div>
      </div>
      <div className="grid grid-cols-2 m-8">
        <p className="d-flex flex-col justify-content-center align-items-center p-3 border-black">
          <h1 className="display-6">Welcome to The Fashion Store,</h1>
          <br /> your ultimate destination for trendy, high-quality, and
          affordable fashion. We believe that style should be accessible to
          everyone, and our mission is to bring the latest fashion trends right
          to your fingertips. At The Fashion Store, we curate a wide range of
          clothing and accessories for men, women, and kids, ensuring there's
          something for every style and occasion. From timeless classics to
          contemporary designs, our collection is designed to inspire confidence
          and celebrate individuality.
        </p>
        <div className="d-flex h-80 justify-content-center border-l-gray-50 border-l-2 w-auto">
          <img className="rounded-2xl" src={about2} />
        </div>
      </div>
      <div className="grid grid-cols-2 m-8">
        <div className="d-flex h-80 justify-content-center border-r-gray-50 border-r-2 w-auto">
          <img className="rounded-2xl" src={about3} />
        </div>

        <p className="d-flex flex-col justify-content-center align-items-center p-3 border-black">
          <h1 className="display-6 p-2">Why choose us?</h1> Premium Quality at
          Affordable Prices: We source our products from trusted manufacturers
          to guarantee exceptional quality without breaking the bank. We believe
          that great style should be accessible to everyone. Seamless Shopping
          Experience: Our user-friendly platform is designed to make your
          shopping journey smooth and enjoyable. With advanced search filters,
          easy navigation, and secure payment gateways, finding your perfect
          outfit has never been easier. Fast and Reliable Delivery: We
          understand the excitement of waiting for your favorite items to
          arrive. That’s why we ensure quick and reliable delivery services
          right to your doorstep. Customer-Centric Approach: At The Fashion
          Store, you’re more than just a customer—you’re part of our fashion
          family. Our dedicated customer support team is always here to assist
          you, ensuring your satisfaction every step of the way.
        </p>
      </div>
      <div className="grid grid-cols-2 m-8">
        <p className="d-flex justify-content-center align-items-center p-3 border-black">
          Our Vision To redefine online shopping by creating a platform where
          fashion meets convenience. Our goal is to empower individuals to
          express themselves confidently through clothing that reflects their
          personality and aspirations. Our Mission To bring high-quality,
          stylish, and affordable fashion to customers worldwide, while
          delivering an unparalleled shopping experience driven by innovation
          and customer satisfaction.Whether you're looking to upgrade your
          wardrobe, find the perfect gift, or stay ahead of the fashion game,
          The Fashion Store is here to make it happen. Join us on this journey
          and redefine your style with ease and confidence. Shop Now – Because
          Fashion Starts Here!
        </p>
        <div className="d-flex h-80 justify-content-center border-l-gray-50 border-l-2 w-auto">
          <img className="rounded-2xl" src={about4} />
        </div>
      </div>
    </>
  );
};

export default About;
