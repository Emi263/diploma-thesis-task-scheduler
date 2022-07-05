import React, { useEffect, useState, useContext } from "react";
import { errorCodes, getUserPayload } from "../../helper/helpers";
import { Alert, View, KeyboardAvoidingView, Platform } from "react-native";
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
import { TextInput, HelperText, Text, Button } from "react-native-paper";
import useTheme from "../../common/hooks/useTheme";

type introScreenProp = StackNavigationProp<RootStackParams, "Home">;

const Login = () => {
  const nav = useNavigation<introScreenProp>();
  const { user, setUser } = useContext(AuthContext);

  const { colors } = useTheme();

  const handleLogin = async (res: AxiosResponse) => {
    try {
      await setAuthToken(res.data.token).then(async () => {
        const userData = await getUserPayload();
        const userDt = await getUser(userData?.sub || 1);
        setUser(userDt);
      });
    } catch (error) {}
  };

  const showAlert = (e) =>
    Alert.alert("Info", e, [
      { text: "OK", onPress: () => console.log("OK Pressed") },
    ]);
  return (
    <KeyboardAvoidingView style={styles.container}>
      <>
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
                showAlert(errorCodes(e.response?.status || 400));
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
                <Text style={[styles.title, { color: colors.primaryColor }]}>
                  Log in
                </Text>
                <View style={styles.inputWrapper}>
                  <>
                    <View style={styles.inputContainer}>
                      <>
                        <TextInput
                          // label="Email"
                          autoComplete="email"
                          keyboardType="email-address"
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
                          // label="Password"
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
        <View style={{ padding: 30 }}>
          <Button
            mode="contained"
            icon="account"
            onPress={() => nav.navigate("Signup")}
          >
            Register
          </Button>
        </View>
      </>
    </KeyboardAvoidingView>
  );
};

export default Login;
