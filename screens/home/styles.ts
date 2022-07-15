import { StyleSheet } from "react-native";

export const homeStyles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
  },
});

export const headerStyles = StyleSheet.create({
  container: {
    padding: 5,
    paddingTop: 40,
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "flex-start",
  },
  header: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingRight: 10,
    paddingHorizontal: 15,
  },
  button: {
    flex: 0.5,
    justifyContent: "center",
  },
  logout: {
    fontSize: 12,
  },
  name: {
    fontWeight: "500",
  },
});
