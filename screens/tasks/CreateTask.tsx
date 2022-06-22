import React, { SetStateAction } from "react";
import { Pressable, Text, View, TextInput, Button } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Formik } from "formik";
import { TaskSchema } from "./validation";

import { styles } from "./styles";
interface CreateTaskProps {
  setShowModal: React.Dispatch<SetStateAction<boolean>>;
}

const CreateTask: React.FunctionComponent<CreateTaskProps> = ({
  setShowModal,
}) => {
  //insert modal here

  //let the user change the calendar mode? probably
  return (
    <View>
      <Pressable onPress={() => setShowModal(false)}>
        <Text>Close</Text>
      </Pressable>

      {/* <DateTimePicker
        // mode="time"
        minimumDate={new Date(1950, 0, 1)}
        maximumDate={new Date(2300, 10, 20)}
        value={new Date()}
        onChange={(e, d) => {
          console.log(d);
        }}
      /> */}

      <Formik
        validationSchema={TaskSchema}
        initialValues={{
          email: "",
          password: "",
        }}
        onSubmit={(values) => {}}
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
              <Text style={[styles.title, { fontFamily: "Inter_400Regular" }]}>
                Log in
              </Text>
              <View>
                <>
                  <View>
                    <>
                      <TextInput
                        autoComplete="email"
                        value={values.email}
                        onChangeText={handleChange("email")}
                        placeholder="Enter email"
                        onBlur={handleBlur("email")}
                      />
                      <Text>{touched.email && errors.email}xw</Text>
                    </>
                  </View>
                  <View>
                    <>
                      <TextInput
                        value={values.password}
                        onChangeText={handleChange("password")}
                        placeholder="Enter password"
                        secureTextEntry
                        onBlur={handleBlur("password")}
                      />

                      <Text>{touched.password && errors.password}</Text>
                    </>
                  </View>
                </>
              </View>

              {/**Sign in button */}
              <Button onPress={() => handleSubmit()} title="Login" />
            </>
          </View>
        )}
      </Formik>
    </View>
  );
};

export default CreateTask;
