import axios, { Method } from 'axios';

export default async function fetchData(
  endpoint: string,
  method: Method = 'GET',
  axiosData = {}
) {
  const token = localStorage.getItem('token') ?? 'null';
  try {
    const res = await axios.request({
      url: `${process.env.REACT_APP_BACKEND_URL}${endpoint}`,
      method,
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: axiosData,
    });
    return [res.data.data ? res.data.data : res.data, null];
  } catch (err: any) {
    let error = '';
    if (!err.response) {
      error = 'No server response';
    } else if (err.response.status >= 500) {
      error = 'Internal server error';
    } else {
      error = err.response.data.message ? err.response.data.message : err.message;
    }
    return [null, error];
  }
}
