import React from "react";
import { View } from "react-native";
import { Task } from "../../../models/task";
import TaskForm from "./TaskForm";

interface TaskProps {
  task: Task;
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const EditTask: React.FC<TaskProps> = ({ task, setOpenModal }) => {
  return (
    <View>
      <TaskForm task={task} setOpenModal={setOpenModal} />
    </View>
  );
};

export default EditTask;
