import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    paddingTop: 100,
    width: "100%",
    backgroundColor: "white",
    position: "relative",
    flex: 1,
  },
  image: {
    position: "relative",
    maxWidth: "100%",
    height: 270,
  },
  title: {
    fontWeight: "600",
    padding: 2,
    paddingLeft: 30,
    paddingTop: 20,
  },
  description: {
    padding: 2,
    paddingLeft: 30,
  },

  pagination: {
    display: "flex",
    position: "relative",
    width: "100%",
    padding: 2,
    height: 30,
    flexDirection: "row",
    justifyContent: "flex-end",
    paddingRight: 30,
  },
  dot: {
    position: "relative",
    width: 12,
    height: 12,
    backgroundColor: "green",
    borderRadius: 12 / 2,
    padding: 1,
    marginLeft: 5,
  },
  back: {
    position: "absolute",
    top: 50,
    left: 10,
    zIndex: 123,
    paddingHorizontal: 20,
    width: 150,
    paddingVertical: 10,
  },
});
