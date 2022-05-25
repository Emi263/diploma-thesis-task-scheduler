import React from "react";
import { Text, View, Image, TouchableOpacity } from "react-native";
import { styles } from "./styles";
import CustomButton from "../../common/Button";
import { AntDesign } from "@expo/vector-icons";
import { RootStackParams } from "../../ScreenIndex";
import { StackNavigationProp } from "@react-navigation/stack";
import { useNavigation } from "@react-navigation/native";

type introScreenProp = StackNavigationProp<RootStackParams, "Intro2">;

const IntroTwo = () => {
  const nav = useNavigation<introScreenProp>();

  const handleOnPressButton = () => {
    nav.navigate("Intro3");
  };

  const handleGoBack = () => {
    nav.goBack();
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.back}
        activeOpacity={0.8}
        onPress={handleGoBack}
      >
        <AntDesign name="back" size={24} color="black" />
      </TouchableOpacity>
      <Image style={styles.image} source={require("../../assets/todo2.png")} />
      <Text style={styles.title}>See you tasks list</Text>
      <Text style={styles.description}>
        Register. Schedule a task. Attach a photo to it. Get notified 10 minutes
        before. Easy and simple.
      </Text>
      <View style={styles.pagination}>
        <Text style={styles.dot}></Text>
        <Text style={styles.dot}></Text>
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

export default IntroTwo;
