import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { AxiosError } from "axios";
import React, { useState } from "react";
import {
  Alert,
  Image,
  KeyboardAvoidingView,
  Platform,
  StatusBar,
  StyleSheet,
  View,
} from "react-native";
import { Button, Text, TextInput } from "react-native-paper";
import { forgotPassword } from "../../api/auth";
import KeyboardAvoidingViewWrapper from "../../common/KeyboardAvodingViewWrapper";
import { RootStackParams } from "../../ScreenIndex";
import * as yup from "yup";
import useTheme from "../../common/hooks/useTheme";

type IntroScreenProp = StackNavigationProp<RootStackParams, "Intro1">;

const ForgotPassword = () => {
  const nav = useNavigation<IntroScreenProp>();

  const [email, setEmail] = useState("");
  const handleResetPassword = () => {
    forgotPassword(email)
      .then((res) => {
        if (res.data.email) {
          setEmail("");
          Alert.alert(
            "Success!",
            `Your new password was sent to ${email}. Please check your inbox and follow the instructions there`
          );
          return;
        }

        if (res.data.response.statusCode === 201) {
          setEmail("");
          Alert.alert(
            "Success!",
            `Your new password was sent to ${email}. Please check your inbox and follow the instructions there`
          );
          return;
        } else if (res.data.response.statusCode === 404) {
          Alert.alert(
            "Confused!",
            `You sure ${email} has been used before in this app?`,
            [
              {
                text: "Ok, sorry!",
              },
            ]
          );
          return;
        } else if (res.data.response.statusCode === 406) {
          Alert.alert("Error!", "This user cannot have his password resetted");
        } else {
          return;
        }
      })
      .catch((e: AxiosError) => {
        console.log(e);

        if (e.code == "ERR_BAD_REQUEST") {
          Alert.alert(
            "Error. Invalid email!",
            "Something went wrong! Please make sure your email is correct!",
            [
              {
                text: "Close",
              },
            ]
          );
          return;
        } else {
          Alert.alert(
            "Error",
            "Something went wrong! Please make sure you have been registered with this email before "
          );
        }
      });
  };

  const handleGoBack = () => {
    nav.goBack();
  };

  const { colors } = useTheme();
  return (
    <KeyboardAvoidingViewWrapper>
      <View style={{ flex: 1, backgroundColor: colors.primaryBg }}>
        <StatusBar backgroundColor="white" barStyle="dark-content" />
        <View style={[styles.container, { backgroundColor: colors.primaryBg }]}>
          <View
            style={{
              marginTop: Platform.OS === "ios" ? 40 : 20,
            }}
          >
            <Feather
              onPress={handleGoBack}
              name="chevron-left"
              size={30}
              color={colors.primaryColor}
            />
          </View>
          <View style={styles.imgWrapper}>
            <Image
              style={{ height: 250, width: 250 }}
              source={require("../../assets/forgotPass.png")}
            />
          </View>
          <Text style={[styles.title, { color: colors.primaryColor }]}>
            {"Forgot \npassword ?"}
          </Text>
          <Text
            style={[
              styles.subTitle,
              {
                color: colors.primaryColor,
              },
            ]}
          >
            Do not worry! It happens! Please enter the email address associated
            with your account.
          </Text>

          <TextInput
            // label="Email"
            autoComplete="email"
            keyboardType="email-address"
            value={email}
            onChangeText={setEmail}
            placeholder="Enter email"
            style={[
              styles.input,
              {
                backgroundColor: colors.input,
              },
            ]}
            left={<TextInput.Icon style={{ marginTop: 12 }} name="email" />}
          />
          <View style={{ height: 50 }}></View>

          <Button
            style={{
              width: "100%",
              backgroundColor: "#407BFF",
              borderRadius: 10,
            }}
            mode="contained"
            onPress={handleResetPassword}
          >
            <Text style={{ color: "white", fontFamily: "poppinsBold" }}>
              Reset password
            </Text>
          </Button>
        </View>
      </View>
    </KeyboardAvoidingViewWrapper>
  );
};

export default ForgotPassword;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 30,
    backgroundColor: "white",
  },
  title: {
    fontSize: 18,
    fontFamily: "poppinsBold",
  },
  subTitle: {
    fontSize: 14,
    fontFamily: "poppins",
    paddingBottom: 10,
  },
  imgWrapper: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  input: {
    backgroundColor: "white",
  },
});

const validate = yup.object({
  email: yup
    .string()
    .email("Please insert a correct email")
    .required("Please insert an email address"),
});
