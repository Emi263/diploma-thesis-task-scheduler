import jwtDecode from "jwt-decode";
import { getAuthToken } from "../utils/tokenMgmt";

export const getUserPayload = (): any => {
  try {
    const token = getAuthToken();
    if (token) {
      const user = jwtDecode(token);
      return user;
    }
  } catch (error) {}
};

export const isSessionActive = () => {
  const decoded = getUserPayload();
  return decoded?.exp * 1000 > new Date().getTime();


  
};
