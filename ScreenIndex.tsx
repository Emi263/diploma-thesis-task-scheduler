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
  App: undefined;
  Auth: undefined;
  Intro1: undefined;
  Intro2: undefined;
  Intro3: undefined;
  Login: undefined;
  Splash: undefined;
  Home: undefined;
  Signup: undefined;
  SingleTask: {
    id: number;
  };
  Tasks: undefined;
  Settings: undefined;
};

const Screens = () => {
  const RootStack = createNativeStackNavigator<RootStackParams>();

  const { userToken, user } = useContext(AuthContext);

  return (
    <NavigationContainer>
      <RootStack.Navigator
        screenOptions={{
          gestureEnabled: true,
          customAnimationOnGesture: true,
          headerShown: false,
        }}
      >
        {user?.id ? (
          <>
            <RootStack.Screen name="Home" component={TabNavigator} />
            <RootStack.Screen
              name="SingleTask"
              component={SingleTaskScreen}
              options={{
                headerShown: true,
              }}
            />
            <RootStack.Screen
              name="Tasks"
              component={AllTasks}
              options={{
                headerShown: true,
              }}
            />
          </>
        ) : (
          <>
            <RootStack.Group>
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
              <RootStack.Screen name="Signup" component={Signup} />
            </RootStack.Group>
          </>
        )}
      </RootStack.Navigator>
    </NavigationContainer>
  );
};

export default Screens;
