import React, { useState } from "react";
import {
  StyleSheet,
  View,
  FlatList,
  Dimensions,
  Animated,
  Text,
} from "react-native";
import { useQuery } from "react-query";
import { getAllTaks } from "../../api/task";
import "react-native-gesture-handler";
import Loader from "../../common/Loader";
import SingleNotifItem from "./SingleNotifItem";
import useTheme from "../../common/hooks/useTheme";

const NotificationList = () => {
  const { colors } = useTheme();
  const { data: tasks, isLoading } = useQuery("allTaks", getAllTaks);

  if (isLoading) {
    return <Loader />;
  }

  if (tasks?.length === 0) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>No tasks to show!</Text>
      </View>
    );
  }
  return (
    <View>
      <FlatList
        data={tasks}
        renderItem={({ item }) => {
          return <SingleNotifItem data={item} />;
        }}
        ItemSeparatorComponent={() => {
          return (
            <View
              style={{ height: 1, backgroundColor: colors.primaryColor }}
            ></View>
          );
        }}
      />
    </View>
  );
};

export default NotificationList;
