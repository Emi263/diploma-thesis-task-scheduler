import { AxiosResponse } from "axios";
import { apiUrl, get, post, put } from "../utils/apiMgmt";

export const login = (
  email: string,
  password: string
): Promise<AxiosResponse<any, any>> => {
  return post(apiUrl + "/auth/login", { email, password });
};

export const googleLogin = (
  token: string
): Promise<AxiosResponse<any, any>> => {
  return post(apiUrl + "/auth/google-auth", {
    token,
  });
};

export const signup = (
  email: string,
  password: string,
  name: string,
  age: string
): Promise<AxiosResponse<any, any>> => {
  return post(apiUrl + "/auth/signup", { email, password, name, age });
};

export const changePassword = async (
  currentPassword: string,
  password: string
): Promise<AxiosResponse<any, any>> => {
  return put(apiUrl + "/auth/change-password", {
    currentPassword,
    password,
  });
};

export const forgotPassword = async (
  email: string
): Promise<AxiosResponse<any, any>> => {
  return post(apiUrl + "/auth/forgot-password", { email });
};
