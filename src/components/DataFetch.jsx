import axios from "axios";

const endpoint = "http://localhost:5000/api";

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
