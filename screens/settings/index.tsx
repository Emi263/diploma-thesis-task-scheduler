import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Collapsible from "../../common/Collapsible";
import ChangePassword from "./ChangePassword";
import DisplaySettings from "./DisplaySettings";

const Index = () => {
  return (
    <View style={styles.container}>
      <DisplaySettings />
      <Collapsible headerLabel="Change Password">
        <ChangePassword />
      </Collapsible>
    </View>
  );
};

export default Index;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flex: 1,
    padding: 20,
  },
});
