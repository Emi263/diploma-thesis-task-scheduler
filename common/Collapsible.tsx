import React, { useState } from "react";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import { AntDesign } from "@expo/vector-icons";
interface Props {
  children: React.ReactNode;
  headerLabel: string;
}

const Collapsible: React.FunctionComponent<Props> = ({
  children,
  headerLabel,
}) => {
  const [showContent, setShowContent] = useState(false);

  const Icon = (
    <AntDesign
      name={showContent ? "downcircleo" : "rightcircleo"}
      size={24}
      color="black"
    />
  );

  const toggleContent = () => {
    setShowContent((show) => !show);
  };
  return (
    <View>
      <TouchableOpacity
        onPress={toggleContent}
        activeOpacity={0.5}
        style={styles.header}
      >
        <Text>{headerLabel}</Text>
        {Icon}
      </TouchableOpacity>

      {showContent && children}
    </View>
  );
};

export default Collapsible;

const styles = StyleSheet.create({
  container: {},
  header: {
    flexDirection: "row",
    paddingHorizontal: 20,
    justifyContent: "space-between",
    alignItems: "center",
    borderTopWidth: 1,
    borderBottomWidth: 1,
    paddingVertical: 10,
    borderColor: "#d1d1d1",
  },
  content: {},
});
