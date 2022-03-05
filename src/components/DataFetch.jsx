import axios from 'axios';

const endpoint = 'http://127.0.0.1:5000/api';

export function axiosRequest(url, method="GET", data={}) {
  return axios.request({
    method: method,
    url: `${endpoint}${url}`,
    data: data,
  });
}
