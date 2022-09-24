import React from "react";
import {
  StyleSheet,
  View,
  FlatList,
  Text,
  Image,
  Dimensions,
  Platform,
} from "react-native";
import { useQuery } from "react-query";
import { getAllTaks } from "../../api/task";
import { ActivityIndicator } from "react-native-paper";
import SingleTask from "./components/SingleTaskComponent";
import useTheme from "../../common/hooks/useTheme";
import { FontAwesome } from "@expo/vector-icons";
const AllTasks = () => {
  const { colors } = useTheme();
  const { data: tasks, isLoading, isError } = useQuery("allTasks", getAllTaks);

  const header = (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        paddingTop: Platform.OS === "ios" ? 60 : 40,
      }}
    >
      <Text
        style={{
          fontFamily: "poppinsBold",
          fontSize: 16,
          color: colors.primaryColor,
        }}
      >
        Here is the list of all tasks
      </Text>
      <FontAwesome
        name="hand-pointer-o"
        size={30}
        color={colors.primaryColor}
        style={{
          transform: [
            {
              rotate: "180deg",
            },
          ],
        }}
      />
    </View>
  );

  if (tasks?.length === 0) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: colors.primaryBg,
        }}
      >
        <Image
          style={{ width: Dimensions.get("screen").width - 20, height: 400 }}
          source={require("../../assets/empty.png")}
        />
        <Text
          style={{
            fontFamily: "poppinsBold",
            fontSize: 16,
            color: colors.primaryColor,
          }}
        >
          No Tasks to show :(
        </Text>
      </View>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: colors.primaryBg }]}>
      {isLoading && (
        <View style={styles.loaderContainer}>
          <ActivityIndicator style={styles.loader} animating size="large" />
        </View>
      )}

      {!isLoading && !isError && (
        <FlatList
          numColumns={1}
          data={tasks}
          keyExtractor={(item) => item.id.toString()}
          ListHeaderComponent={header}
          ListFooterComponent={<View style={{ height: 20 }}></View>}
          renderItem={({
            item: { date, shouldNotify, title, description, id, image },
          }) => (
            <SingleTask
              id={id}
              date={date}
              title={title}
              description={description}
              shouldNotify={shouldNotify}
              image={image ? image : ""}
            />
          )}
        />
      )}
    </View>
  );
};

export default AllTasks;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 10,
    backgroundColor: "white",
  },
  loaderContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  loader: {
    paddingVertical: 20,
  },
});
