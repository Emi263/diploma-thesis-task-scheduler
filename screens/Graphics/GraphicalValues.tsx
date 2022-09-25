import React, { useEffect, useState } from "react";
import { View, Dimensions, Text, Image } from "react-native";
import { useQuery } from "react-query";
import { getLastWeekTasks, getTaskGraphValues } from "../../api/task";
import "react-native-gesture-handler";
import Loader from "../../common/Loader";

import {
  VictoryBar,
  VictoryChart,
  VictoryTheme,
  VictoryAxis,
  VictoryLabel,
} from "victory-native";
import { formatDate } from "../../helper/helpers";
import useTheme from "../../common/hooks/useTheme";

const GraphicalValues = () => {
  const { colors } = useTheme();
  const { data: values, isLoading: l } = useQuery(
    "taskValues",
    getTaskGraphValues
  );

  const { data: lastWeekTasks } = useQuery("lastWeekTasks", getLastWeekTasks);
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
          backgroundColor: colors.primaryBg,
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
      <View
        style={{
          backgroundColor: colors.primaryBg,
          paddingVertical: 0,
          paddingTop: 100,
          flex: 1,
        }}
      >
        <View style={{ justifyContent: "center", alignItems: "center" }}>
          <Image
            style={{ width: 100, height: 100 }}
            source={require("../../assets/data.png")}
          />
        </View>
        <Text
          style={{
            fontFamily: "poppinsBold",
            textAlign: "center",
            color: colors.primaryColor,
          }}
        >
          Past and upcoming tasks in numbers:
        </Text>
        <View style={{ backgroundColor: colors.primaryBg, minHeight: 200 }}>
          {values && (
            <VictoryChart
              style={{
                background: {
                  fill: colors.primaryBg,
                  background: colors.primaryBg,
                  color: colors.primaryBg,
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
                  data: { fill: "#407BFF", background: colors.primaryBg },
                  labels: {
                    fill: "white",
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
                    fontSize: 20,
                  },
                  grid: { stroke: "transparent" },
                  tickLabels: {
                    fill: colors.primaryColor,
                    fontSize: 13,
                    marginTop: 20,
                  },
                }}
              />
            </VictoryChart>
          )}
        </View>
        {values && (
          <View
            style={{
              backgroundColor: colors.primaryBg,
              flex: 1,
              paddingTop: 10,
            }}
          >
            <Text
              style={{
                color: "#407BFF",
                paddingHorizontal: 20,
                textAlign: "center",
                fontSize: 18,
                fontFamily: "poppinsBold",
              }}
            >
              You have created
              <Text style={{ color: colors.primaryColor }}>
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

export default GraphicalValues;
