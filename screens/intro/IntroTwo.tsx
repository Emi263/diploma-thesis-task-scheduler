import React from "react";
import { Text, View, Image, TouchableOpacity, StatusBar } from "react-native";
import { styles } from "./styles";
import CustomButton from "../../common/Button";
import { AntDesign, Feather } from "@expo/vector-icons";
import { RootStackParams } from "../../ScreenIndex";
import { StackNavigationProp } from "@react-navigation/stack";
import { useNavigation } from "@react-navigation/native";
import useTheme from "../../common/hooks/useTheme";

type IntroScreenProp = StackNavigationProp<RootStackParams, "Intro1">;

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
      <StatusBar barStyle={"dark-content"} backgroundColor="white" />
      <View
        style={{
          paddingBottom: 20,
          paddingLeft: 20,
          position: "absolute",
          top: 20,
        }}
      >
        <Feather
          onPress={handleGoBack}
          name="chevron-left"
          size={30}
          color="black"
        />
      </View>
      <Image
        style={[styles.image, { marginTop: 70 }]}
        source={require("../../assets/intro-2.png")}
      />
      <Text
        style={[
          styles.title,
          { color: colors.primaryColor, fontFamily: "poppinsBold" },
        ]}
      >
        See you tasks list
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
        You can log in with your google account or creating a new account from
        scratch!
      </Text>
      <View style={styles.footer}>
        <View style={styles.pagination}>
          <Text style={styles.dot}></Text>
          <Text style={styles.dot}></Text>
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

export default IntroTwo;
