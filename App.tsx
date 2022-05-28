import { StatusBar } from "expo-status-bar";
import { Image, StyleSheet, Text, View } from "react-native";
import HomePage from "./screens/intro/IntroOne";
import Screens from "./ScreenIndex";
import "react-native-gesture-handler";
import { QueryClient, QueryClientProvider } from "react-query";
import { AuthContext } from "./context/AuthContext";
import { useCallback, useEffect, useState } from "react";
import { getUserPayload } from "./helper/helpers";
import { User, UserToken } from "./models/user";
import AppLoading from "expo-app-loading";
import { useFonts, Inter_400Regular } from "@expo-google-fonts/inter";
import * as SplashScreen from "expo-splash-screen";
import * as Font from "expo-font";
import Entypo from "@expo/vector-icons/Entypo";
import { getUser } from "./api/user";
import * as Localization from "expo-localization";
import i18n from "i18n-js";

export default function App() {
  const [userToken, setUserToken] = useState<UserToken | undefined>();
  const [user, setUser] = useState<User | undefined>();
  console.log(user);

  const getUserData = async () => {
    const userDt = await getUser(userToken?.sub || 1);
    return userDt;
  };

  useEffect(() => {
    let isMounted = true;
    const userData = async () => {
      const user = await getUserPayload();
      if (isMounted) {
        try {
          setUserToken(userToken);
          setUser(await getUserData());
        } catch (e) {}
      }
    };
    userData();
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

  const [appIsReady, setAppIsReady] = useState(false);

  useEffect(() => {
    async function prepare() {
      try {
        // Keep the splash screen visible while we fetch resources
        await SplashScreen.preventAutoHideAsync();
        // Pre-load fonts, make any API calls you need to do here
        await Font.loadAsync(Entypo.font);
        await Font.loadAsync("Inter_400Regular");
        // Artificially delay for two seconds to simulate a slow loading
        // experience. Please remove this if you copy and paste the code!
        await new Promise((resolve) => setTimeout(resolve, 2000));
      } catch (e) {
        console.warn(e);
      } finally {
        // Tell the application to render
        setAppIsReady(true);
      }
    }

    prepare();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      // This tells the splash screen to hide immediately! If we call this after
      // `setAppIsReady`, then we may see a blank screen while the app is
      // loading its initial state and rendering its first pixels. So instead,
      // we hide the splash screen once we know the root view has already
      // performed layout.
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return null;
  }
  const client = new QueryClient();

  return (
    <View style={{ flex: 1 }} onLayout={onLayoutRootView}>
      <AuthContext.Provider value={context}>
        <QueryClientProvider client={client}>
          <Screens />
        </QueryClientProvider>
      </AuthContext.Provider>
    </View>
  );
}
