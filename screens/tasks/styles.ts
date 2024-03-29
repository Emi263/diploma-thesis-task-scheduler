import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  view: {
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
  title: {
    paddingVertical: 20,
    fontSize: 18,
    paddingHorizontal: 20,
  },

  singleTask: {
    paddingHorizontal: 10,
    borderRadius: 10,
    borderLeftWidth: 6,
    borderLeftColor: "red",
  },
  textContent: {
    paddingVertical: 10,
  },
  checkbox: {
    flexDirection: "row",
    alignItems: "center",
  },
  input: {},

  photoPicker: {
    backgroundColor: "purple",
    paddingVertical: 10,
    paddingHorizontal: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  header: {
    paddingHorizontal: 10,
  },
});
