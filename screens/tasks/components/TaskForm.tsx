import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Alert,
  Image,
  StatusBar,
  TextInput,
} from "react-native";
import { Task } from "../../../models/task";
import { Formik, FormikHelpers } from "formik";
import { TaskSchema } from "../validation";
import {
  Button,
  Checkbox,
  Chip,
  HelperText,
  TouchableRipple,
} from "react-native-paper";
import { Feather, FontAwesome } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { useMutation, useQueryClient } from "react-query";
import { createTask, updateTask } from "../../../api/task";
import { uploadImage } from "../../../helper/firebase";
import { ScrollView } from "react-native-gesture-handler";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { formatDateAndTime } from "../../../helper/helpers";
import useTheme from "../../../common/hooks/useTheme";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParams } from "../../../ScreenIndex";
import { useNavigation } from "@react-navigation/native";
import ImagePreview from "react-native-image-preview";

import { MaterialCommunityIcons } from "@expo/vector-icons";
import ModalComponent from "../../../common/Modal";
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

type introScreenProp = StackNavigationProp<RootStackParams, "Home">;

const TaskForm: React.FC<IFormTask> = (props) => {
  const nav = useNavigation<introScreenProp>();

  const { colors } = useTheme();
  const queryClient = useQueryClient();
  const taskId = props?.task?.id;

  const { mutateAsync, isLoading, isError } = taskId
    ? useMutation(updateTask)
    : useMutation(createTask);

  const InitialValues: IFormInitialValues = {
    id: props.task?.id || 1,
    title: props.task?.title || "",
    description: props?.task?.description || "",
    shouldNotify: props?.task?.shouldNotify || true,
    date: props?.task?.date || new Date(),
    image: props?.task?.image || "",
  };

  console.log(InitialValues);

  //local state

  const [checkboxChecked, setCheckboxChecked] = useState(
    InitialValues.shouldNotify
  );

  const [pickerR, setPickerR] = useState(InitialValues.image) as any;

  //date and time

  const [selectedDate, setSelectedDate] = useState<any>(
    new Date(InitialValues.date).toISOString()
  );

  //end of story
  const [showModal, setShowModal] = useState(false);
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
          onSuccess: async () => {
            Alert.alert("Task updated successfully");
            await queryClient.invalidateQueries();
          },
          onError: () => {
            Alert.alert("Error", "Something went wrong! Try again");
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
        onSuccess: async () => {
          Alert.alert("A new task was successfully created");
          await queryClient.invalidateQueries();

          if (props.setOpenModal) {
            props.setOpenModal(false);
          }
        },
        onError: () => {
          Alert.alert("Error", "Something went wrong! Try again");
        },
      }
    );
    resetForm();

    return;
  };

  return (
    <ScrollView style={{ flex: 0 }}>
      <Formik
        initialValues={InitialValues}
        validationSchema={TaskSchema}
        onSubmit={(values: Task, form: FormikHelpers<IFormInitialValues>) => {
          const finalValues: Task = {
            ...values,
            date: new Date(selectedDate),
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
            <View style={[styles.view, { backgroundColor: colors.primaryBg }]}>
              <StatusBar barStyle="dark-content" />
              <>
                <TouchableRipple
                  style={{
                    alignSelf: "flex-start",
                    padding: 2,
                    paddingLeft: 0,
                  }}
                  borderless={true}
                >
                  <Feather
                    onPress={() => nav.goBack()}
                    name="chevron-left"
                    size={32}
                    color="black"
                  />
                </TouchableRipple>

                <Text style={[styles.title, { color: colors.primaryColor }]}>
                  {!props.task ? "Create\na new task!" : "Update the task!"}
                </Text>
                <View>
                  <>
                    <View style={styles.inputContainer}>
                      <Text style={styles.inputTitle}>Task Title</Text>
                      <>
                        <TextInput
                          style={styles.input}
                          value={values.title}
                          onChangeText={handleChange("title")}
                          placeholder="Task title"
                          onBlur={handleBlur("title")}
                          clearButtonMode="always"
                        />
                        <HelperText
                          type="error"
                          visible={!!touched.title && !!errors.title}
                        >
                          {errors.title}
                        </HelperText>
                      </>
                    </View>
                    <View style={styles.inputContainer}>
                      <Text style={styles.inputTitle}>Task description</Text>
                      <>
                        <TextInput
                          style={[
                            styles.input,
                            {
                              backgroundColor: "#FFE6E7",
                              height: 100,
                              paddingVertical: 0,
                            },
                          ]}
                          value={values.description}
                          onChangeText={handleChange("description")}
                          placeholder="Task description"
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
                  </>

                  <>
                    <View style={{ display: "flex" }}>
                      <Text style={{ fontFamily: "poppins", fontSize: 14 }}>
                        Date and Time
                      </Text>

                      <View
                        style={{
                          alignItems: "center",
                          justifyContent: "space-between",
                          flexDirection: "row",
                          borderBottomColor: "black",
                          borderBottomWidth: 1,
                          paddingVertical: 2,
                        }}
                      >
                        <Text style={{ fontFamily: "poppins", fontSize: 13 }}>
                          {formatDateAndTime(selectedDate)}
                        </Text>
                        <TouchableOpacity
                          style={{
                            flexDirection: "row",
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
                        </TouchableOpacity>
                      </View>
                      <HelperText type="error" visible={!!errors.date}>
                        {errors.date}
                      </HelperText>

                      <DateTimePickerModal
                        minimumDate={new Date()}
                        isVisible={isDatePickerVisible}
                        mode="datetime"
                        onConfirm={handleConfirm}
                        onCancel={hideDatePicker}
                      />
                    </View>
                    <View style={[styles.checkbox]}>
                      <Checkbox
                        uncheckedColor={colors.primaryColor}
                        status={checkboxChecked ? "checked" : "unchecked"}
                        onPress={() => {
                          setCheckboxChecked((prev) => !prev);
                        }}
                      />
                      <TouchableRipple
                        style={{ padding: 10, borderRadius: 10 }}
                        onPress={() => setCheckboxChecked((prev) => !prev)}
                        borderless={true}
                      >
                        <Text
                          style={{
                            color: colors.primaryColor,
                            fontFamily: "poppins",
                          }}
                        >
                          Should notify
                        </Text>
                      </TouchableRipple>
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
                        <Text
                          style={{
                            paddingRight: 10,
                            fontFamily: "poppins",
                            fontSize: 14,
                          }}
                        >
                          Add an image (optional)
                        </Text>
                        <MaterialCommunityIcons
                          name="image-plus"
                          size={30}
                          color="black"
                        />
                      </TouchableOpacity>
                    </View>

                    <TouchableOpacity
                      activeOpacity={0.7}
                      style={{
                        paddingLeft: 10,
                        marginTop: -10,
                        alignSelf: "flex-start",
                      }}
                      onPress={() => setShowModal(true)}
                    >
                      <Text
                        style={{
                          color: "#407BFF",
                          fontFamily: "poppins",
                          fontSize: 12,
                        }}
                      >
                        {pickerR && "Click to preview the image"}
                      </Text>
                    </TouchableOpacity>

                    <ImagePreview
                      visible={showModal}
                      source={{ uri: pickerR }}
                      close={() => setShowModal(false)}
                    />
                  </>
                </View>
              </>
              <View style={{ flex: 1 }}>
                <Button
                  style={{
                    marginTop: 20,
                    width: "100%",
                    backgroundColor: "#407BFF",
                    borderRadius: 10,
                  }}
                  mode="contained"
                  onPress={() => handleSubmit()}
                  loading={isLoading || uploading}
                >
                  <Text style={{ color: "white", fontFamily: "poppinsBold" }}>
                    {taskId ? "Update" : "Create"}
                  </Text>
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
    flex: 1,
  },
  title: {
    paddingVertical: 20,
    fontSize: 22,
    fontFamily: "poppinsBold",
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
    backgroundColor: "#DEE3FC",
    padding: 10,
    paddingVertical: 20,
    fontSize: 13,
    fontFamily: "poppinsLight",
    borderRadius: 10,
  },

  photoPicker: {
    paddingHorizontal: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  inputContainer: {},
  inputTitle: {
    fontFamily: "poppins",
  },
});
