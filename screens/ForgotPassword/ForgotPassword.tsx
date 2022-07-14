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
  StyleSheet,
  View,
} from "react-native";
import { Button, Text, TextInput } from "react-native-paper";
import { forgotPassword } from "../../api/auth";
import { RootStackParams } from "../../ScreenIndex";

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
          Alert.alert("This user cannot have his password resetted");
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
  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <View style={{ flex: 1 }}>
        <View style={styles.container}>
          <View>
            <Feather
              onPress={handleGoBack}
              name="chevron-left"
              size={30}
              color="black"
            />
          </View>
          <View style={styles.imgWrapper}>
            <Image
              style={{ height: 250, width: 250 }}
              source={require("../../assets/forgotPass.png")}
            />
          </View>
          <Text style={styles.title}>{"Forgot \npassword ?"}</Text>
          <Text style={styles.subTitle}>
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
            style={styles.input}
            left={<TextInput.Icon style={{ marginTop: 12 }} name="email" />}
          />
          <View style={{ height: 50 }}></View>

          <Button
            style={{
              marginTop: 20,
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
    </KeyboardAvoidingView>
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
