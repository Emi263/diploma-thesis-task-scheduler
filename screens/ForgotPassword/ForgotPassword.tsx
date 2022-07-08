import { AxiosError } from "axios";
import React, { useState } from "react";
import { Alert, StyleSheet, View } from "react-native";
import { Button, Text, TextInput } from "react-native-paper";
import { forgotPassword } from "../../api/auth";

const ForgotPassword = () => {
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

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.container}>
        <Text style={styles.title}>Forgot password page</Text>

        <TextInput
          // label="Email"
          autoComplete="email"
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
          placeholder="Enter email"
        />
        <View style={{ height: 50 }}></View>

        <Button mode="outlined" onPress={handleResetPassword}>
          Get a new password
        </Button>
      </View>
    </View>
  );
};

export default ForgotPassword;

const styles = StyleSheet.create({
  container: {
    padding: 30,
  },
  title: {
    paddingVertical: 30,
    fontWeight: "700",
    fontSize: 16,
  },
});
