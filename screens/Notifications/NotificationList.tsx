import React, { useState } from "react";
import { StyleSheet, View, FlatList, Dimensions, Animated } from "react-native";
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
