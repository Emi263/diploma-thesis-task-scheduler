import React, { useEffect, useState, useContext } from "react";
import { getUserPayload, isSessionActive } from "../../helper/helpers";
import { Text, TextInput, SafeAreaView, Button,Alert } from "react-native";
import { login } from "../../api/auth";
import { styles } from "./styles";
import { useMutation, useQuery } from "react-query";
import { useFormik } from "formik";
import { setAuthToken, clearAuthData, decode } from "../../utils/tokenMgmt";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParams } from "../../ScreenIndex";
import { AuthContext } from "../../context/AuthContext";

import { AxiosError } from "axios";



type introScreenProp = StackNavigationProp<RootStackParams, "Home">;

const Login = () => {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");

  const [error, setError] = useState<null | string>(null);

  useEffect(() => {}, []);

  const nav = useNavigation<introScreenProp>();
  const sessionActive = isSessionActive();
  const { user, setUser } = useContext(AuthContext);




  return (
    <SafeAreaView style={styles.container}>
      <>
      {/**Needs some logo here */}
      <Text style={styles.title}>Log in</Text>

      <TextInput
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
            .then(async (res) => {
              setError(null);
              setAuthToken(res.data.token);
              setUser(getUserPayload());
            })
            .catch((e) => {
              setError(e.response?.data.message!)
            });
        }}
        title="Login"
      />

      <Button title="REgister" onPress={()=>nav.navigate('Signup')}/>
      {/**Do not have an acc link */}
      {/* <Button onPress={() => clearAuthData()} title="Logout" /> */}
      {/**Signin with google */}
      </>
    </SafeAreaView>
  );
};

export default Login;
