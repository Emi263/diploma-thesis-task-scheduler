import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Collapsible from "../../common/Collapsible";
import DisplaySettings from "./DisplaySettings";
const Index = () => {
  return (
    <View style={styles.container}>
      <DisplaySettings />
      <Collapsible headerLabel="Change Password">
        <Text>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Deserunt,
          temporibus accusantium illo id consequuntur quam quas aut ratione
          perspiciatis tempore.
        </Text>
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
