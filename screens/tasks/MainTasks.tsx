import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import React from "react";
import { Text, View, FlatList, TouchableOpacity, Image } from "react-native";
import { ActivityIndicator, TouchableRipple } from "react-native-paper";
import { useQuery } from "react-query";
import { getTodayTasks, getTopTasks } from "../../api/task";
import useTheme from "../../common/hooks/useTheme";
import { Task } from "../../models/task";
import { RootStackParams } from "../../ScreenIndex";
import SingleTask from "./components/SingleTaskComponent";
import { styles } from "./styles";

import { Entypo } from "@expo/vector-icons";
type introScreenProp = StackNavigationProp<RootStackParams>;

const Main = () => {
  const { data: topTasks, isLoading } = useQuery("topTasks", getTopTasks, {
    retryDelay: 300,
  });

  const { data: todayTasks } = useQuery("todayTask", getTodayTasks);

  console.log(isLoading);

  const nav = useNavigation<introScreenProp>();
  const { colors } = useTheme();
  return (
    <>
      <View>
        {generateTodayTask(todayTasks)}
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

          <FlatList
            numColumns={1}
            data={todayTasks?.slice(0, 2)}
            keyExtractor={(item) => item.id.toString()}
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
          <TouchableRipple
            onPress={() => nav.push("Tasks")}
            borderless={true}
            style={{
              alignSelf: "center",
              borderRadius: 6,
              marginTop: 10,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  textAlign: "center",
                  padding: 10,
                  fontFamily: "poppins",
                }}
              >
                View all tasks
              </Text>
              <Entypo
                style={{ marginTop: -2 }}
                name="chevron-small-right"
                size={30}
                color="black"
              />
            </View>
          </TouchableRipple>
        </View>
      </View>
      {/* 
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
                color: colors.link,
                textDecorationColor: colors.link,
                textDecorationStyle: "solid",
                textDecorationLine: "underline",
              }}
            >
              View all Tasks
            </Text>
          </TouchableOpacity>
        </View>
      )} */}
    </>
  );
};

export default Main;

const generateTodayTask = (tasks: Task[] | undefined) => {
  if (!tasks) return <View></View>;
  if (!tasks.length) {
    return (
      <View>
        <View
          style={{
            paddingHorizontal: 10,

            paddingVertical: 20,
          }}
        >
          <Text
            style={{
              fontFamily: "poppinsBold",
              fontSize: 20,
              textAlign: "center",
            }}
          >
            You have no tasks today!
          </Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Image
            source={require("../../assets/empty.png")}
            style={{ width: 200, height: 200 }}
          />
        </View>
      </View>
    );
  }
  return (
    <View
      style={{
        paddingHorizontal: 10,
        flexDirection: "row",
        paddingVertical: 10,
      }}
    >
      <Text style={{ fontFamily: "poppinsBold", fontSize: 20 }}>
        You have got{" "}
      </Text>
      <Text
        style={{ fontFamily: "poppinsBold", color: "#407BFF", fontSize: 20 }}
      >
        {tasks.length === 1 ? "1 task" : `${tasks.length} tasks`} today!
      </Text>
    </View>
  );
};
