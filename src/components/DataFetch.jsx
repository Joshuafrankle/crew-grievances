import axios from 'axios';

const endpoint = 'http://127.0.0.1:5000/api';

export async function axiosRequest(url="/", method="GET", data={}) {
  return await axios.request({
    method: method,
    url: `${endpoint}${url}`,
    data: data,
  });
}
