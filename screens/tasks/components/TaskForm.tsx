import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Alert,
  Pressable,
} from "react-native";
import { Task } from "../../../models/task";
import { Formik, FormikHelpers } from "formik";
import { TaskSchema } from "../validation";
import {
  ActivityIndicator,
  Button,
  Checkbox,
  Chip,
  HelperText,
  Snackbar,
  TextInput,
} from "react-native-paper";
import { FontAwesome, MaterialIcons } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";
import * as ImagePicker from "expo-image-picker";
import { useMutation, useQueryClient } from "react-query";
import { createTask, updateTask } from "../../../api/task";

interface IFormTask {
  task?: Task;
}

interface IFormInitialValues {
  id: number;
  title: string;
  description: string;
  date: Date;
  image?: string;
  shouldNotify: boolean;
}

const TaskForm: React.FC<IFormTask> = (props) => {
  const queryClient = useQueryClient();

  const taskId = props?.task?.id;

  const { mutateAsync, isLoading } = taskId
    ? useMutation(updateTask)
    : useMutation(createTask);

  const InitialValues: IFormInitialValues = {
    id: props.task?.id || 1,
    title: props.task?.title || "",
    description: props?.task?.description || "",
    shouldNotify: props?.task?.shouldNotify || false,
    date: props?.task?.date || new Date(),
  };

  //local state

  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const [checkboxChecked, setCheckboxChecked] = useState(false);
  const [selectedImage, setSelectedImage] = useState<null | {
    localUri: string;
  }>();

  //date and time
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState<null | string>();
  const [selectedTime, setSelectedTime] = useState<null | string>();
  //end of story

  //format selected Date and Time
  const selectedDateAndTime =
    selectedDate && selectedTime ? `${selectedDate} at ${selectedTime}` : "";

  //image picker
  let openImagePickerAsync = async () => {
    let permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("Permission to access camera roll is required!");
      return;
    }

    let pickerResult = await ImagePicker.launchImageLibraryAsync();
    if (pickerResult.cancelled === true) {
      return;
    }
    setSelectedImage({ localUri: pickerResult.uri });
  };

  const handleSubmit = async (values: Task, resetForm: any) => {
    if (taskId) {
      //update the task
      await mutateAsync(
        { ...values, id: taskId },
        {
          onSuccess: () => {
            queryClient.invalidateQueries("allTasks");
            Alert.alert("Task updated successfully");
          },
        }
      );
      resetForm();
      return;
    }

    //create a new task

    await mutateAsync(values, {
      onSuccess: () => {
        queryClient.invalidateQueries("allTasks");
        Alert.alert("A new task was successfully created");
      },
    });
    resetForm();
    return;
  };

  return (
    <View>
      <Formik
        initialValues={InitialValues}
        validationSchema={TaskSchema}
        onSubmit={(values: Task, form: FormikHelpers<IFormInitialValues>) => {
          handleSubmit(values, form.resetForm);
        }}
      >
        {({
          handleBlur,
          handleChange,
          handleSubmit,
          touched,
          errors,
          values,
        }) => (
          <>
            <View style={styles.view}>
              <Snackbar
                duration={1000}
                style={{ zIndex: 2, marginBottom: 20 }}
                visible={snackbarVisible}
                onDismiss={() => {
                  setSnackbarVisible(false);
                }}
                action={{
                  label: "Success",
                  onPress: () => {
                    setSnackbarVisible(false);
                    2;
                  },
                }}
              >
                Task created successfully
              </Snackbar>
              <>
                <Text style={styles.title}>Fill in the form</Text>
                <View>
                  <>
                    <View>
                      <Text>Task Title</Text>
                      <>
                        <TextInput
                          style={styles.input}
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
                      <Text>Task description</Text>
                      <>
                        <TextInput
                          style={styles.input}
                          value={values.description}
                          onChangeText={handleChange("description")}
                          placeholder="Enter description"
                          onBlur={handleBlur("description")}
                          multiline
                          maxLength={20}
                        />

                        <HelperText
                          type="error"
                          visible={
                            !!touched.description && !!errors.description
                          }
                        >
                          {errors.description}
                        </HelperText>
                      </>
                    </View>
                    <View style={styles.checkbox}>
                      <Checkbox
                        status={checkboxChecked ? "checked" : "unchecked"}
                        onPress={() => {
                          setCheckboxChecked((prev) => !prev);
                        }}
                      />
                      <Pressable
                        onPress={() => setCheckboxChecked((prev) => !prev)}
                      >
                        <Text>Should notify</Text>
                      </Pressable>
                    </View>
                  </>

                  <>
                    <View style={{ display: "flex" }}>
                      <View
                        style={{
                          paddingHorizontal: 10,
                          paddingVertical: 20,
                          alignItems: "flex-start",
                        }}
                      >
                        <TouchableOpacity
                          style={{
                            flexDirection: "row",
                            backgroundColor: "#e3e2e1",
                            borderRadius: 20,
                            padding: 10,
                          }}
                          onPress={() => setShowDatePicker(true)}
                        >
                          <FontAwesome
                            name="calendar"
                            size={30}
                            color="black"
                          />
                          <Text
                            style={{
                              paddingHorizontal: 20,
                              paddingBottom: 5,
                              color: "black",
                            }}
                          >
                            Select Date
                          </Text>
                        </TouchableOpacity>
                      </View>
                      <View
                        style={{
                          flexDirection: "row",
                          alignItems: "center",
                        }}
                      >
                        <Text>Selected Date:</Text>
                        <Chip style={{ marginLeft: 10 }} icon="calendar">
                          {selectedDateAndTime}
                        </Chip>
                      </View>

                      {showDatePicker && (
                        <DateTimePicker
                          mode="date"
                          minimumDate={new Date(1950, 0, 1)}
                          maximumDate={new Date(2300, 10, 20)}
                          value={
                            selectedDate ? new Date(selectedDate) : new Date()
                          }
                          onChange={(e, d) => {
                            if (e.type === "dismissed") {
                              setShowDatePicker(false);
                              setShowTimePicker(false);
                              return;
                            }

                            if (d) {
                              setSelectedDate(d.toDateString());
                            }

                            setShowTimePicker(true);
                            setShowDatePicker(false);
                          }}
                        />
                      )}
                      {showTimePicker && (
                        <DateTimePicker
                          mode="time"
                          value={
                            selectedTime ? new Date(selectedTime) : new Date()
                          }
                          onChange={(e, d) => {
                            if (e.type === "dismissed") {
                              return;
                            }
                            let localizedDate: string = "";
                            if (d) {
                              localizedDate = d
                                .toLocaleTimeString()
                                .substring(0, 5);
                            }
                            setShowTimePicker(false);
                            setSelectedTime(localizedDate);
                          }}
                        />
                      )}
                    </View>

                    <View
                      style={{
                        justifyContent: "flex-start",
                        flexDirection: "row",
                        paddingVertical: 20,
                      }}
                    >
                      <TouchableOpacity
                        activeOpacity={0.8}
                        style={styles.photoPicker}
                        onPress={openImagePickerAsync}
                      >
                        <Text style={{ color: "white", paddingRight: 10 }}>
                          Pick a photo
                        </Text>
                        <MaterialIcons
                          name="add-a-photo"
                          size={24}
                          color="white"
                        />
                      </TouchableOpacity>
                    </View>
                    {/* <Image
                    source={{ uri: selectedImage?.localUri }}
                    style={{
                      width: 200,
                      height: 300,
                      resizeMode: "contain",
                    }}
                  /> */}
                  </>
                </View>
              </>
              <Button onPress={() => handleSubmit()} loading={isLoading}>
                {taskId ? "Update" : "Create"}
              </Button>
            </View>
          </>
        )}
      </Formik>
    </View>
  );
};

export default TaskForm;

export const styles = StyleSheet.create({
  view: {
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
  title: {
    paddingVertical: 20,
    fontSize: 18,
    textAlign: "center",
  },

  singleTask: {
    width: "40%",
    marginBottom: 20,
    backgroundColor: "white",
    paddingHorizontal: 10,
    padding: 20,
    borderRadius: 20,
    marginHorizontal: 16,
    margin: "auto",
  },
  textContent: {
    paddingVertical: 10,
  },
  checkbox: {
    flexDirection: "row",
    alignItems: "center",
  },
  input: {
    backgroundColor: "white",
  },

  photoPicker: {
    backgroundColor: "purple",
    paddingVertical: 10,
    paddingHorizontal: 10,
    flexDirection: "row",
    alignItems: "center",
  },
});
