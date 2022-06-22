import jwtDecode from "jwt-decode";
import { getAuthToken } from "../utils/tokenMgmt";

export const getUserPayload = async (): Promise<any> => {
  try {
    const token = await getAuthToken();

    if (token) {
      const user = jwtDecode(token);
      return user;
    }
  } catch (error) {}
};

export const isSessionActive = async () => {
  const decoded = await getUserPayload();
  return (await decoded?.exp) * 1000 > new Date().getTime();
};

export const errorCodes = (status: number) => {
  const errors = {
    401: "Incorrect Credentials",
    403: "Incorrect Credentials",
  };
  return errors[status];
};
