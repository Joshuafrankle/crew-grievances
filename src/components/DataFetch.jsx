import axios from 'axios';

const endpoint = 'https://jsonplaceholder.typicode.com/users';

export function axiosRequest(url="/", method="GET", data={}) {
  return axios.request({
    method: method,
    url: `${endpoint}${url}`,
    data: data,
  });
}
