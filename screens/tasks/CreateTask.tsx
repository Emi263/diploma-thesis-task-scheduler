import React, { SetStateAction, useState } from "react";
import { Pressable, Text, View, Alert } from "react-native";
import { TextInput, HelperText } from "react-native-paper";
import { Checkbox } from "react-native-paper";
import { Button } from "react-native-paper";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Formik } from "formik";
import { TaskSchema } from "./validation";
import DeviceInfo from "react-native-device-info";
import moment from "moment";
import { styles } from "./styles";
interface CreateTaskProps {
  setShowModal: React.Dispatch<SetStateAction<boolean>>;
}

interface InititalValues {
  title: string;
  description: string;
  date: Date;
  image?: string;
  shouldNotify: boolean;
}

const CreateTask: React.FunctionComponent<CreateTaskProps> = ({
  setShowModal,
}) => {
  //insert modal here

  const initialValues: InititalValues = {
    title: "",
    description: "",
    date: new Date(),
    shouldNotify: false,
  };

  const [checked, setChecked] = React.useState(false);

  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");

  //let the user change the calendar mode? probably
  return (
    <View>
      <Pressable onPress={() => setShowModal(false)}>
        <Text>Close</Text>
      </Pressable>

      <Formik
        validationSchema={TaskSchema}
        initialValues={initialValues}
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
              <Text style={styles.title}>Fill in the form</Text>
              <View>
                <>
                  <View>
                    <>
                      <TextInput
                        value={values.title}
                        onChangeText={handleChange("title")}
                        placeholder="Enter title"
                        onBlur={handleBlur("title")}
                      />
                      <HelperText
                        type="error"
                        visible={!!touched.title && !!errors.title}
                      >
                        Title is required
                      </HelperText>
                    </>
                  </View>
                  <View>
                    <>
                      <TextInput
                        value={values.description}
                        onChangeText={handleChange("description")}
                        placeholder="Enter description"
                        onBlur={handleBlur("description")}
                        multiline
                        maxLength={20}
                      />

                      <HelperText
                        type="error"
                        visible={!!touched.description && !!errors.description}
                      >
                        {errors.description}
                      </HelperText>
                    </>
                  </View>
                  <View>
                    <Checkbox
                      status={checked ? "checked" : "unchecked"}
                      onPress={() => {
                        setChecked(!checked);
                      }}
                    />
                    <Text>Should notify</Text>
                  </View>
                </>

                <>
                  <View style={{ display: "flex" }}>
                    <Button
                      onPress={() => setShowDatePicker(true)}
                      icon="calendar-clock"
                    >
                      Select Date
                    </Button>
                    <Text>Date: {selectedDate}</Text>
                    <Text>Time: {selectedTime}</Text>

                    {showDatePicker && (
                      <DateTimePicker
                        mode="date"
                        minimumDate={new Date(1950, 0, 1)}
                        maximumDate={new Date(2300, 10, 20)}
                        value={new Date(selectedDate)}
                        onChange={(e, d) => {
                          if (d) {
                            setSelectedDate(d.toDateString());
                          }
                          setTimeout(() => {
                            setShowTimePicker(true);
                          }, 0);
                          setShowDatePicker(false);
                        }}
                      />
                    )}
                    {showTimePicker && (
                      <DateTimePicker
                        mode="time"
                        value={new Date()}
                        onChange={(e, d) => {
                          let localizedDate: string = "";

                          if (d) {
                            localizedDate = d.toLocaleTimeString();
                          }
                          setShowTimePicker(false);
                          setSelectedTime(localizedDate);
                        }}
                      />
                    )}
                  </View>
                </>
              </View>
            </>
          </View>
        )}
      </Formik>
    </View>
  );
};

export default CreateTask;
