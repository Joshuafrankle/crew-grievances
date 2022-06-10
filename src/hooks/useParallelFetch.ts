import { useState, useEffect } from "react";
import axios, { Method } from "axios";

interface IRequestArgs {
  endpoint: string;
  method?: Method;
  data?: any;
}

export default function useParallelFetch(requests: IRequestArgs[]) {
  const controller = new AbortController();
  const token = localStorage.getItem("token") ?? "null";
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState<string>("");

  async function fetchData() {
    const promises = requests.map((request: IRequestArgs) =>
      axios.request({
        url: `${process.env.REACT_APP_BACKEND_URL}${request.endpoint}`,
        method: request.method ? request.method : "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        data: request.data ? request.data : {},
        signal: controller.signal,
      })
    );

    try {
      const res = await Promise.allSettled(promises);
      setData(res);
    } catch (err: any) {
      if (err.name === "AbortError") {
        return;
      } else if (!err.response) {
        setError("No server response");
      } else if (err.response.status >= 500) {
        setError("Internal server error");
      } else {
        setError(err.message);
      }
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchData();
    return () => controller.abort();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { data, loading, error };
}
