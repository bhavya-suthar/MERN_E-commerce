import React from "react";
import Hero from "../Components/Hero";
import NewCollection from "../Components/NewCollection";
import Offer from '../Components/Offer'
import Popular from "../Components/Popular";
import NewsLetter from "../Components/NewsLetter";

const Home = () => {
  return (
    <>
      <Hero />
      <Popular/>
      <Offer/>
      <NewCollection/>
      {/* <NewsLetter/> */}
    </>
  );
};

export default Home;
