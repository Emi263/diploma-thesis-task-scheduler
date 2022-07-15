import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React from "react";
import { View } from "react-native";
import { RootStackParams } from "../../../ScreenIndex";
import TaskForm from "./TaskForm";

type Props = NativeStackScreenProps<RootStackParams, "EditTask">;

const EditTask: React.FC<Props> = ({
  route: {
    params: { task },
  },
}) => {
  return (
    <View>
      <TaskForm task={task} />
    </View>
  );
};

export default EditTask;
