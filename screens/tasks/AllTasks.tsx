import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, FlatList } from "react-native";
import { useQuery } from "react-query";
import { getAllTaks } from "../../api/task";
import { ActivityIndicator } from "react-native-paper";
import SingleTask from "./components/SingleTaskComponent";

const AllTasks = () => {
  const { data: tasks, isLoading, isError } = useQuery("allTasks", getAllTaks);

  return (
    <View style={styles.container}>
      {isLoading && (
        <View style={styles.loaderContainer}>
          <ActivityIndicator style={styles.loader} animating size="large" />
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
