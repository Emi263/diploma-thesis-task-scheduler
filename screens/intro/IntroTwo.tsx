import React from "react";
import { Text, View, Image, TouchableOpacity } from "react-native";
import { styles } from "./styles";
import CustomButton from "../../common/Button";
import { AntDesign } from "@expo/vector-icons";
import { RootStackParams } from "../../ScreenIndex";
import { StackNavigationProp } from "@react-navigation/stack";
import { useNavigation } from "@react-navigation/native";
import useTheme from "../../common/hooks/useTheme";

type IntroScreenProp = StackNavigationProp<RootStackParams, "Intro2">;

const IntroTwo = () => {
  const nav = useNavigation<IntroScreenProp>();

  const handleOnPressButton = () => {
    nav.navigate("Intro3");
  };

  const handleGoBack = () => {
    nav.goBack();
  };

  const { colors } = useTheme();
  return (
    <View style={[styles.container, { backgroundColor: colors.primaryBg }]}>
      <TouchableOpacity
        style={styles.back}
        activeOpacity={0.8}
        onPress={handleGoBack}
      >
        <AntDesign name="back" size={24} color={colors.primaryColor} />
      </TouchableOpacity>
      <Image style={styles.image} source={require("../../assets/todo2.png")} />
      <Text style={[styles.title, { color: colors.primaryColor }]}>
        See you tasks list
      </Text>
      <Text style={[styles.description, { color: colors.primaryColor }]}>
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
