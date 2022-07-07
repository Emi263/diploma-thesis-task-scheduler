import React, { useState } from "react";

import { StyleSheet, View } from "react-native";
import { Button, Text, TextInput } from "react-native-paper";
import { forgotPassword } from "../../api/auth";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");

  const handleResetPassword = () => {
    forgotPassword(email)
      .then((res) => {
        console.log(res);
      })
      .catch((e) => {
        console.log(e);
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

        <Button onPress={handleResetPassword}>Send Email </Button>
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
  },
});
