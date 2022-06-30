import React, { SetStateAction, useState } from "react";
import { Pressable, Text, View, TouchableOpacity, Image } from "react-native";
import { TextInput, HelperText, Button } from "react-native-paper";
import { Checkbox } from "react-native-paper";
import { Chip } from "react-native-paper";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Formik } from "formik";
import { TaskSchema } from "./validation";
import { FontAwesome } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { styles } from "./styles";
import { MaterialIcons } from "@expo/vector-icons";
import { createTask } from "../../api/task";
import { Snackbar } from "react-native-paper";
import moment from "moment";
import TaskForm from "./components/TaskForm";

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
  const [selectedImage, setSelectedImage] = React.useState<{
    localUri: string;
  } | null>(null);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);

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

  const [snackBarVisible, setSnackbarVisible] = useState(false);
  const handleCreateTask = (values: InititalValues) => {};

  //let the user change the calendar mode? probably
  return (
    <View>
      <Pressable onPress={() => setShowModal(false)}>
        <Text>Close</Text>
      </Pressable>

      <TaskForm />
    </View>
  );
};

export default CreateTask;
