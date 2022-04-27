import { useState, useEffect } from "react";
import axios from "axios";

export default function useFetch(url, method = "GET", axiosData = {}) {
  const token = localStorage.getItem("token") ?? "null";
  const controller = new AbortController();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  async function fetchData() {
    try {
      const res = await axios.request({
        url: `${process.env.REACT_APP_ENDPOINT}${url}`,
        method: method,
        headers: {
          Authorization: `Bearer ${token}`,
        },
        signal: controller.signal,
        data: axiosData,
      });
      setData(res.data);
    } catch (err) {
      if (err.name === "AbortError") {
        return;
      } else if (!err.response) {
        setError("Check network connectivity");
      } else if (err.response.status >= 500) {
        setError("Internal server error");
      } else {
        setError(err.message);
      }
    }
    setLoading(false);
  }

  useEffect(() => {
    fetchData();
    return () => controller.abort();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { data, loading, error };
}
