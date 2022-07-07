import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Alert,
  Image,
} from "react-native";
import { Task } from "../../../models/task";
import { Formik, FormikHelpers } from "formik";
import { TaskSchema } from "../validation";
import {
  Button,
  Checkbox,
  Chip,
  HelperText,
  TextInput,
  TouchableRipple,
} from "react-native-paper";
import { FontAwesome } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { useMutation, useQueryClient } from "react-query";
import { createTask, updateTask } from "../../../api/task";
import { uploadImage } from "../../../helper/firebase";
import { ScrollView } from "react-native-gesture-handler";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { formatDateAndTime } from "../../../helper/helpers";

interface IFormTask {
  task?: Task;
  setOpenModal?: React.Dispatch<React.SetStateAction<boolean>>;
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
    image: props?.task?.image || "",
  };

  //local state

  const [checkboxChecked, setCheckboxChecked] = useState(
    InitialValues.shouldNotify
  );

  const [pickerR, setPickerR] = useState(InitialValues.image) as any;

  //date and time

  const [selectedDate, setSelectedDate] = useState<null | string>(
    InitialValues.date.toString()
  );

  const [initialDateShown, setInitialDateShown] = useState(false);
  //end of story

  const [uploading, setUploading] = useState(false);

  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    setSelectedDate(date);
    hideDatePicker();
    setInitialDateShown(true);
  };
  //image picker
  let openImagePickerAsync = async () => {
    let permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("Permission to access camera roll is required!");
      return;
    }

    let pickerResult = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (pickerResult.cancelled === true) {
      return;
    }
    setPickerR(pickerResult.uri);
  };

  const handleSubmit = async (values: Task, resetForm: any) => {
    if (taskId) {
      let imageChanged = InitialValues.image;
      if (InitialValues.image !== pickerR) {
        setUploading(true);
        const url: any = await uploadImage(pickerR);
        imageChanged = url;
        setUploading(false);
      }

      //update the task
      await mutateAsync(
        {
          ...values,
          id: taskId,
          shouldNotify: checkboxChecked,
          image: imageChanged,
        },
        {
          onSuccess: () => {
            queryClient.invalidateQueries();
            Alert.alert("Task updated successfully");
          },
        }
      );
      resetForm();
      //close the modal
      if (props.setOpenModal) {
        props.setOpenModal(false);
      }

      return;
    }

    //create a new task
    setUploading(true);
    const url: any = await uploadImage(pickerR);
    setUploading(false);
    await mutateAsync(
      { ...values, image: url, shouldNotify: checkboxChecked },
      {
        onSuccess: () => {
          queryClient.invalidateQueries();
          Alert.alert("A new task was successfully created");
        },
      }
    );
    resetForm();
    if (props.setOpenModal) {
      props.setOpenModal(false);
    }
    return;
  };

  return (
    <ScrollView>
      <Formik
        initialValues={InitialValues}
        validationSchema={TaskSchema}
        onSubmit={(values: Task, form: FormikHelpers<IFormInitialValues>) => {
          const finalValues: Task = {
            ...values,
            date: new Date(selectedDate || ""),
          };

          handleSubmit(finalValues, form.resetForm);
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
              <>
                <Text style={styles.title}>Fill in the form</Text>
                <View>
                  <>
                    <View style={styles.inputContainer}>
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
                    <View style={styles.inputContainer}>
                      <Text>Task description</Text>
                      <>
                        <TextInput
                          style={styles.input}
                          value={values.description}
                          onChangeText={handleChange("description")}
                          placeholder="Enter description"
                          onBlur={handleBlur("description")}
                          multiline
                          maxLength={100}
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
                      <TouchableRipple
                        style={{ padding: 10 }}
                        onPress={() => setCheckboxChecked((prev) => !prev)}
                      >
                        <Text>Should notify</Text>
                      </TouchableRipple>
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
                          onPress={showDatePicker}
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
                          <Text>
                            {initialDateShown &&
                              selectedDate &&
                              formatDateAndTime(selectedDate)}
                          </Text>
                        </Chip>
                      </View>
                      <DateTimePickerModal
                        minimumDate={new Date()}
                        isVisible={isDatePickerVisible}
                        mode="datetime"
                        onConfirm={handleConfirm}
                        onCancel={hideDatePicker}
                      />
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
                      </TouchableOpacity>
                    </View>

                    <View>
                      {!!pickerR && (
                        <Image
                          source={{ uri: pickerR }}
                          style={{ width: 200, height: 200 }}
                        />
                      )}
                    </View>
                  </>
                </View>
              </>
              <View style={{ marginTop: 40, marginBottom: 100 }}>
                <Button
                  onPress={() => handleSubmit()}
                  loading={isLoading || uploading}
                >
                  <Text>{taskId ? "Update" : "Create"}</Text>
                </Button>
              </View>
            </View>
          </>
        )}
      </Formik>
    </ScrollView>
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
  inputContainer: {
    paddingVertical: 20,
  },
});
