import { StyleSheet } from "react-native";

export const homeStyles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60,
    backgroundColor: "white",
  },
});

export const headerStyles = StyleSheet.create({
  container: {
    padding: 10,
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    backgroundColor: "white",
  },
  header: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 20,
    paddingRight: 10,
  },
  button: {
    flex: 0.5,
    justifyContent: "center",
  },
  logout: {
    fontSize: 12,
  },
  name: {
    color: "red",
    fontWeight: "500",
  },
});
