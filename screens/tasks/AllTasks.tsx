import React from "react";
import { StyleSheet, View, FlatList, Text } from "react-native";
import { useQuery } from "react-query";
import { getAllTaks } from "../../api/task";
import { ActivityIndicator } from "react-native-paper";
import SingleTask from "./components/SingleTaskComponent";
import useTheme from "../../common/hooks/useTheme";

const AllTasks = () => {
  const { colors } = useTheme();
  const { data: tasks, isLoading, isError } = useQuery("allTasks", getAllTaks);

  return (
    <View style={[styles.container, { backgroundColor: colors.primaryBg }]}>
      {isLoading && (
        <View style={styles.loaderContainer}>
          <ActivityIndicator style={styles.loader} animating size="large" />
        </View>
      )}

      {tasks?.length === 0 && (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <Text>No Tasks to show :(</Text>
        </View>
      )}
      <FlatList
        numColumns={2}
        data={tasks}
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
  );
};

export default AllTasks;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 10,
    backgroundColor: "white",
  },
  loaderContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  loader: {
    paddingVertical: 20,
  },
});
