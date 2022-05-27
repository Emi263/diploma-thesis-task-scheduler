import AsyncStorage from "@react-native-async-storage/async-storage";
import jwtDecode from "jwt-decode";

export const setAuthToken = async (token: string): Promise<any> => {
  try {
    await AsyncStorage.setItem("token", token);
  } catch (e) {
    console.log(e);
  }
};
export const getAuthToken = async () => {
  const token = await AsyncStorage.getItem("token");
  return token;
};

export const clearAuthData = async () => {
  await AsyncStorage.removeItem("token");
};

export const decode = (token: string) => {
  const t = jwtDecode(token);
  console.log(t);
};
