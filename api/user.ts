import { User } from "../models/user";
import { get, apiUrl, put } from "../utils/apiMgmt";

export const getUser = async (id: number) => {
  try {
    const user = await get(`/users/${id}`);

    return user?.data;
  } catch (error) {
    console.log(error);
  }
};

export const updateUser = async ({ profileImage }): Promise<User> => {
  const { data } = await put(apiUrl + "/users/change-profile-pic", {
    profileImage,
  });

  return data;
};

export const updateUserToken = async (token: string) => {
  const { data } = await put(apiUrl + "/users/token", {
    expotoken: token,
  });
  return data;
};
