import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { RootStackParams } from "../ScreenIndex";
import Intro1 from ".././screens/intro/IntroOne";
import Intro2 from ".././screens/intro/IntroTwo";
import Intro3 from ".././screens/intro/IntroThree";
import Login from ".././screens/auth/Login";
import Signup from "../screens/auth/SignUp";

const AuthStack = () => {
  const RootStack = createNativeStackNavigator<RootStackParams>();
  return (
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
  );
};

export default AuthStack;
