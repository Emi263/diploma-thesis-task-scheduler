import React, { SetStateAction, useState } from "react";
import {
  Pressable,
  Text,
  View,
  TouchableOpacity,
  Image,
  StyleSheet,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";

import TaskForm from "./components/TaskForm";

interface CreateTaskProps {
  setShowModal: React.Dispatch<SetStateAction<boolean>>;
}

const CreateTask: React.FunctionComponent<CreateTaskProps> = ({
  setShowModal,
}) => {
  //insert modal here

  //let the user change the calendar mode? probably
  return (
    <View style={styles.container}>
      <Pressable style={styles.closeBtn} onPress={() => setShowModal(false)}>
        <AntDesign name="closecircle" size={30} color="black" />
      </Pressable>
      <TaskForm setOpenModal={setShowModal} />
    </View>
  );
};

export default CreateTask;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
  },
  closeBtn: {
    alignSelf: "flex-end",
    paddingHorizontal: 10,
    marginTop: 20,
    marginRight: 10,
  },
});
