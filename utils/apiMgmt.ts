import axios from "axios";
import { getAuthToken } from "./tokenMgmt";

export const apiUrl = "http://192.168.1.5:3000";

export const get = (str: string) => {
  return axios.get(apiUrl + str);
};

getAuthToken();

export const post = async (url: string, params: {} = {}) => {
  return axios.post(url, params, {
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + (await getAuthToken()),
    },
  });
};
export const put = async (url: string, params: {} = {}) => {
  return axios.put(url, params, {
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + (await getAuthToken()),
    },
  });
};
