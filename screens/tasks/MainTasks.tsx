import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import React from "react";
import { Text, View, FlatList, TouchableOpacity } from "react-native";
import { ActivityIndicator } from "react-native-paper";
import { useQuery } from "react-query";
import { getTopTasks } from "../../api/task";
import useTheme from "../../common/hooks/useTheme";
import { RootStackParams } from "../../ScreenIndex";
import SingleTask from "./components/SingleTaskComponent";
import { styles } from "./styles";

type introScreenProp = StackNavigationProp<RootStackParams>;

const AllTasks = () => {
  const { data: topTasks, isLoading } = useQuery("topTasks", getTopTasks);

  const nav = useNavigation<introScreenProp>();
  const { colors } = useTheme();
  return (
    <>
      <View>
        <Text style={[styles.title, { color: colors.primaryColor }]}>
          These are your upcoming tasks!
        </Text>
        <View style={{}}>
          {isLoading && (
            <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                paddingVertical: 30,
              }}
            >
              <ActivityIndicator size="large" />
            </View>
          )}
          {topTasks?.length === 0 && (
            <View
              style={{
                paddingVertical: 50,
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: colors.primaryBg,
              }}
            >
              <Text style={{ color: colors.primaryColor }}>
                No tasks to show
              </Text>
            </View>
          )}
          <FlatList
            numColumns={2}
            data={topTasks}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({
              item: { date, shouldNotify, title, description, id },
            }) => (
              <SingleTask
                id={id}
                date={date}
                title={title}
                description={description}
                shouldNotify={shouldNotify}
              />
            )}
          />
        </View>
      </View>

      {topTasks?.length !== 0 && (
        <View
          style={{
            width: "100%",
            display: "flex",
            flexDirection: "row",
            justifyContent: "flex-end",
          }}
        >
          <TouchableOpacity
            style={{ width: "50%" }}
            activeOpacity={0.6}
            onPress={() => nav.navigate("Tasks")}
          >
            <Text
              style={{
                fontWeight: "600",
                textAlign: "right",
                paddingHorizontal: 40,
              }}
            >
              View all Tasks
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </>
  );
};

export default AllTasks;
