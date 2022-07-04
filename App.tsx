import { View } from "react-native";
import Screens from "./ScreenIndex";
import "react-native-gesture-handler";
import { QueryClient, QueryClientProvider } from "react-query";
import { AuthContext } from "./context/AuthContext";
import { useCallback, useEffect, useState } from "react";
import { getUserPayload } from "./helper/helpers";
import { User, UserToken } from "./models/user";
import * as SplashScreen from "expo-splash-screen";
import { getUser } from "./api/user";
import { ThemeContext } from "./context/ThemeContext";
import { ColorsLight, ColorsDark } from "./theme/globals";
import { getThemeFromLocalStorage } from "./utils/themeMgmt";

export default function App() {
  const [userToken, setUserToken] = useState<UserToken | undefined>();
  const [user, setUser] = useState<User | undefined>();
  const [theme, setTheme] = useState<"dark" | "light">("dark");

  // getThemeFromLocalStorage().then((theme) => setTheme(theme || "light"));

  useEffect(() => {
    let isMounted = true;

    getUserPayload()
      .then((payload) => {
        getUser(payload.sub).then((user) => {
          setUser(user);
        });
      })
      .catch((e) => {
        console.log(e);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  const context = {
    userToken,
    setUserToken,
    user,
    setUser,
  };

  const themeContext = {
    theme,
    setTheme,
  };

  const [appIsReady, setAppIsReady] = useState(false);

  useEffect(() => {
    async function prepare() {
      try {
        await SplashScreen.preventAutoHideAsync();
        await new Promise((resolve) => setTimeout(resolve, 2000));
      } catch (e) {
        console.warn(e);
      } finally {
        setAppIsReady(true);
      }
    }

    prepare();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return null;
  }
  const client = new QueryClient();

  const styles = theme === "light" ? ColorsLight : ColorsDark;
  return (
    <ThemeContext.Provider value={themeContext}>
      <View
        style={{ flex: 1, backgroundColor: styles.primaryBg }}
        onLayout={onLayoutRootView}
      >
        <AuthContext.Provider value={context}>
          <QueryClientProvider client={client}>
            <Screens />
          </QueryClientProvider>
        </AuthContext.Provider>
      </View>
    </ThemeContext.Provider>
  );
}
