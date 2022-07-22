import React, { useEffect, useState, useContext } from "react";
import { errorCodes, getUserPayload } from "../../helper/helpers";
import {
  Alert,
  View,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  Image,
  StatusBar,
  Dimensions,
  TouchableWithoutFeedback,
  Keyboard,
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
  TouchableRipple,
} from "react-native-paper";
import useTheme from "../../common/hooks/useTheme";
import { GoogleSignIn } from "./GoogleSignin";
import Loader from "../../common/Loader";
import { Feather } from "@expo/vector-icons";
import KeyboardAvoidingViewWrapper from "../../common/KeyboardAvodingViewWrapper";

type introScreenProp = StackNavigationProp<RootStackParams, "Home">;

const Login = () => {
  const nav = useNavigation<introScreenProp>();

  const [openForgotPass, setOpenForgotPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const { user, setUser } = useContext(AuthContext);

  const [showPass, setShowPass] = useState(false);
  const { colors } = useTheme();

  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    let isMounted = true;

    setIsMounted(true);

    return () => {
      isMounted = false;
      setIsMounted(false);
    };
  }, []);

  const handleLogin = async (res: AxiosResponse) => {
    if (isMounted) {
      try {
        setLoading(true);
        await setAuthToken(res.data.token).then(async () => {
          const userData = await getUserPayload();
          const userDt = await getUser(userData?.sub || 1);
          setLoading(false);
          setUser(userDt);
        });
      } catch (error) {
        setLoading(false);
      }
    }
  };

  const showAlert = (e) =>
    Alert.alert("Info", e, [
      { text: "OK", onPress: () => console.log("OK Pressed") },
    ]);

  if (loading) {
    return <Loader />;
  }

  const handleForgotPassword = () => {
    nav.navigate("ForgotPassword");
  };

  return (
    // <KeyboardAvoidingViewWrapper>
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View
        style={{
          flex: 1,
          height: Dimensions.get("screen").height,
        }}
      >
        <StatusBar barStyle="light-content" backgroundColor="#407BFF" />
        <View
          style={{
            backgroundColor: "#407BFF",
            height: 200,
            width: "100%",
            borderBottomRightRadius: 70,
            borderBottomLeftRadius: 70,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Image
            style={{ height: 180, width: 180 }}
            source={require("../../assets/login-logo.png")}
          />
        </View>
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
              <View
                style={[
                  styles.view,
                  {
                    width: Dimensions.get("screen").width,
                  },
                ]}
              >
                <>
                  <Text
                    style={[
                      styles.title,
                      {
                        color: colors.primaryColor,
                        alignSelf: "center",
                        fontFamily: "poppinsBold",
                        paddingTop: 20,
                        fontSize: 20,
                      },
                    ]}
                  >
                    Pick up where you left!
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
                            theme={{ colors: { primary: "#407BFF" } }}
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
                            secureTextEntry={!showPass}
                            style={styles.input}
                            onBlur={handleBlur("password")}
                            theme={{ colors: { primary: "#407BFF" } }}
                            // label="Password"
                            left={
                              <TextInput.Icon
                                style={{ marginTop: 12 }}
                                name="onepassword"
                              />
                            }
                            right={
                              <TextInput.Icon
                                style={{ marginTop: 12 }}
                                name={() => (
                                  <TouchableRipple>
                                    <Feather
                                      name={showPass ? "eye" : "eye-off"}
                                      size={24}
                                      color="black"
                                      onPress={() =>
                                        setShowPass((prev) => !prev)
                                      }
                                    />
                                  </TouchableRipple>
                                )}
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
                            Password is required!
                          </HelperText>
                          <TouchableOpacity
                            style={{
                              paddingVertical: 4,
                              alignSelf: "flex-end",
                            }}
                            activeOpacity={0.8}
                            onPress={handleForgotPassword}
                          >
                            <Text
                              style={{
                                color: "#407BFF",
                                fontFamily: "poppinsBold",
                                fontSize: 12,
                                textAlign: "right",
                              }}
                            >
                              Forgot password?
                            </Text>
                          </TouchableOpacity>
                        </>
                      </View>
                    </>
                  </View>

                  {/**Sign in button */}
                  <Button
                    style={{
                      marginTop: 20,
                      width: "90%",
                      backgroundColor: "#407BFF",
                      borderRadius: 10,
                    }}
                    mode="contained"
                    onPress={() => handleSubmit()}
                  >
                    <Text style={{ color: "white", fontFamily: "poppinsBold" }}>
                      Login
                    </Text>
                  </Button>

                  <GoogleSignIn setLoading={setLoading} />
                  <View
                    style={{
                      padding: 3,
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Text style={{ fontFamily: "poppins" }}>
                      Don't have an account?
                    </Text>
                    <TouchableOpacity onPress={() => nav.navigate("Signup")}>
                      <Text
                        style={{ fontFamily: "poppinsBold", color: "#407BFF" }}
                      >
                        {" Register!"}
                      </Text>
                    </TouchableOpacity>
                  </View>
                </>
              </View>
            )}
          </Formik>
        </>
      </View>
    </TouchableWithoutFeedback>
    // </KeyboardAvoidingViewWrapper>
  );
};

export default Login;
