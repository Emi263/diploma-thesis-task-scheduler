import React, { useEffect, useState, useContext } from "react";
import { getUserPayload, isSessionActive } from "../../helper/helpers";
import { Text, TextInput, SafeAreaView, Button, Alert } from "react-native";
import { login } from "../../api/auth";
import { styles } from "./styles";
import { setAuthToken } from "../../utils/tokenMgmt";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParams } from "../../ScreenIndex";
import { AuthContext } from "../../context/AuthContext";
import { AxiosResponse } from "axios";

type introScreenProp = StackNavigationProp<RootStackParams, "Home">;

const Login = () => {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [error, setError] = useState<null | string>(null);

  const nav = useNavigation<introScreenProp>();
  const { user, setUser } = useContext(AuthContext);

  const handleLogin = async (res: AxiosResponse) => {
    setError(null);
    await setAuthToken(res.data.token).then(async () => {
      const userData = await getUserPayload();
      setUser(userData);
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <>
        {/**Needs some logo here */}
        <Text style={styles.title}>Log in</Text>
        <TextInput
          autoComplete="email"
          value={email}
          onChangeText={setEmail}
          placeholder="Enter email"
          style={styles.input}
        />
        <TextInput
          value={pass}
          onChangeText={setPass}
          placeholder="Enter password"
          secureTextEntry
          style={styles.input}
        />

        {error && Alert.alert(error)}

        {/**Sign in button */}
        <Button
          onPress={(e) => {
            login(email, pass)
              .then(async (res) => handleLogin(res))
              .catch((e) => {
                console.log(e);
              });
          }}
          title="Login"
        />

        <Button title="REgister" onPress={() => nav.navigate("Signup")} />
        {/**Do not have an acc link */}
        {/* <Button onPress={() => clearAuthData()} title="Logout" /> */}
        {/**Signin with google */}
      </>
    </SafeAreaView>
  );
};

export default Login;
