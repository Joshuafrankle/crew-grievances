import axios from 'axios';

const endpoint = 'http://127.0.0.1:5000/api';

export function axiosGet(url) {
  return axios.request({
    method: 'GET',
    url: `${endpoint}${url}`,
  });
}

export function axiosPost(url, data={}) {
  return axios.request({
    method: 'POST',
    url: `${endpoint}${url}`,
    data: data,
  });
}

export function axiosPatch(url, data={}) {
  return axios.request({
    method: 'PATCH',
    url: `${endpoint}${url}`,
    data: data,
  });
}

export function axiosDelete(url, data={}) {
  return axios.request({
    method: 'DELETE',
    url: `${endpoint}${url}`,
    data: data,
  });
}