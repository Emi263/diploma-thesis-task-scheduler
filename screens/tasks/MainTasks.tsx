import React from "react";
import {
  Text,
  View,
  FlatList,
  TouchableWithoutFeedback,
  TouchableOpacity,
} from "react-native";
import { Task } from "../../models/task";
import SingleTask from "./components/SingleTaskComponent";
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
    <View style={{ backgroundColor: "white" }}>
      <Text style={styles.title}>These are your upcoming tasks!</Text>
      <View style={{}}>
        <FlatList
          numColumns={2}
          data={mockData.slice(0, 4)}
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
