import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,

    alignItems: "center",
    backgroundColor: "white",
  },
  view: {
    flex: 1,
    width: "100%",
    display: "flex",
    alignContent: "center",
    alignItems: "center",
  },

  upperView: {
    backgroundColor: "#407BFF",
    width: "100%",
    height: 200,
    paddingTop: 50,
    paddingHorizontal: 20,
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 20,
  },
  title: {
    fontSize: 16,
    alignSelf: "flex-start",
    fontFamily: "poppins",
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
    backgroundColor: "white",
  },
  error: {
    color: "red",
    paddingVertical: 10,
  },
});
