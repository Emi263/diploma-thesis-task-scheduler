import React from "react";
import { Text, TextInput, SafeAreaView } from "react-native";
import { styles } from "./styles";
const Login = () => {
  return (
    <SafeAreaView style={styles.container}>

{/**Needs some logo here */}

      <Text style={styles.title}>Log in</Text>
      <TextInput style={styles.input} />
      <TextInput secureTextEntry style={styles.input} />

      {/**Sign in button */}
      {/**Do not have an acc link */}

      {/**Signin with google */}
    </SafeAreaView>
  );
};

export default Login;
