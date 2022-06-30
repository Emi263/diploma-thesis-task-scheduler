import React, { useEffect, useState } from "react";
import { Text, View } from "react-native";
import { getAllTaks } from "../../api/task";

const AllTasks = () => {
  const [tasks, setTasks] = useState() as any;

  const getTasks = async () => {
    try {
      const { data } = await getAllTaks();

      console.log(data);

      setTasks(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getTasks();
  }, []);

  return (
    <View>
      {tasks?.map((task) => {
        return <Text key={task.id}>{task.title}</Text>;
      })}
    </View>
  );
};

export default AllTasks;
