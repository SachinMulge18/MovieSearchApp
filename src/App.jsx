import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HeroBanner from "../src/pages/home/heroBaner/HeroBanner";
import Details from "../src/pages/details/Details";
import SearchResult from "../src/pages/searchResult/SearchResult";
import Explore from "../src/pages/explore/Explore";
import PageNotFound from "../src/pages/404/PageNotFound";
import Header from "../src/components/header/Header";
import Footer from "../src/components/footer/Footer";
import Home from "../src/pages/home/Home";
import { useSelector, useDispatch } from "react-redux";
import { fetchDataFromApi } from "./utils/api.js";
import { getApiConfiguration, getGeners } from "./store/homeSlice.js";

const App = () => {
  const dispatch = useDispatch();
  const { url } = useSelector((state) => state.home);
  const [loading, setLoading] = useState(null);

  const fetchApiConfig = () => {
    fetchDataFromApi("/configuration").then((res) => {
      // console.log(res);
      const url = {
        backdrop: res.images.secure_base_url + "original",
        poster: res.images.secure_base_url + "original",
        profile: res.images.secure_base_url + "original",
      };
      dispatch(getApiConfiguration(url));
    });
  };

  const genersCall = async () => {
    let promises = [];
    let endpoints = ["tv", "movie"];
    let allGeners = {};

    endpoints.forEach((url) => {
      promises.push(fetchDataFromApi(`/genre/${url}/list`));
    });
    const data = await Promise.all(promises);

    data?.map(({ genres }) => {
      return genres.map((item) => (allGeners[item?.id] = item));
    });

    dispatch(getGeners(allGeners));
  };

  useEffect(() => {
    fetchApiConfig();
    genersCall();
  }, []);

  if (loading) return <h1 style={{ background: "red" }}>Loading</h1>;
  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/:mediaType/:id" element={<Details />} />
          <Route path="/search/:query" element={<SearchResult />} />
          <Route path="/explore/:mediaType" element={<Explore />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
};

export default App;
