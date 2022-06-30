import React, { useState } from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import { Button, TextInput, HelperText } from "react-native-paper";
import { Feather } from "@expo/vector-icons";
import { Formik } from "formik";
import { PasswordSchema } from "../auth/validation";
import { ScrollView } from "react-native-gesture-handler";
import { changePassword } from "../../api/auth";
import { useMutation } from "react-query";

export default function ChangePassword() {
  const [showNewPass, setShowNewPass] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);

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
    console.log("Current  " + currentPassword);
    console.log("Pass  " + password);

    try {
      changePassword(currentPassword, password)
        .then((res) => {
          console.log(res.status);
        })
        .catch((e) => {
          console.log(e);
        });
    } catch (error) {}
  };

  return (
    <ScrollView>
      <Text>Change your password</Text>
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
            <View style={styles.inputContainer}>
              <Text style={styles.labelText}>Your current Password</Text>

              <TextInput
                value={values.currentPassword}
                style={{ width: "90%" }}
                secureTextEntry
                onChangeText={handleChange("currentPassword")}
                onBlur={handleBlur("currentPassword")}
              />
              <HelperText
                type="error"
                visible={!!touched.currentPassword && !!errors.currentPassword}
              >
                *{errors.currentPassword}
              </HelperText>
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.labelText}>Your new Password</Text>
              <View style={styles.input}>
                <TextInput
                  value={values.newPassword}
                  style={{ flex: 0.95 }}
                  secureTextEntry={!showNewPass}
                  placeholder="Enter new password"
                  onChangeText={handleChange("newPassword")}
                  onBlur={handleBlur("newPassword")}
                />
                <Feather
                  onPress={() => handleShowPassword("newpass")}
                  name={!showNewPass ? "eye-off" : "eye"}
                  size={24}
                  color="black"
                />
              </View>
              <HelperText
                type="error"
                visible={!!touched.newPassword && !!errors.newPassword}
              >
                {errors.newPassword}
              </HelperText>
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.labelText}>Confirm your new password</Text>
              <View style={styles.input}>
                <TextInput
                  value={values.confirmNewPassword}
                  style={{ flex: 0.95 }}
                  secureTextEntry={!showConfirmPass}
                  onChangeText={handleChange("confirmNewPassword")}
                  onBlur={handleBlur("confirmNewPassword")}
                />
                <Feather
                  onPress={() => handleShowPassword("confirmpass")}
                  name={!showConfirmPass ? "eye-off" : "eye"}
                  size={24}
                  color="black"
                />
              </View>
              <HelperText
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
                <TouchableOpacity
                  onPress={() => handleSubmit()}
                  activeOpacity={0.8}
                  style={{
                    padding: 10,
                    backgroundColor: "purple",
                  }}
                >
                  <Text style={{ color: "white" }}>Save Changes</Text>
                </TouchableOpacity>
              </View>
            </View>
          </>
        )}
      </Formik>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {},
  inputContainer: {},
  labelText: {},
  input: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
});
