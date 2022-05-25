import React, { useEffect, useState, useContext } from "react";
import { getUserPayload, isSessionActive } from "../../helper/helpers";
import {
  Text,
  TextInput,
  SafeAreaView,
  Button,
  Alert,
  View,
} from "react-native";
import { login } from "../../api/auth";
import { styles } from "./styles";
import { setAuthToken } from "../../utils/tokenMgmt";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParams } from "../../ScreenIndex";
import { AuthContext } from "../../context/AuthContext";
import { AxiosResponse } from "axios";
import { Formik } from "formik";
import { LoginSchema } from "./validation";
import { TouchableOpacity } from "react-native-gesture-handler";

type introScreenProp = StackNavigationProp<RootStackParams, "Home">;

const Login = () => {
  const nav = useNavigation<introScreenProp>();
  const { user, setUser } = useContext(AuthContext);

  const handleLogin = async (res: AxiosResponse) => {
    await setAuthToken(res.data.token).then(async () => {
      const userData = await getUserPayload();
      setUser(userData);
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <>
        {/**Needs some logo here */}

        <Formik
          validationSchema={LoginSchema}
          initialValues={{
            email: "",
            password: "",
          }}
          onSubmit={(values) => {
            login(values.email, values.password)
              .then(async (res) => handleLogin(res))
              .catch((e) => {
                console.log(e);
              });
          }}
        >
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            values,
            errors,
            touched,
          }) => (
            <View style={styles.view}>
              <>
                <Text style={styles.title}>Log in</Text>
                <TextInput
                  autoComplete="email"
                  value={values.email}
                  onChangeText={handleChange("email")}
                  placeholder="Enter email"
                  style={styles.input}
                  onBlur={handleBlur("email")}
                />
                <Text style={styles.error}>
                  {touched.email && errors.email}
                </Text>

                <TextInput
                  value={values.password}
                  onChangeText={handleChange("password")}
                  placeholder="Enter password"
                  secureTextEntry
                  style={styles.input}
                  onBlur={handleBlur("password")}
                />

                <Text style={styles.error}>
                  {touched.password && errors.password}
                </Text>

                {/**Sign in button */}
                <Button onPress={() => handleSubmit()} title="Login" />
                {/* 
                <TouchableOpacity onPress={() => nav.navigate("Signup")}>
                  <React.Fragment>
                    <Text style={{ color: "blue" }}>Register</Text>
                  </React.Fragment>
                </TouchableOpacity> */}
              </>
            </View>
          )}
        </Formik>

        {/**Do not have an acc link */}
        {/* <Button onPress={() => clearAuthData()} title="Logout" /> */}
        {/**Signin with google */}
      </>
    </SafeAreaView>
  );
};

export default Login;
