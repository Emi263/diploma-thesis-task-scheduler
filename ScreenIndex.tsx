import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import Intro1 from "./screens/intro/IntroOne";
import Intro2 from "./screens/intro/IntroTwo";
import Intro3 from "./screens/intro/IntroThree";
import Login from "./screens/auth/Login";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

export type RootStackParams = {
  Intro1: undefined;
  Intro2: undefined;
  Intro3: undefined;
  Login: undefined;
};

const Screens = () => {
  const RootStack = createNativeStackNavigator<RootStackParams>();

  return (
    <NavigationContainer>
      <RootStack.Navigator
        initialRouteName="Intro1"
        screenOptions={{
          gestureEnabled: true,
          customAnimationOnGesture: true,
          headerShown: false,
        }}
      >
        <RootStack.Screen name="Intro1" component={Intro1} />
        <RootStack.Screen name="Intro2" component={Intro2} />
        <RootStack.Screen name="Intro3" component={Intro3} />
        <RootStack.Screen name="Login" component={Login} />
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
