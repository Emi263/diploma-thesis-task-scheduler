import React from "react";
import { Text, View, FlatList } from "react-native";
import { Task } from "../../models/task";
import SingleTask from "./SingleTask";

const AllTasks = () => {
  const mockData: Task[] = [
    {
      id: 1,
      title: "First task",
      description: "Go to school",
      shouldNotify: false,
      author: "Emi",
      date: "",
    },
    {
      id: 2,
      title: "First task",
      description: "Go to school",
      shouldNotify: false,
      author: "Emi",
      date: "",
    },
  ];

  return (
    <View>
      <Text>Upcoming tasks</Text>
      <View>
        {/**Should be ranked properly */}
        <FlatList
          data={mockData}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({
            item: { date, shouldNotify, title, author, description },
          }) => (
            <SingleTask
              date={date}
              title={title}
              description={description}
              author={author}
              shouldNotify={shouldNotify}
            />
          )}
        />
      </View>
    </View>
  );
};

export default AllTasks;
