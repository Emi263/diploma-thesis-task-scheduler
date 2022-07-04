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
    width: "40%",
    marginBottom: 20,

    paddingHorizontal: 10,
    padding: 20,
    borderRadius: 20,
    marginHorizontal: 16,
    margin: "auto",
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
});
