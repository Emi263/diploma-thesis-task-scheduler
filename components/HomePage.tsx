import React from "react";
import { Image, StyleSheet, Text, View, Alert } from "react-native";
import CustomButton from "../common/Button";
import { AntDesign } from "@expo/vector-icons";

const HomePage = () => {
  const handleOnPressButton = () => {};

  return (
    <View style={styles.container}>
      <Image style={styles.image} source={require("../assets/todo.png")} />
      <Text style={styles.title}>Create your task</Text>
      <Text style={styles.description}>
        Register. Schedule a task. Attach a photo to it. Get notified 10 minutes
        before. Easy and simple.
      </Text>
      <View style={styles.pagination}>
        <Text style={styles.dot}></Text>
        <Text style={[styles.dot, { backgroundColor: "#d9dbde" }]}></Text>
        <Text style={[styles.dot, { backgroundColor: "#d9dbde" }]}></Text>
      </View>
      <CustomButton
        title="Next"
        onPress={() => {}}
        color="white"
        icon={<AntDesign name="caretright" size={18} color="white" />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 100,
    width: "100%",
  },
  image: {
    position: "relative",
    maxWidth: "100%",
    height: 270,
  },
  title: {
    fontWeight: "600",
    padding: 2,
    paddingLeft: 30,
  },
  description: {
    padding: 2,
    paddingLeft: 30,
  },

  pagination: {
    display: "flex",
    position: "relative",
    width: "100%",
    padding: 2,
    height: 30,
    flexDirection: "row",
    justifyContent: "flex-end",
    paddingRight: 30,
  },
  dot: {
    position: "relative",
    width: 12,
    height: 12,
    backgroundColor: "green",
    borderRadius: 12 / 2,
    padding: 1,
    marginLeft: 5,
  },
});

export default HomePage;
