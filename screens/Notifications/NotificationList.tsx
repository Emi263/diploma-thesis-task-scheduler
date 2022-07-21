import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  FlatList,
  Dimensions,
  Animated,
  Text,
  ImageBackground,
  Image,
} from "react-native";
import { useQuery } from "react-query";
import {
  getAllTaks,
  getLastWeekTasks,
  getTaskGraphValues,
} from "../../api/task";
import "react-native-gesture-handler";
import Loader from "../../common/Loader";
import SingleNotifItem from "./SingleNotifItem";
import useTheme from "../../common/hooks/useTheme";
import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart,
} from "react-native-chart-kit";
import {
  VictoryBar,
  VictoryChart,
  VictoryTheme,
  VictoryLine,
  VictoryPie,
  Bar,
  VictoryAxis,
  VictoryLabel,
} from "victory-native";
import { formatDate } from "../../helper/helpers";
import { ActivityIndicator } from "react-native-paper";

const NotificationList = () => {
  const { data: values, isLoading: l } = useQuery(
    "taskValues",
    getTaskGraphValues
  );

  const { colors } = useTheme();
  const { data: tasks, isLoading } = useQuery("allTaks", getAllTaks);
  const { data: lastWeekTasks } = useQuery("lastWeekTasks", getLastWeekTasks);
  console.log(lastWeekTasks);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  if (loading) {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: "white",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Loader />
      </View>
    );
  }
  return (
    <>
      <View style={{ backgroundColor: "white", paddingVertical: 0, flex: 1 }}>
        <View style={{ justifyContent: "center", alignItems: "center" }}>
          <Image
            style={{ width: Dimensions.get("screen").width - 200, height: 250 }}
            source={require("../../assets/data.png")}
          />
        </View>
        <Text style={{ fontFamily: "poppinsBold", textAlign: "center" }}>
          Past and upcoming tasks in numbers:
        </Text>
        <View style={{ backgroundColor: "white", minHeight: 200 }}>
          {values && (
            <VictoryChart
              style={{
                background: {
                  fill: "white",
                  background: "white",
                  color: "white",
                },
              }}
              theme={VictoryTheme.material}
              domainPadding={10}
            >
              <VictoryBar
                labels={values.map((va) => va.number_of_tasks)}
                labelComponent={<VictoryLabel dy={30} />}
                barRatio={0.8}
                style={{
                  data: { fill: "#407BFF", background: "white" },
                  labels: {
                    fill: "white",
                    fontSize: 20,
                    fontFamily: "poppinsBold",
                  },
                }}
                data={values?.map((val) => {
                  return {
                    x: formatDate(new Date(val.day)),
                    y: val.number_of_tasks,
                  };
                })}
              />
              <VictoryAxis
                axisLabelComponent={
                  <View style={{ marginTop: 20, flex: 1 }}>
                    <VictoryLabel />
                  </View>
                }
                orientation="bottom"
                padding={20}
                offsetY={50}
                style={{
                  ticks: {
                    stroke: "blue",
                    fontFamily: "poppinsBold",
                    fontSize: 20,
                  },
                  grid: { stroke: "transparent" },
                  tickLabels: {
                    fill: "black",
                    fontFamily: "poppinsBold",
                    fontSize: 13,
                    marginTop: 20,
                  },
                }}
              />
            </VictoryChart>
          )}
        </View>
        {values && (
          <View style={{ backgroundColor: "white", flex: 1, paddingTop: 10 }}>
            <Text
              style={{
                fontFamily: "poppinsBold",
                color: "#407BFF",
                paddingHorizontal: 20,
                textAlign: "center",
                fontSize: 18,
              }}
            >
              You have created
              <Text style={{ color: "black" }}>
                {" "}
                {lastWeekTasks?.length} tasks{" "}
              </Text>
              in the past week!
            </Text>
          </View>
        )}
      </View>
    </>
  );
};

export default NotificationList;
