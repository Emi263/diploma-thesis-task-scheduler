import React from "react";
import { View } from "react-native";
import Lottie from "lottie-react-native";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParams } from "../ScreenIndex";

type introScreenProp = StackNavigationProp<RootStackParams, "Home">;

const SplashScreen = () => {
  const nav = useNavigation<introScreenProp>();
  setTimeout(() => {
    nav.navigate("Home");
  }, 1000);
  return (
    <View>
      <Lottie source={require("../assets/lottie.json")} autoPlay loop />
    </View>
  );
};

export default SplashScreen;
