import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { RootStackParams } from "../ScreenIndex";
import Intro1 from ".././screens/intro/IntroOne";
import Intro2 from ".././screens/intro/IntroTwo";
import Intro3 from ".././screens/intro/IntroThree";
import Login from ".././screens/auth/Login";
import Signup from "../screens/auth/SignUp";
import { TabNavigator } from "./BottomNavigator";
import SingleTaskScreen from "../screens/tasks/screens/SingleTaskScreen";
import AllTasks from "../screens/tasks/AllTasks";

const AppStack = () => {
  const RootStack = createNativeStackNavigator<RootStackParams>();

  return (
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
  );
};

export default AppStack;
