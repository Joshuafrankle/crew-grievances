import axios from 'axios';

const endpoint = 'https://jsonplaceholder.typicode.com/users';

export function axiosRequest(url = "/", method = "GET", data = {}) {
  const token = localStorage.getItem("token") ?? "null";
  return axios.request({
    url: `${endpoint}${url}`,
    method: method,
    headers: {
      Authorization: `Bearer ${token}`,
    },
    data: data,
  });
}
