import React from "react";
import HeroBanner from "../home/heroBaner/HeroBanner";
import Trending from "../home/trending/Trending";
import "./style.scss";
import Popular from "./popular/Popular";
import TopRated from "./topRated/TopRated";

const Home = () => {
  return (
    <>
      <HeroBanner />
      <Trending />
      <Popular />
      <TopRated />
    </>
  );
};

export default Home;
