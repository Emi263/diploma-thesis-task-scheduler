import axios from "axios";

export const apiUrl = "http://192.168.1.5:3000";

export const get = (str: string) => {
  return axios.get(apiUrl + str);
};
export const post = (url: string, params: {} = {}) => {
  return axios.post(url, params);
};
