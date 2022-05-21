import { AxiosResponse } from "axios";
import { apiUrl, get, post } from "../utils/apiMgmt";

export const login = (
  email: string,
  password: string
): Promise<AxiosResponse<any, any>> => {
  return post(apiUrl + "/auth/login", { email, password });
};

export const signup = (
  email: string,
  password: string
  ,
  name: string,
  surname: string
): Promise<AxiosResponse<any, any>> => {
  return post(apiUrl + "/auth/signup", { email, password,name,surname });
};
