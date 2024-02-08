import { useState, useEffect } from "react";
import { fetchDataFromApi } from "../utils/api.js";

const useFetch = (url) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading("Loading...");
    setData(null);
    setError(null);

    fetchDataFromApi(url)
      .then((res) => {
        setData(res);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        setError("Something went wrong...");
      });
  }, [url]);

  return { data, loading, error };
};

export default useFetch;
