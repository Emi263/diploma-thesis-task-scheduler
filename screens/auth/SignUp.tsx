import React, { useEffect, useState, useContext } from "react";
import { getUserPayload, isSessionActive } from "../../helper/helpers";
import { Text, TextInput, SafeAreaView, Button, Alert } from "react-native";
import { signup } from "../../api/auth";
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

const Signup = () => {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [error, setError] = useState<null | string>(null);
  const [name,setName]=useState('')
  const [surname,setSurname]=useState('')

  useEffect(() => {}, []);

  const nav = useNavigation<introScreenProp>();
  const sessionActive = isSessionActive();
  const { user, setUser } = useContext(AuthContext);

  return (
    <SafeAreaView style={styles.container}>
      <>
        {/**Needs some logo here */}
        <Text style={styles.title}>Signup</Text>

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
                <TextInput
        value={name}
        onChangeText={setName}
        placeholder="Enter Name"
        style={styles.input}
      />
         <TextInput
        value={surname}
        onChangeText={setSurname}
        placeholder="Enter surname"
        secureTextEntry
        style={styles.input}
      />
        {error && Alert.alert(error)}

        {/**Sign in button */}
        <Button
          onPress={(e) => {
            signup(email, pass,name,surname)
              .then(async (res) => {
                setError(null);
                setAuthToken(res.data.token);
                setUser(getUserPayload());
              })
              .catch((e) => {
                setError(e.response?.data.message!);
              });
          }}
          title="Signup"
        />
        {/**Do not have an acc link */}
        {/* <Button onPress={() => clearAuthData()} title="Logout" /> */}
        {/**Signin with google */}
      </>
    </SafeAreaView>
  );
};

export default Signup;
