import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
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
          <EditTask task={task} />

          <TouchableOpacity onPress={handleCloseModal}>
            <Text>Close modal</Text>
          </TouchableOpacity>
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
