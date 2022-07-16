import React, { SetStateAction } from "react";
import { Pressable, View, StyleSheet } from "react-native";
import { AntDesign } from "@expo/vector-icons";

import TaskForm from "./components/TaskForm";
import useTheme from "../../common/hooks/useTheme";

interface CreateTaskProps {
  setShowModal: React.Dispatch<SetStateAction<boolean>>;
}

const CreateTask: React.FunctionComponent<CreateTaskProps> = ({
  setShowModal,
}) => {
  //insert modal here

  const { colors } = useTheme();
  //let the user change the calendar mode? probably
  return (
    <View style={[styles.container, { backgroundColor: colors.primaryBg }]}>
      <TaskForm setOpenModal={setShowModal} />
    </View>
  );
};

export default CreateTask;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    flex: 1,
  },
  closeBtn: {
    alignSelf: "flex-end",
    paddingHorizontal: 10,
    marginTop: 20,
    marginRight: 10,
  },
});
