import React from "react";
import { Modal } from "react-native";

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
  return (
    <Modal visible={visible} animationType={animationType}>
      {children}
    </Modal>
  );
};

export default ModalComponent;
