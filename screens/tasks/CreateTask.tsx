import React, { SetStateAction } from "react";
import { Pressable, Text } from "react-native";

interface CreateTaskProps {
  setShowModal: React.Dispatch<SetStateAction<boolean>>;
}

const CreateTask: React.FunctionComponent<CreateTaskProps> = ({
  setShowModal,
}) => {
  //insert modal here

  return (
    <Pressable onPress={() => setShowModal(false)}>
      <Text>Close</Text>
    </Pressable>
  );
};

export default CreateTask;
