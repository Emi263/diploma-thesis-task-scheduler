import { createContext } from "react";
import { User, UserToken } from "../models/user";

interface authContext {
  userToken: UserToken | undefined;
  setUserToken: React.Dispatch<React.SetStateAction<UserToken | undefined>>;
  user: User | undefined;
  setUser: React.Dispatch<React.SetStateAction<User | undefined>>;
}

export const AuthContext = createContext<authContext>({
  userToken: {
    sub: 1,
    email: "",
    iat: 0,
    exp: 0,
  },
  setUserToken: () => {},
  user: {
    email: "",
    age: 0,
    name: "",
    createdAt: null,
    updatedAt: null,
    id: 1,
    isGoogleSignIn: false,
    shouldChangePassword: false,
    expoToken: "",
  },
  setUser: () => {},
});
