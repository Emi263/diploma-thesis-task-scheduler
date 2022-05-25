import React, { useContext } from "react";
import { StyleSheet } from "react-native";
import Intro1 from "./screens/intro/IntroOne";
import Intro2 from "./screens/intro/IntroTwo";
import Intro3 from "./screens/intro/IntroThree";
import Login from "./screens/auth/Login";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SplashScreen from "./screens/SplashScreen";
import HomeScreen from "./screens/home/HomeScreen";
import { AuthContext } from "./context/AuthContext";
import Signup from "./screens/auth/SignUp";

export type RootStackParams = {
  Intro1: undefined;
  Intro2: undefined;
  Intro3: undefined;
  Login: undefined;
  Splash: undefined;
  Home: undefined;
  Signup: undefined;
};

const Screens = () => {
  const RootStack = createNativeStackNavigator<RootStackParams>();
  const { user } = useContext(AuthContext);

  return (
    <NavigationContainer>
      <RootStack.Navigator
        initialRouteName={user?.sub ? `Home` : "Intro1"}
        screenOptions={{
          gestureEnabled: true,
          customAnimationOnGesture: true,
          headerShown: false,
        }}
      >
        {!user?.sub ? (
          <>
            <RootStack.Screen
              name="Intro1"
              component={Intro1}
              options={{ animation: "fade" }}
            />
            <RootStack.Screen
              name="Intro2"
              component={Intro2}
              options={{ animation: "slide_from_right" }}
            />
            <RootStack.Screen
              name="Intro3"
              component={Intro3}
              options={{ animation: "slide_from_right" }}
            />
            <RootStack.Screen
              name="Login"
              component={Login}
              options={{ animation: "simple_push" }}
            />
            <RootStack.Screen
              name="Splash"
              component={SplashScreen}
              options={{ animation: "slide_from_right" }}
            />
            <RootStack.Screen name="Signup" component={Signup} />
          </>
        ) : (
          <>
            <RootStack.Screen name="Home" component={HomeScreen} />
          </>
        )}
      </RootStack.Navigator>
    </NavigationContainer>
  );
};

export default Screens;

const styles = StyleSheet.create({
  container: {
    paddingTop: 100,
    width: "100%",
  },
});

const config = {
  animation: "spring",
  config: {
    stiffness: 1000,
    damping: 500,
    mass: 3,
    overshootClamping: true,
    restDisplacementThreshold: 0.01,
    restSpeedThreshold: 0.01,
  },
};
