import { get, apiUrl } from "../utils/apiMgmt";

export const getUser = async (id: number) => {
  try {
    const user = await get(`/users/${id}`);

    return user?.data;
  } catch (error) {
    console.log(error);
  }
};
