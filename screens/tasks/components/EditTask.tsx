import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React from "react";
import { View } from "react-native";
import useTheme from "../../../common/hooks/useTheme";
import { RootStackParams } from "../../../ScreenIndex";
import TaskForm from "./TaskForm";

type Props = NativeStackScreenProps<RootStackParams, "EditTask">;

const EditTask: React.FC<Props> = ({
  route: {
    params: { task },
  },
}) => {
  const { colors } = useTheme();
  return (
    <View style={{ flex: 1, backgroundColor: colors.primaryBg }}>
      <TaskForm task={task} />
    </View>
  );
};

export default EditTask;
