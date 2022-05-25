import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  view: {
    flex: 1,
    width: "100%",
    display: "flex",
    alignContent: "center",
    alignItems: "center",
    justifyContent: "center",
  },
  container: {
    flex: 1,
    padding: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontWeight: "500",
    fontSize: 20,
  },
  input: {
    height: 50,
    width: "80%",
    borderWidth: 1,
    padding: 6,
    paddingHorizontal: 20,
    marginBottom: 10,
  },
  error: {
    color: "red",
    paddingVertical: 10,
  },
});
