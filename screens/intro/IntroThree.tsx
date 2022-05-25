import React from "react";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { TouchableOpacity, View, Image, Text } from "react-native";
import { RootStackParams } from "../../ScreenIndex";
import { styles } from "./styles";
import { AntDesign } from "@expo/vector-icons";
import CustomButton from "../../common/Button";

type introScreenProp = StackNavigationProp<RootStackParams, "Intro3">;

const IntroThree = () => {
  const nav = useNavigation<introScreenProp>();
  const handleOnPressButton = () => {
    nav.navigate("Login");
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
      <Image style={styles.image} source={require("../../assets/todo3.png")} />
      <Text style={styles.title}>Get notified in real time</Text>
      <Text style={styles.description}>
        Register. Schedule a task. Attach a photo to it. Get notified 10 minutes
        before. Easy and simple.
      </Text>
      <View style={styles.pagination}>
        <Text style={styles.dot}></Text>
        <Text style={styles.dot}></Text>
        <Text style={styles.dot}></Text>
      </View>
      <CustomButton
        title="Let's get started!"
        onPress={handleOnPressButton}
        color="white"
        icon={<AntDesign name="smileo" size={24} color="white" />}
      />
    </View>
  );
};

export default IntroThree;
