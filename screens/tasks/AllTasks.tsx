import React from "react";
import { Text, View, FlatList, TouchableWithoutFeedback } from "react-native";
import { Task } from "../../models/task";
import SingleTask from "./SingleTask";
import { styles } from "./styles";

const AllTasks = () => {
  const mockData: Task[] = [
    {
      id: 1,
      title: "First task",
      description: "Go to school",
      shouldNotify: false,
      author: "Emi",
      date: new Date("2022-06-22"),
    },
    {
      id: 2,
      title: "First task",
      description: "Go to school",
      shouldNotify: false,
      author: "Emi",
      date: new Date("2022-06-02"),
    },
    {
      id: 3,
      title: "First task",
      description: "Go to school",
      shouldNotify: false,
      author: "Emi",
      date: new Date("2022-06-02"),
    },
    {
      id: 4,
      title: "First task",
      description: "Go to school",
      shouldNotify: false,
      author: "Emi",
      date: new Date("2022-06-02"),
    },
    {
      id: 5,
      title: "First task",
      description: "Go to school",
      shouldNotify: false,
      author: "Emi",
      date: new Date("2022-06-02"),
    },
    {
      id: 6,
      title: "First task",
      description: "Go to school",
      shouldNotify: false,
      author: "Emi",
      date: new Date("2022-06-02"),
    },
    {
      id: 7,
      title: "First task",
      description: "Go to school",
      shouldNotify: false,
      author: "Emi",
      date: new Date("2022-06-02"),
    },
  ];

  return (
    <View>
      <Text style={styles.title}>Upcoming tasks</Text>
      <View style={{}}>
        <FlatList
          data={mockData.slice(0, 3)}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({
            item: { date, shouldNotify, title, author, description },
          }) => (
            <TouchableWithoutFeedback>
              <SingleTask
                date={date}
                title={title}
                description={description}
                author={author}
                shouldNotify={shouldNotify}
              />
            </TouchableWithoutFeedback>
          )}
        />
      </View>
    </View>
  );
};

export default AllTasks;
