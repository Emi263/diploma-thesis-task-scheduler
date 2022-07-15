import React, { useContext } from "react";
import Intro1 from "./screens/intro/IntroOne";
import Intro2 from "./screens/intro/IntroTwo";
import Intro3 from "./screens/intro/IntroThree";
import Login from "./screens/auth/Login";
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { AuthContext } from "./context/AuthContext";
import Signup from "./screens/auth/SignUp";
import { TabNavigator } from "./navigation/BottomNavigator";
import SingleTaskScreen from "./screens/tasks/screens/SingleTaskScreen";
import AllTasks from "./screens/tasks/AllTasks";
import { ThemeContext } from "./context/ThemeContext";
import ForgotPassword from "./screens/ForgotPassword/ForgotPassword";
import { useRef, useState, useEffect } from "react";
import { View, Platform, Text, Button, Alert } from "react-native";
import * as Notifications from "expo-notifications";
import * as Device from "expo-device";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import CreateTask from "./screens/tasks/CreateTask";
import EditTask from "./screens/tasks/components/EditTask";
import { Task } from "./models/task";

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
  CreateTask: undefined;
  EditTask: {
    task: Task;
  };
  Settings: undefined;
  ForgotPassword: undefined;
};

const Screens = () => {
  const RootStack = createNativeStackNavigator<RootStackParams>();

  const { user } = useContext(AuthContext);

  const { theme } = useContext(ThemeContext);

  return (
    <NavigationContainer theme={theme === "dark" ? DarkTheme : DefaultTheme}>
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
            <RootStack.Screen
              name="CreateTask"
              component={CreateTask}
              options={{
                headerShown: false,
                animation: "fade",
              }}
            />
            <RootStack.Screen
              name="EditTask"
              component={EditTask}
              options={{
                headerShown: false,
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
              <RootStack.Screen
                name="ForgotPassword"
                component={ForgotPassword}
                options={{ headerShown: false }}
              />
            </RootStack.Group>
          </>
        )}
      </RootStack.Navigator>
    </NavigationContainer>
  );
};

export default Screens;
