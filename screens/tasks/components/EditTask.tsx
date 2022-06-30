import React from "react";
import { View, Text } from "react-native";
import { Task } from "../../../models/task";
import TaskForm from "./TaskForm";

interface TaskProps {
  task: Task;
}

const EditTask: React.FC<TaskProps> = ({ task }) => {
  return (
    <View>
      <TaskForm task={task} />
    </View>
  );
};

export default EditTask;
