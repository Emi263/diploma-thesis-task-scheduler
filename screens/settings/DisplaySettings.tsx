import React, { useContext } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Switch } from "react-native-paper";
import useTheme from "../../common/hooks/useTheme";
import { ThemeContext } from "../../context/ThemeContext";

const DisplaySettings = () => {
  const { changeTheme, theme } = useContext(ThemeContext);

  const [isSwitchOn, setIsSwitchOn] = React.useState(theme === "dark");

  const onToggleSwitch = (e: boolean) => {
    setIsSwitchOn((prev) => !prev);
    const theme = e ? "dark" : "light";
    changeTheme(theme);
  };

  console.log(theme);

  const { colors } = useTheme();
  return (
    <View style={[styles.container, { backgroundColor: colors.primaryBg }]}>
      <Text
        style={[
          styles.title,
          {
            color: colors.primaryColor,
          },
        ]}
      >
        Display Settings
      </Text>
      <View>
        <View style={styles.mode}>
          <Text style={{ paddingRight: 20, color: colors.primaryColor }}>
            Dark Mode
          </Text>
          <Switch
            style={{ backgroundColor: colors.primaryBg }}
            value={isSwitchOn}
            onValueChange={onToggleSwitch}
          />
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
