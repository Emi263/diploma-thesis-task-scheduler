import axios from "axios";
import { getAuthToken } from "./tokenMgmt";

export const apiUrl = "http://192.168.1.5:3000";

const getHeaders = async () => {
  const headers = {
    "Content-Type": "application/json",
    Authorization: "Bearer " + (await getAuthToken()),
  };

  return headers;
};

export const get = async (str: string) => {
  return axios.get(apiUrl + str, {
    headers: await getHeaders(),
  });
};

export const post = async (url: string, params: {} = {}) => {
  return axios.post(url, params, {
    headers: await getHeaders(),
  });
};
export const put = async (url: string, params: {} = {}) => {
  return axios.put(url, params, {
    headers: await getHeaders(),
  });
};
