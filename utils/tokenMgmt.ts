import AsyncStorage from "@react-native-async-storage/async-storage";
import jwtDecode from "jwt-decode";

export const setAuthToken =  (token: string) => {
   localStorage.setItem("token", token);
};
export const getAuthToken =  () => {
  const token =  localStorage.getItem("token");
  return token;
};

export const clearAuthData =  () => {
   localStorage.removeItem("token");
};



export const decode=(token:string)=>{
 const t= jwtDecode(token)
 console.log(t);
 
}