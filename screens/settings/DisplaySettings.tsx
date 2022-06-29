import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Switch } from "react-native-paper";

const DisplaySettings = () => {
  const [isSwitchOn, setIsSwitchOn] = React.useState(false);
  const onToggleSwitch = () => setIsSwitchOn(!isSwitchOn);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Display Settings</Text>
      <View>
        <View style={styles.mode}>
          <Text style={{ paddingRight: 20 }}>Dark Mode</Text>
          <Switch value={isSwitchOn} onValueChange={onToggleSwitch} />
        </View>
      </View>
    </View>
  );
};

export default DisplaySettings;

const styles = StyleSheet.create({
  container: {},
  title: {
    fontWeight: "700",
    fontSize: 14,
  },
  mode: {
    flexDirection: "row",
    alignItems: "center",
  },
});
