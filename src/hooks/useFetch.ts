import { useState, useEffect, useRef } from 'react';
import useAuth from './useAuth';
import axios, { Method } from 'axios';

export default function useFetch(
  endpoint: string,
  method: Method = 'GET',
  axiosData = {}
) {
  const controller = new AbortController();
  const token = localStorage.getItem('token') ?? 'null';
  const isMounted = useRef(false); // In production, change this to false
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<any>({});
  const [error, setError] = useState<string>('');
  const [reload, setReload] = useState(false);
  const { setRole } = useAuth();
  const refresh = () => setReload(!reload);

  async function fetchData() {
    try {
      const res = await axios.request({
        url: `${process.env.REACT_APP_BACKEND_URL}${endpoint}`,
        method,
        headers: {
          Authorization: `Bearer ${token}`,
        },
        data: axiosData,
        signal: controller.signal,
      });
      const resData = res.data.data ? res.data.data : res.data;
      if (resData.role) {
        setRole(resData.role);
      }
      setData(resData);
      setLoading(false);
    } catch (err: any) {
      if (err.name === 'CanceledError') {
        return;
      }
      if (!err.response) {
        setError('No server response');
      } else if (err.response.status >= 500) {
        setError('Internal server error');
      } else {
        setError(err.message);
      }
      setLoading(false);
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

  return {
    data,
    loading,
    error,
    refresh,
  };
}
