import { AntDesign } from "@expo/vector-icons";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useState } from "react";
import {
  Text,
  TouchableOpacity,
  View,
  Pressable,
  StyleSheet,
} from "react-native";
import { useQuery } from "react-query";
import { getTask } from "../../../api/task";
import ModalComponent from "../../../common/Modal";
import { RootStackParams } from "../../../ScreenIndex";
import EditTask from "../components/EditTask";

type Props = NativeStackScreenProps<RootStackParams, "SingleTask">;

const SingleTaskScreen: React.FC<Props> = ({
  route: {
    params: { id },
  },
}) => {
  const { data: task } = useQuery(["singleTask", id], () => getTask(id), {
    enabled: !!id,
  });

  const [openModal, setOpenModal] = useState(false);

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  return (
    <View>
      <Text>{task?.title}</Text>

      {task && (
        <ModalComponent visible={openModal}>
          <Pressable style={styles.closeBtn} onPress={handleCloseModal}>
            <AntDesign name="closecircle" size={30} color="black" />
          </Pressable>
          <EditTask task={task} />
        </ModalComponent>
      )}
      <View
        style={{
          flexDirection: "row",
          justifyContent: "flex-start",
          paddingHorizontal: 20,
          paddingVertical: 50,
        }}
      >
        <TouchableOpacity
          onPress={handleOpenModal}
          style={{ backgroundColor: "gray" }}
        >
          <Text style={{ color: "white", padding: 20 }}>Edit task</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SingleTaskScreen;

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
