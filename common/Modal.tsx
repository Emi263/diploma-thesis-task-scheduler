import React from "react";
import { Modal, View } from "react-native";
import { Text } from "react-native-paper";
import useTheme from "./hooks/useTheme";

interface ModalProps {
  children: React.ReactNode;
  visible: boolean;
  animationType?: "slide" | "none" | "fade";
}

const ModalComponent: React.FunctionComponent<ModalProps> = ({
  children,
  visible,
  animationType = "slide",
}) => {
  const { colors } = useTheme();
  return (
    <Modal
      style={{ backgroundColor: "red", flex: 1 }}
      visible={visible}
      animationType={animationType}
    >
      <View> {children}</View>
    </Modal>
  );
};

export default ModalComponent;
