import React from "react";

import {
  View,
  KeyboardAvoidingView,
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard,
  Text,
  Platform,
} from "react-native";
import useTheme from "./hooks/useTheme";

export const KeyboardAvoidingViewWrapper: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const { colors } = useTheme();
  return (
    <KeyboardAvoidingView
      keyboardVerticalOffset={10}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1, backgroundColor: colors.primaryBg }}
    >
      <ScrollView showsVerticalScrollIndicator={false}>
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
          <>{children}</>
        </TouchableWithoutFeedback>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default KeyboardAvoidingViewWrapper;
