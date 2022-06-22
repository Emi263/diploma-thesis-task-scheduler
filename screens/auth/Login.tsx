import React, { useEffect, useState, useContext } from "react";
import { getUserPayload, isSessionActive } from "../../helper/helpers";
import {
  SafeAreaView,
  Alert,
  View,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { login } from "../../api/auth";
import { styles } from "./styles";
import { setAuthToken } from "../../utils/tokenMgmt";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParams } from "../../ScreenIndex";
import { AuthContext } from "../../context/AuthContext";
import { AxiosError, AxiosResponse } from "axios";
import { Formik } from "formik";
import { LoginSchema } from "./validation";
import { getUser } from "../../api/user";
import {
  TextInput,
  HelperText,
  Text,
  Button,
  Modal,
  Portal,
  Provider,
} from "react-native-paper";

type introScreenProp = StackNavigationProp<RootStackParams, "Home">;

const Login = () => {
  const nav = useNavigation<introScreenProp>();
  const { user, setUser } = useContext(AuthContext);

  const handleLogin = async (res: AxiosResponse) => {
    try {
      await setAuthToken(res.data.token).then(async () => {
        const userData = await getUserPayload();
        const userDt = await getUser(userData?.sub || 1);
        setUser(userDt);
      });
    } catch (error) {}
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
              .catch((e: AxiosError) => {
                console.log(e.response?.status);
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
                <Text style={[styles.title]}>Log in</Text>
                <View style={styles.inputWrapper}>
                  <>
                    <View style={styles.inputContainer}>
                      <>
                        <TextInput
                          label="Email"
                          autoComplete="email"
                          value={values.email}
                          onChangeText={handleChange("email")}
                          placeholder="Enter email"
                          onBlur={handleBlur("email")}
                          style={styles.input}
                        />
                        <HelperText
                          type="error"
                          visible={!!touched.email && !!errors.email}
                        >
                          Email address is invalid!
                        </HelperText>
                      </>
                    </View>
                    <View style={styles.inputContainer}>
                      <>
                        <TextInput
                          value={values.password}
                          onChangeText={handleChange("password")}
                          placeholder="Enter password"
                          secureTextEntry
                          style={styles.input}
                          onBlur={handleBlur("password")}
                          label="Password"
                        />

                        <HelperText
                          type="error"
                          visible={!!touched.password && !!errors.password}
                        >
                          Password is required!
                        </HelperText>
                      </>
                    </View>
                  </>
                </View>

                {/**Sign in button */}
                <Button
                  style={{ marginTop: 20 }}
                  mode="contained"
                  onPress={() => handleSubmit()}
                >
                  Login
                </Button>
              </>
            </View>
          )}
        </Formik>
        <Provider>
          <Portal>
            <Modal visible={true}>
              <Text>Example Modal. Click outside this area to dismiss.</Text>
            </Modal>
          </Portal>
          <Button style={{ marginTop: 30 }}>Show</Button>
        </Provider>
        {/* <>
          <TouchableOpacity
            style={{ marginTop: 300 }}
            onPress={() => {
              nav.navigate("Signup");
            }}
          >
            <Text style={{ color: "blue" }}>Register</Text>
          </TouchableOpacity>
        </> */}

        {/**Do not have an acc link */}
        {/* <Button onPress={() => clearAuthData()} title="Logout" /> */}
        {/**Signin with google */}
      </>
    </SafeAreaView>
  );
};

export default Login;