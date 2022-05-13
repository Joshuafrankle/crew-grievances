import axios from "axios";

const endpoint = "https://grievance-portal-api-production.up.railway.app/"; // "http://localhost:5000/api"

export function axiosRequest(url, method = "GET", data = {}) {
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
