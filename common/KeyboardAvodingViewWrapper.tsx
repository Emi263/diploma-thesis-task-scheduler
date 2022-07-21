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

export const KeyboardAvoidingViewWrapper: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  return (
    <KeyboardAvoidingView
      keyboardVerticalOffset={0}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
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
