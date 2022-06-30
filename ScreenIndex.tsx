import React, { useContext } from "react";
import { StyleSheet } from "react-native";
import Intro1 from "./screens/intro/IntroOne";
import Intro2 from "./screens/intro/IntroTwo";
import Intro3 from "./screens/intro/IntroThree";
import Login from "./screens/auth/Login";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SplashScreen from "./screens/SplashScreen";
import { AuthContext } from "./context/AuthContext";
import Signup from "./screens/auth/SignUp";
import { TabNavigator } from "./navigation/BottomNavigator";
import SingleTaskScreen from "./screens/tasks/screens/SingleTaskScreen";
import AllTasks from "./screens/tasks/AllTasks";
import AuthStack from "./navigation/AuthStack";
import AppStack from "./navigation/AppStack";

export type RootStackParams = {
  Intro1: undefined;
  Intro2: undefined;
  Intro3: undefined;
  Login: undefined;
  Splash: undefined;
  Home: undefined;
  Signup: undefined;
  SingleTask: undefined;
  Tasks: undefined;
  Settings: undefined;
};

const Screens = () => {
  const RootStack = createNativeStackNavigator<RootStackParams>();

  const { userToken, user } = useContext(AuthContext);

  return (
    <NavigationContainer>
      <RootStack.Navigator
        initialRouteName={userToken?.sub ? `Home` : "Intro1"}
        screenOptions={{
          gestureEnabled: true,
          customAnimationOnGesture: true,
          headerShown: false,
        }}
      >
        {!user?.id ? <AuthStack /> : <AppStack />}
      </RootStack.Navigator>
    </NavigationContainer>
  );
};

export default Screens;
