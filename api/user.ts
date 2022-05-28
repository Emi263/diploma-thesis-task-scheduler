import { get, apiUrl } from "../utils/apiMgmt";

export const getUser = async (id: number) => {
  const user = await get(`/users/user/${id}`);
  return user?.data;
};
