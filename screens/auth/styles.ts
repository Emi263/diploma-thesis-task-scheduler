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
    paddingTop: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontWeight: "700",
    fontSize: 16,
  },
  inputWrapper: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  inputContainer: {
    width: "100%",
    margin: "auto",
    display: "flex",
    justifyContent: "center",
    alignContent: "center",
    paddingHorizontal: 30,
  },
  input: {
    display: "flex",
    height: 50,
    width: "100%",
    padding: 2,
    paddingHorizontal: 20,
    fontSize: 14,
    marginTop: 20,
  },
  error: {
    color: "red",
    paddingVertical: 10,
  },
});
