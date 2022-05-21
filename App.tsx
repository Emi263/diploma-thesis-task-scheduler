import { StatusBar } from "expo-status-bar";
import { Image, StyleSheet, Text, View } from "react-native";
import HomePage from "./screens/intro/IntroOne";
import Screens from "./ScreenIndex";
import "react-native-gesture-handler";
import { QueryClient, QueryClientProvider } from "react-query";
import { AuthContext } from "./context/AuthContext";
import { useState } from "react";
import { getUserPayload } from "./helper/helpers";
export default function App() {
  const [user, setUser] = useState(getUserPayload()) as any;

  const context = {
    user,
    setUser,
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
