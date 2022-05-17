import React from "react";
import { View, StyleSheet, TouchableOpacity, Text } from "react-native";
interface Props {
  onPress(): void;
  title: string;
  color?: string;
  background?: string;
  icon?: React.ReactNode;
}

const Button: React.FunctionComponent<Props> = ({
  onPress,
  title,
  color,
  icon,
}) => {
  return (
    <View style={styles.view}>
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={onPress}
        style={styles.container}
      >
        <>
          <Text style={[styles.title, { color: color }]}>
            {title} {icon}
          </Text>
        </>
      </TouchableOpacity>
    </View>
  );
};

export default Button;

const styles = StyleSheet.create({
  view: {
    paddingTop: 70,
    paddingHorizontal: 40,
  },
  container: {
    backgroundColor: "#8F00FF",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 12,
    maxWidth: "100%",
    display: "flex",
    justifyContent: "center",
  },
  title: {
    color: "red",
    fontSize: 18,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: "bold",
    alignSelf: "center",
    textTransform: "uppercase",
  },
});
