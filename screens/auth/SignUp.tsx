import React, { useEffect, useState, useContext } from "react";
import {
  capitalize,
  getUserPayload,
  isSessionActive,
} from "../../helper/helpers";
import {
  SafeAreaView,
  Alert,
  View,
  TouchableOpacity,
  StatusBar,
  KeyboardAvoidingView,
  Platform,
  Dimensions,
} from "react-native";
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
import { AntDesign } from "@expo/vector-icons";
import { Octicons } from "@expo/vector-icons";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import KeyboardAvoidingViewWrapper from "../../common/KeyboardAvodingViewWrapper";

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
      <KeyboardAvoidingViewWrapper>
        <SafeAreaView style={styles.container}>
          <StatusBar barStyle="light-content" backgroundColor="#407BFF" />
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
                    Alert.alert(
                      "Something went wrong",
                      "Please check your data!"
                    );
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
                <View style={[styles.view]}>
                  <>
                    <View style={styles.upperView}>
                      <Text
                        style={[
                          styles.title,
                          { color: colors.primaryColor },
                          { color: "white" },
                        ]}
                      >
                        Welcome to Taskify!
                      </Text>
                      <Text
                        style={[styles.title, { color: "white", fontSize: 12 }]}
                      >
                        Glad to have you here! Sign up to get you going!
                      </Text>
                    </View>
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
                              left={
                                <TextInput.Icon
                                  style={{ marginTop: 12 }}
                                  name="email"
                                />
                              }
                            />
                            <HelperText
                              type="error"
                              visible={!!touched.email && !!errors.email}
                              style={{
                                fontFamily: "poppinsLight",
                                fontSize: 10,
                              }}
                            >
                              {errors.email}
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
                              left={
                                <TextInput.Icon
                                  style={{ marginTop: 12 }}
                                  name="onepassword"
                                />
                              }
                            />

                            <HelperText
                              type="error"
                              visible={!!touched.password && !!errors.password}
                              style={{
                                fontFamily: "poppinsLight",
                                fontSize: 10,
                              }}
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
                              left={
                                <TextInput.Icon
                                  name={() => (
                                    <AntDesign
                                      name="user"
                                      size={24}
                                      color="black"
                                    />
                                  )}
                                />
                              }
                            />
                            <HelperText
                              type="error"
                              visible={!!touched.name && !!errors.name}
                              style={{
                                fontFamily: "poppinsLight",
                                fontSize: 10,
                              }}
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
                              left={
                                <TextInput.Icon
                                  name={() => (
                                    <Octicons
                                      name="number"
                                      size={24}
                                      color="black"
                                    />
                                  )}
                                />
                              }
                            />

                            <HelperText
                              type="error"
                              visible={!!touched.age && !!errors.age}
                              style={{
                                fontFamily: "poppinsLight",
                                fontSize: 10,
                              }}
                            >
                              {errors.age}
                            </HelperText>
                          </>
                        </View>
                      </>
                    </View>

                    {/**Sign in button */}
                    <Button
                      style={{
                        width: "90%",
                        marginTop: 20,
                        backgroundColor: "#407BFF",
                      }}
                      mode="contained"
                      onPress={() => handleSubmit()}
                    >
                      <Text
                        style={{ color: "white", fontFamily: "poppinsBold" }}
                      >
                        Register
                      </Text>
                    </Button>

                    <View style={{ flexDirection: "row", paddingTop: 20 }}>
                      <Text style={{ fontFamily: "poppins" }}>
                        Joined us before?
                      </Text>
                      <TouchableOpacity
                        activeOpacity={0.8}
                        onPress={() => nav.navigate("Login")}
                      >
                        <Text
                          style={{
                            color: "#407BFF",
                            fontFamily: "poppinsBold",
                          }}
                        >
                          {" Login"}
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </>
                </View>
              )}
            </Formik>
          </>
        </SafeAreaView>
      </KeyboardAvoidingViewWrapper>
    </>
  );
};

export default Signup;
