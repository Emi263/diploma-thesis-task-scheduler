import { get, apiUrl, put } from "../utils/apiMgmt";

export const getUser = async (id: number) => {
  try {
    const user = await get(`/users/${id}`);

    return user?.data;
  } catch (error) {
    console.log(error);
  }
};

export const updateUser = async ({ profileImage }) => {
  try {
    const { data } = await put(apiUrl + "/users/change-profile-pic", {
      profileImage,
    });

    return data;
  } catch (error) {
    console.log(error);
  }
};
