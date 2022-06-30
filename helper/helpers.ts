import jwtDecode from "jwt-decode";
import { getAuthToken } from "../utils/tokenMgmt";
import moment from "moment";

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

export const formatDate = (date: Date) => {
  let dt = moment(date);

  if (moment().diff(dt, "days") >= 2) {
    return dt.fromNow(); // '2 days ago' etc.
  }
  return dt.calendar().split(" ")[0];
};
