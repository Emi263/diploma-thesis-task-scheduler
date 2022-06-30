import React from "react";
import { StackNavigationProp } from "@react-navigation/stack";
import { Image, Text, View } from "react-native";
import CustomButton from "../../common/Button";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useNavigation } from "@react-navigation/native";
import { RootStackParams } from "../../ScreenIndex";
import { styles } from "./styles";

type IntroScreenProp = StackNavigationProp<RootStackParams, "Intro1">;

const IntroOne = () => {
  const nav = useNavigation<IntroScreenProp>();
  const handleOnPressButton = () => {
    nav.navigate("Intro2");
  };

  return (
    <View style={styles.container}>
      <Image style={styles.image} source={require("../../assets/todo.png")} />
      <Text style={styles.title}>Create your task</Text>
      <Text style={styles.description}>
        Register. Schedule a task. Attach a photo to it. Get notified 10 minutes
        before. Easy and simple.
      </Text>
      <View style={styles.pagination}>
        <Text style={styles.dot}></Text>
        <Text style={[styles.dot, { backgroundColor: "#d9dbde" }]}></Text>
        <Text style={[styles.dot, { backgroundColor: "#d9dbde" }]}></Text>
      </View>
      <CustomButton
        title="Next"
        onPress={handleOnPressButton}
        color="white"
        icon={<AntDesign name="caretright" size={18} color="white" />}
      />
    </View>
  );
};

export default IntroOne;
