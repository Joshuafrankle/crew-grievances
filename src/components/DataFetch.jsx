import axios from "axios";
import useSWR from "swr";

const endpoint = "https://pattarai-grievances.herokuapp.com"; // http://localhost:5000

// const axiosGet = (url) => axios.get(url).then((res) => res.data);
// const axiosPost = (url) => axios.post(url).then((res) => res.data);

export function useSWRGet(url) {
  const { data, error } = useSWR(`${endpoint}${url}`, (url) =>
    axios.get(url).then((res) => res.data)
  );
  return {
    data: data,
    isLoading: !error && !data,
    isError: error,
  };
}

export function useSWRPost(url, reqData) {
  const { data, error } = useSWR(`${endpoint}${url}`, (url) =>
    axios.post(url, { token: reqData }).then((res) => res.data)
  );
  return {
    data: data,
    isLoading: !error && !data,
    isError: error,
  };
}
