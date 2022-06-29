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

  const handleCreateTask = (values: InititalValues) => {};

  //let the user change the calendar mode? probably
  return (
    <View>
      <Pressable onPress={() => setShowModal(false)}>
        <Text>Close</Text>
      </Pressable>

      <Formik
        validationSchema={TaskSchema}
        initialValues={initialValues}
        onSubmit={(values: any) => {
          console.log(values);
          createTask(values)
            .then((dt) => console.log(dt))
            .catch((e) => console.log(e));
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
                        visible={!!touched.description && !!errors.description}
                      >
                        {errors.description}
                      </HelperText>
                    </>
                  </View>
                  <View style={styles.checkbox}>
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
                          backgroundColor: "gray",
                          borderRadius: 20,

                          padding: 10,
                        }}
                        onPress={() => setShowDatePicker(true)}
                      >
                        <FontAwesome name="calendar" size={30} color="white" />
                        <Text
                          style={{
                            paddingHorizontal: 20,
                            paddingBottom: 5,
                            color: "white",
                          }}
                        >
                          Select Date and Time
                        </Text>
                      </TouchableOpacity>
                    </View>
                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                      }}
                    >
                      <Text>Date:</Text>
                      <Chip style={{ marginLeft: 10 }} icon="calendar">
                        {selectedDate}
                      </Chip>
                    </View>
                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        paddingVertical: 10,
                      }}
                    >
                      <Text>Time:</Text>
                      <Chip
                        style={{ marginLeft: 10 }}
                        icon="clock-time-nine-outline"
                      >
                        {selectedTime}
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
            <Button onPress={() => handleSubmit()}>Create task</Button>
          </View>
        )}
      </Formik>
    </View>
  );
};

export default CreateTask;
