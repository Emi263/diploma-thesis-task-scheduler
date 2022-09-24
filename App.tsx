import { StatusBar, View } from "react-native";
import Screens from "./ScreenIndex";
import "react-native-gesture-handler";
import { QueryClient, QueryClientProvider } from "react-query";
import { AuthContext } from "./context/AuthContext";
import { useCallback, useEffect, useState } from "react";
import { getUserPayload, isSessionActive } from "./helper/helpers";
import { User, UserToken } from "./models/user";
import * as SplashScreen from "expo-splash-screen";
import { getUser } from "./api/user";
import { ThemeContext } from "./context/ThemeContext";
import { ColorsLight, ColorsDark } from "./theme/globals";
import {
  getThemeFromLocalStorage,
  saveThemeToLocalStorage,
} from "./utils/themeMgmt";
import "react-native-gesture-handler";

//fonts
import { useFonts } from "expo-font";

//
import { LogBox } from "react-native";
import AppLoading from "expo-app-loading";
import { ActivityIndicator } from "react-native-paper";
import { clearAuthData } from "./utils/tokenMgmt";
export default function App() {
  const [userToken, setUserToken] = useState<UserToken | undefined>();
  const [user, setUser] = useState<User | undefined>();
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const client = new QueryClient();

  let [fontsLoaded] = useFonts({
    poppinsBold: require("./assets/fonts/Poppins-Bold.ttf"),
    poppinsLight: require("./assets/fonts/Poppins-Light.ttf"),
    poppins: require("./assets/fonts/Poppins-Regular.ttf"),
  });

  LogBox.ignoreAllLogs();

  useEffect(() => {
    let isMounted = true;
    if (isMounted) {
      getUserPayload()
        .then((payload) => {
          if (payload) {
            getUser(payload?.sub).then((user) => {
              setUser(user);
            });
          }
          return;
        })
        .catch((e) => {
          console.log(e);
        });

      getThemeFromLocalStorage().then((theme) => {
        setTheme(theme || "light");
      });
    }

    return () => {
      isMounted = false;
    };
  }, []);
  useEffect(() => {
    let isMounted = true;

    const checkUserLoggedIn = async () => {
      const isLoggedIn = await isSessionActive();
      console.log(isLoggedIn);

      if (!isLoggedIn) {
        await clearAuthData();
        setUser(undefined);
        if (isMounted) setUserToken(undefined);
      }
    };
    checkUserLoggedIn();
    //cleanup
    return () => {
      isMounted = false;
    };
  }, []);

  const changeTheme = async (theme: "dark" | "light") => {
    await saveThemeToLocalStorage(theme);
    setTheme(theme);
  };

  const context = {
    userToken,
    setUserToken,
    user,
    setUser,
  };

  const themeContext = {
    theme,
    changeTheme,
  };

  const styles = theme === "light" ? ColorsLight : ColorsDark;
  if (!fontsLoaded) {
    return <ActivityIndicator />;
  }

  return (
    <ThemeContext.Provider value={themeContext}>
      <View style={{ flex: 1, backgroundColor: styles.primaryBg }}>
        <StatusBar barStyle="dark-content" backgroundColor="white" />
        <AuthContext.Provider value={context}>
          <QueryClientProvider client={client}>
            <Screens />
          </QueryClientProvider>
        </AuthContext.Provider>
      </View>
    </ThemeContext.Provider>
  );
}
