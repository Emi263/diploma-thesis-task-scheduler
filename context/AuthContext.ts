import { createContext } from "react";

interface authContext {
user: any,
setUser:any

}




export const AuthContext=createContext<authContext>({user:'',setUser:()=>{}});

