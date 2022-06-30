import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React from "react";
import { Text, View } from "react-native";
import { useQuery } from "react-query";
import { getTask } from "../../../api/task";
import { RootStackParams } from "../../../ScreenIndex";

type Props = NativeStackScreenProps<RootStackParams, "SingleTask">;

const SingleTaskScreen: React.FC<Props> = ({
  route: {
    params: { id },
  },
}) => {
  const { data: task } = useQuery(["singleTask", id], () => getTask(id), {
    enabled: !!id,
  });

  return (
    <View>
      <Text>{task?.title}</Text>
    </View>
  );
};

export default SingleTaskScreen;
