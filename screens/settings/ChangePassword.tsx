import React, { useContext, useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import {
  TextInput,
  HelperText,
  TouchableRipple,
  Button,
} from "react-native-paper";
import { Feather } from "@expo/vector-icons";
import { Formik } from "formik";
import { PasswordSchema } from "../auth/validation";
import { ScrollView } from "react-native-gesture-handler";
import { changePassword } from "../../api/auth";
import { AuthContext } from "../../context/AuthContext";

import useTheme from "../../common/hooks/useTheme";
import KeyboardAvoidingViewWrapper from "../../common/KeyboardAvodingViewWrapper";

export default function ChangePassword() {
  const { colors } = useTheme();
  const [showNewPass, setShowNewPass] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);

  const { user, setUser } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);

  type Input = "newpass" | "confirmpass";

  const handleShowPassword = (input: Input) => {
    if (input === "newpass") {
      setShowNewPass((prev) => !prev);
    } else setShowConfirmPass((prev) => !prev);
  };

  const handlePasswordChange = async (
    currentPassword: string,
    password: string
  ) => {
    try {
      setLoading(true);
      changePassword(currentPassword, password)
        .then((res) => {
          if (res.status === 200) {
            setLoading(false);
            Alert.alert("Info", "Your password was changed successfully");
            if (user) {
              setUser({ ...user, shouldChangePassword: false });
            }
          }
        })
        .catch((e) => {
          console.log(e);

          setLoading(false);
          Alert.alert("Error", "Something went wrong! Try again!");
        });
    } catch (error) {
      setLoading(false);
    }
  };

  return (
    // <KeyboardAvoidingViewWrapper>
    <Formik
      validationSchema={PasswordSchema}
      initialValues={{
        currentPassword: "",
        newPassword: "",
        confirmNewPassword: "",
      }}
      onSubmit={(values) => {
        handlePasswordChange(values.currentPassword, values.newPassword);
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
        <>
          <KeyboardAvoidingViewWrapper>
            <>
              <View style={styles.inputContainer}>
                <Text
                  style={[
                    styles.labelText,
                    {
                      color: colors.primaryColor,
                    },
                  ]}
                >
                  Your current Password
                </Text>
                <TextInput
                  placeholder="Enter current password"
                  value={values.currentPassword}
                  style={styles.input}
                  secureTextEntry
                  onChangeText={handleChange("currentPassword")}
                  onBlur={handleBlur("currentPassword")}
                />
                <HelperText
                  type="error"
                  visible={
                    !!touched.currentPassword && !!errors.currentPassword
                  }
                  style={{
                    fontFamily: "poppinsLight",
                    fontSize: 10,
                  }}
                >
                  *{errors.currentPassword}
                </HelperText>
              </View>

              <View style={styles.inputContainer}>
                <Text
                  style={[
                    styles.labelText,
                    {
                      color: colors.primaryColor,
                    },
                  ]}
                >
                  Your new Password
                </Text>
                <View>
                  <TextInput
                    value={values.newPassword}
                    onChangeText={handleChange("newPassword")}
                    placeholder="Enter new password"
                    secureTextEntry={!showNewPass}
                    style={styles.input}
                    onBlur={handleBlur("newPassword")}
                    theme={{ colors: { primary: "#407BFF" } }}
                    right={
                      <TextInput.Icon
                        style={{ marginTop: 12 }}
                        name={() => (
                          <TouchableRipple>
                            <Feather
                              name={showNewPass ? "eye" : "eye-off"}
                              size={24}
                              color="black"
                              onPress={() => handleShowPassword("newpass")}
                            />
                          </TouchableRipple>
                        )}
                      />
                    }
                  />
                </View>
                <HelperText
                  type="error"
                  visible={!!touched.newPassword && !!errors.newPassword}
                  style={{
                    fontFamily: "poppinsLight",
                    fontSize: 10,
                  }}
                >
                  {errors.newPassword}
                </HelperText>
              </View>
              <View style={styles.inputContainer}>
                <Text
                  style={[
                    styles.labelText,
                    {
                      color: colors.primaryColor,
                    },
                  ]}
                >
                  Confirm your new password
                </Text>
                <View>
                  <TextInput
                    value={values.confirmNewPassword}
                    placeholder="Confirm new password"
                    style={styles.input}
                    secureTextEntry={!showConfirmPass}
                    onChangeText={handleChange("confirmNewPassword")}
                    onBlur={handleBlur("confirmNewPassword")}
                    theme={{ colors: { primary: "#407BFF" } }}
                    // label="Password"

                    right={
                      <TextInput.Icon
                        style={{ marginTop: 12 }}
                        name={() => (
                          <TouchableRipple>
                            <Feather
                              name={showConfirmPass ? "eye" : "eye-off"}
                              size={24}
                              color="black"
                              onPress={() => handleShowPassword("confirmpass")}
                            />
                          </TouchableRipple>
                        )}
                      />
                    }
                  />
                </View>
                <HelperText
                  style={{
                    fontFamily: "poppinsLight",
                    fontSize: 10,
                    padding: 10,
                  }}
                  type="error"
                  visible={
                    !!touched.confirmNewPassword && !!errors.confirmNewPassword
                  }
                >
                  {errors.confirmNewPassword}
                </HelperText>

                <View
                  style={{
                    paddingVertical: 20,
                    width: "100%",
                    flexDirection: "row",
                    justifyContent: "center",
                  }}
                >
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
                      Save changes
                    </Text>
                    {loading && (
                      <ActivityIndicator color="white" size="small" />
                    )}
                  </Button>
                </View>
              </View>
            </>
          </KeyboardAvoidingViewWrapper>
        </>
      )}
    </Formik>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 20,
  },
  inputContainer: {},
  labelText: {
    paddingVertical: 5,
    fontFamily: "poppinsBold",
    paddingLeft: 20,
  },
  input: {
    display: "flex",
    height: 50,
    width: "100%",
    padding: 2,
    paddingHorizontal: 20,
    fontSize: 14,
    backgroundColor: "white",
  },
});
