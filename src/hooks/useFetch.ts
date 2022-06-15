import { useState, useEffect, useRef } from "react";
import axios, { Method } from "axios";

export default function useFetch(
  endpoint: string,
  method: Method = "GET",
  axiosData = {}
) {
  const controller = new AbortController();
  const token = localStorage.getItem("token") ?? "null";
  const isMounted = useRef(true); // In production, change this to false
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<any>({});
  const [error, setError] = useState<string>("");
  const [reload, setReload] = useState(false);
  const refresh = () => setReload(!reload);

  async function fetchData() {
    try {
      const res = await axios.request({
        url: `${process.env.REACT_APP_BACKEND_URL}${endpoint}`,
        method: method,
        headers: {
          Authorization: `Bearer ${token}`,
        },
        data: axiosData,
        signal: controller.signal,
      });
      setData(res.data.data ? res.data.data : res.data);
      setError("");
      setLoading(false);
    } catch (err: any) {
      if (err.name === "AbortError") {
        return;
      } else {
        if (!err.response) {
          setError("No server response");
        } else if (err.response.status >= 500) {
          setError("Internal server error");
        } else {
          setError(err.message);
        }
        setLoading(false);
      }
    }
  }

  useEffect(() => {
    if (isMounted.current) {
      isMounted.current = false;
      return;
    }
    fetchData();
    return () => controller.abort();
    // eslint-disable-next-line
  }, [reload]);

  return { data, loading, error, refresh };
}
