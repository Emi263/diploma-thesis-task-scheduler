import React, { useEffect, useState, useContext } from "react";
import { getUserPayload, isSessionActive } from "../../helper/helpers";
import {
  Text,
  TextInput,
  SafeAreaView,
  Button,
  Alert,
  View,
  TouchableOpacity,
} from "react-native";
import { signup } from "../../api/auth";
import { styles } from "./styles";
import { useMutation, useQuery } from "react-query";
import { Formik, useFormik } from "formik";
import { setAuthToken, clearAuthData, decode } from "../../utils/tokenMgmt";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParams } from "../../ScreenIndex";
import { AuthContext } from "../../context/AuthContext";

import { AxiosError, AxiosResponse } from "axios";
import { SignupSchema } from "./validation";

type introScreenProp = StackNavigationProp<RootStackParams, "Home">;

const Signup = () => {
  const nav = useNavigation<introScreenProp>();
  const sessionActive = isSessionActive();
  const { user, setUser } = useContext(AuthContext);

  const handleSignup = async (res: AxiosResponse) => {
    console.log(res);

    try {
      await setAuthToken(res.data.token).then(async () => {
        const userData = await getUserPayload();
        setUser(userData);
      });
    } catch (error) {
      Alert.alert("Something went wrong");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <>
        <Text style={styles.title}>Signup</Text>

        <Formik
          validationSchema={SignupSchema}
          initialValues={{
            email: "",
            password: "",
            name: "",
            age: 0,
          }}
          onSubmit={(values) => {
            const { email, password, name, age } = values;
            signup(email, password, name, age.toString())
              .then(async (res) => handleSignup(res))
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
                        />
                        <Text style={styles.error}>
                          {touched.email && errors.email}
                        </Text>
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

                        <Text style={styles.error}>
                          {touched.password && errors.password}
                        </Text>
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

                        <Text style={styles.error}>
                          {touched.name && errors.name}
                        </Text>
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
                        />

                        <Text style={styles.error}>
                          {touched.age && errors.age}
                        </Text>
                      </>
                    </View>
                  </>
                </View>

                {/**Sign in button */}
                <Button onPress={() => handleSubmit()} title="Signup" />
              </>
            </View>
          )}
        </Formik>
      </>
    </SafeAreaView>
  );
};

export default Signup;

// // signup(email, pass, name, surname)
// .then(async (res) => {
//   setError(null);
//   setAuthToken(res.data.token);
//   setUser(getUserPayload());
// })
// .catch((e) => {
//   setError(e.response?.data.message!);
// });
