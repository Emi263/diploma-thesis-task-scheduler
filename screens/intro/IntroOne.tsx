import React from "react";
import { StackNavigationProp } from "@react-navigation/stack";
import { Image, StatusBar, Text, View } from "react-native";
import CustomButton from "../../common/Button";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useNavigation } from "@react-navigation/native";
import { RootStackParams } from "../../ScreenIndex";
import { styles } from "./styles";
import { Feather } from "@expo/vector-icons";

import useTheme from "../../common/hooks/useTheme";

type IntroScreenProp = StackNavigationProp<RootStackParams, "Intro1">;

const IntroOne = () => {
  const { colors } = useTheme();

  const nav = useNavigation<IntroScreenProp>();
  const handleOnPressButton = () => {
    nav.navigate("Intro2");
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.primaryBg }]}>
      <StatusBar barStyle={"dark-content"} backgroundColor="white" />
      <Text
        style={{
          textAlign: "center",
          fontFamily: "poppinsBold",
          fontSize: 19,
        }}
      >
        Welcome to Tasky!
      </Text>
      <Image
        style={[styles.image]}
        source={require("../../assets/intro-1.png")}
      />
      <Text
        style={[
          styles.title,
          { color: colors.primaryColor, fontFamily: "poppinsBold" },
        ]}
      >
        Create your task
      </Text>
      <Text
        style={[
          styles.description,
          {
            color: colors.primaryColor,
            fontFamily: "poppinsLight",
            lineHeight: 24,
          },
        ]}
      >
        Register. Schedule a task. Attach a photo to it. Get notified if you
        want. Easy and simple.
      </Text>

      <View style={styles.footer}>
        <View style={styles.pagination}>
          <Text style={styles.dot}></Text>
          <Text style={[styles.dot, { backgroundColor: "#d9dbde" }]}></Text>
          <Text style={[styles.dot, { backgroundColor: "#d9dbde" }]}></Text>
        </View>
        <View style={styles.icon}>
          <Feather
            onPress={handleOnPressButton}
            name="chevron-right"
            size={30}
            color="black"
          />
        </View>
      </View>
    </View>
  );
};

export default IntroOne;
