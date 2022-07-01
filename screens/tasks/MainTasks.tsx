import React from "react";
import { Text, View, FlatList } from "react-native";
import { ActivityIndicator } from "react-native-paper";
import { useQuery } from "react-query";
import { getTopTasks } from "../../api/task";
import { Task } from "../../models/task";
import SingleTask from "./components/SingleTaskComponent";
import { styles } from "./styles";

const AllTasks = () => {
  const {
    data: topTasks,
    isLoading,
    isError,
  } = useQuery("topTasks", getTopTasks);

  return (
    <View style={{ backgroundColor: "white" }}>
      <Text style={styles.title}>These are your upcoming tasks!</Text>
      <View style={{}}>
        {isLoading && (
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              paddingVertical: 30,
            }}
          >
            <ActivityIndicator size="large" />
          </View>
        )}
        <FlatList
          numColumns={2}
          data={topTasks}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({
            item: { date, shouldNotify, title, description, id },
          }) => (
            <SingleTask
              id={id}
              date={date}
              title={title}
              description={description}
              shouldNotify={shouldNotify}
            />
          )}
        />
      </View>
    </View>
  );
};

export default AllTasks;
