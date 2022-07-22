import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { ActivityIndicator } from "react-native-paper";

const Loader = () => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="#407BFF" />
    </View>
  );
};

export default Loader;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
});
