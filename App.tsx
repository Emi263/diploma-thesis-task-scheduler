import { StatusBar } from "expo-status-bar";
import { Image, StyleSheet, Text, View } from "react-native";
import HomePage from "./screens/intro/IntroOne";
import Screens from "./ScreenIndex";
import "react-native-gesture-handler";
import { QueryClient, QueryClientProvider } from "react-query";
import { AuthContext } from "./context/AuthContext";
import { useEffect, useState } from "react";
import { getUserPayload } from "./helper/helpers";
import { DecodedUser, User } from "./models/user";


export default function App() {
  const [user, setUser] = useState<User|undefined>();
  const [decodedUser,setDecodedUser]=useState<DecodedUser|undefined>()

  useEffect(() => {
    let isMounted = true;

    const userData = async () => {
      const user = await getUserPayload();
      if (isMounted) {
        setUser(user);
      }
    };
    userData();
    return () => {
      isMounted = false;
    };
  }, []);

  const context = {
    user,
    setUser,
    decodedUser,
    setDecodedUser
  };

  const client = new QueryClient();
  return (
    <AuthContext.Provider value={context}>
      <QueryClientProvider client={client}>
        <Screens />
      </QueryClientProvider>
    </AuthContext.Provider>
  );
}
