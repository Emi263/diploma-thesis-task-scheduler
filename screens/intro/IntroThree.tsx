import React from "react";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import {
  TouchableOpacity,
  View,
  Image,
  Text,
  Touchable,
  StatusBar,
  Platform,
} from "react-native";
import { RootStackParams } from "../../ScreenIndex";
import { styles } from "./styles";
import { AntDesign, Feather } from "@expo/vector-icons";
import CustomButton from "../../common/Button";
import useTheme from "../../common/hooks/useTheme";
import { TouchableRipple } from "react-native-paper";

type IntroScreenProp = StackNavigationProp<RootStackParams, "Intro3">;

const IntroThree = () => {
  const nav = useNavigation<IntroScreenProp>();
  const handleOnPressButton = () => {
    nav.navigate("Login");
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
          top: Platform.OS === "ios" ? 60 : 50,
        }}
      >
        <Feather
          onPress={handleGoBack}
          name="chevron-left"
          size={30}
          color={colors.primaryColor}
        />
      </View>
      <Image
        style={[styles.image, { height: 300, marginTop: 70 }]}
        source={require("../../assets/todo-3.png")}
      />
      <Text
        style={[
          styles.title,
          { color: colors.primaryColor, fontFamily: "poppinsBold" },
        ]}
      >
        Get notified in real time
      </Text>
      <Text
        style={[
          styles.description,
          { color: colors.primaryColor, fontFamily: "poppinsLight" },
        ]}
      >
        Enjoy it!
      </Text>

      <View style={styles.footer}>
        <View style={styles.pagination}>
          <View style={styles.dot}></View>
          <View style={[styles.dot]}></View>
          <View style={[styles.dot]}></View>
        </View>
        <TouchableRipple
          onPress={handleOnPressButton}
          style={{
            padding: 10,
            backgroundColor: "#407BFF",
            borderRadius: 10,
            paddingHorizontal: 20,
          }}
        >
          <Text style={{ fontFamily: "poppinsBold", color: "white" }}>
            Let's start!
          </Text>
        </TouchableRipple>
      </View>
    </View>
  );
};

export default IntroThree;
