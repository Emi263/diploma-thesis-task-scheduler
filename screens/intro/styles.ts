import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    paddingTop: 100,
    width: "100%",
    backgroundColor: "red",
    position: "relative",
    flex: 1,
  },
  image: {
    position: "relative",
    maxWidth: "100%",
    height: 270,
  },
  title: {
    padding: 2,
    paddingLeft: 30,
    paddingTop: 20,
    fontSize: 20,
  },
  description: {
    padding: 2,
    paddingLeft: 30,
  },

  pagination: {
    display: "flex",
    position: "relative",
    padding: 2,
    height: 30,
    flexDirection: "row",
    alignItems: "center",
  },
  dot: {
    position: "relative",
    width: 12,
    height: 12,
    backgroundColor: "#407BFF",
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
  footer: {
    height: 50,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 30,
    marginTop: 50,
  },
  icon: {
    borderRadius: 50,
    padding: 4,
    elevation: 1,
    backgroundColor: "white",
  },
});
