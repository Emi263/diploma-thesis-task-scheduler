import React, { useEffect, useState, useContext } from "react";
import { getUserPayload, isSessionActive } from "../../helper/helpers";
import { SafeAreaView, Alert, View, TouchableOpacity } from "react-native";
import {
  TextInput,
  HelperText,
  Text,
  Button,
  ActivityIndicator,
} from "react-native-paper";
import { signup } from "../../api/auth";
import { styles } from "./styles";
import { Formik } from "formik";
import { setAuthToken } from "../../utils/tokenMgmt";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParams } from "../../ScreenIndex";
import { AuthContext } from "../../context/AuthContext";

import { AxiosResponse } from "axios";
import { SignupSchema } from "./validation";
import { getUser } from "../../api/user";
import useTheme from "../../common/hooks/useTheme";

type introScreenProp = StackNavigationProp<RootStackParams, "Home">;

const Signup = () => {
  const nav = useNavigation<introScreenProp>();
  const sessionActive = isSessionActive();
  const { user, setUser } = useContext(AuthContext);

  const [loading, setLoading] = useState(false);

  const handleSignup = async (res: AxiosResponse) => {
    try {
      await setAuthToken(res.data.token).then(async () => {
        const userData = await getUserPayload();
        const userDt = await getUser(userData?.sub || 1);
        setUser(userDt);
        setLoading(false);
      });
    } catch (error) {
      console.log(error);
      setLoading(false);

      Alert.alert("Something went wrong");
    }
  };

  const { colors } = useTheme();

  return (
    <>
      {loading && (
        <View
          style={{
            position: "absolute",
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(186, 186, 186, 0.4)",
            justifyContent: "center",
            zIndex: 3,
          }}
        >
          <ActivityIndicator size="large" style={{ opacity: 1 }} />
        </View>
      )}
      <SafeAreaView style={styles.container}>
        <>
          <Formik
            validationSchema={SignupSchema}
            initialValues={{
              email: "",
              password: "",
              name: "",
              age: "",
            }}
            onSubmit={(values) => {
              setLoading(true);
              const { email, password, name, age } = values;

              signup(email, password, name, age.toString())
                .then(async (res) => handleSignup(res))
                .catch((e) => {
                  setLoading(false);
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
                  <Text style={[styles.title, { color: colors.primaryColor }]}>
                    Fill in the form
                  </Text>
                  <View style={styles.inputWrapper}>
                    <>
                      <View style={styles.inputContainer}>
                        <>
                          <TextInput
                            autoComplete="email"
                            value={values.email}
                            onChangeText={handleChange("email")}
                            placeholder="Enter email"
                            style={styles.input}
                            onBlur={handleBlur("email")}
                            keyboardType="email-address"
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
                          />

                          <HelperText
                            type="error"
                            visible={!!touched.password && !!errors.password}
                          >
                            {errors.password}
                          </HelperText>
                        </>
                      </View>
                      <View style={styles.inputContainer}>
                        <>
                          <TextInput
                            value={values.name}
                            onChangeText={handleChange("name")}
                            placeholder="Enter name"
                            style={styles.input}
                            onBlur={handleBlur("name")}
                          />
                          <HelperText
                            type="error"
                            visible={!!touched.name && !!errors.name}
                          >
                            {errors.name}
                          </HelperText>
                        </>
                      </View>
                      <View style={styles.inputContainer}>
                        <>
                          <TextInput
                            value={values.age.toString()}
                            onChangeText={handleChange("age")}
                            placeholder="Enter age"
                            style={styles.input}
                            onBlur={handleBlur("age")}
                            keyboardType="number-pad"
                          />

                          <HelperText
                            type="error"
                            visible={!!touched.age && !!errors.age}
                          >
                            {errors.age}
                          </HelperText>
                        </>
                      </View>
                    </>
                  </View>

                  {/**Sign in button */}
                  <Button
                    mode="contained"
                    icon="login"
                    onPress={() => handleSubmit()}
                  >
                    Sign up
                  </Button>
                  <Button
                    style={{ marginTop: 6 }}
                    onPress={() => nav.navigate("Login")}
                  >
                    <Text
                      style={{
                        textTransform: "none",
                        fontSize: 12,
                        color: colors.link,
                        textDecorationLine: "underline",
                        textDecorationStyle: "solid",
                      }}
                    >
                      Go to Login
                    </Text>
                  </Button>
                </>
              </View>
            )}
          </Formik>
        </>
      </SafeAreaView>
    </>
  );
};

export default Signup;
