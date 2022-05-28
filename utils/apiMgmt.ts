import axios from "axios";

export const apiUrl = "http://192.168.100.11:3000";

export const get = (str: string) => {
  return axios.get(apiUrl + str);
};
export const post = (url: string, params: {} = {}) => {
  return axios.post(url, params);
};
