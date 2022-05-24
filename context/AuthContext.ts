import { createContext } from "react";
import { DecodedUser, User } from "../models/user";

interface authContext {
  user: User | undefined;
  setUser: React.Dispatch<React.SetStateAction<User | undefined>>;
  decodedUser: DecodedUser| undefined;
  setDecodedUser: React.Dispatch<React.SetStateAction<DecodedUser | undefined>>;
}

export const AuthContext = createContext<authContext>({
  user: {
    name: "",
    email: "",
    surname: "",
    age: 0,
  },
  setUser: () => {},
  decodedUser: {
    sub:1,
    email:'',
    iat:0,
    exp:0
  },
  setDecodedUser: ()=>{}
});
