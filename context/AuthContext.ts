import { createContext } from "react";
import {  User } from "../models/user";

interface authContext {
  user: User | undefined;
  setUser: React.Dispatch<React.SetStateAction<User | undefined>>;

}

export const AuthContext = createContext<authContext>({
  user: {
    sub:1,
    email:'',
    iat:0,
    exp:0
  },
  setUser: () => {}
});
