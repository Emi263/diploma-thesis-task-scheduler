import { AntDesign } from "@expo/vector-icons";
import React, { useState } from "react";
import { Animated, Dimensions, StyleSheet, Text, View } from "react-native";
import AwesomeAlert from "react-native-awesome-alerts";
import {
  GestureHandlerRootView,
  Swipeable,
} from "react-native-gesture-handler";
import { TouchableRipple } from "react-native-paper";
import { useMutation, useQueryClient } from "react-query";
import { deleteTask } from "../../api/task";
import { formatDate, getTime } from "../../helper/helpers";

const SCREEN_WIDTH = Dimensions.get("screen").width;

import useTheme from "../../common/hooks/useTheme";
import { Task } from "../../models/task";

interface Props {
  data: Task;
}

const SingleNotifItem: React.FC<Props> = ({ data }) => {
  const { colors } = useTheme();
  const [showAlert, setShowAlert] = useState(false);

  const queryClient = useQueryClient();
  const { mutateAsync } = useMutation(deleteTask);

  const leftSwipe = (progress, dragX) => {
    const trans = dragX.interpolate({
      inputRange: [0, 100],
      outputRange: [0, 1],
      extrapolate: "clamp",
    });

    return (
      <TouchableRipple
        onPress={() => {
          setShowAlert(true);
        }}
      >
        <View style={styles.btn}>
          <Animated.Text
            style={{
              transform: [
                {
                  scale: trans,
                },
              ],
            }}
          >
            <AntDesign name="delete" size={24} color="red" />
          </Animated.Text>
        </View>
      </TouchableRipple>
    );
  };

  return (
    <>
      <AwesomeAlert
        show={showAlert}
        showProgress={false}
        title="You are deleting a task!"
        message="Do you want to delete it?"
        closeOnTouchOutside={true}
        closeOnHardwareBackPress={false}
        showCancelButton={true}
        showConfirmButton={true}
        cancelText="No, cancel"
        confirmText="Yes, delete it"
        confirmButtonColor="#DD6B55"
        onCancelPressed={() => {
          setShowAlert(false);
        }}
        onConfirmPressed={async () => {
          mutateAsync(data.id.toString())
            .then((res) => {
              queryClient.invalidateQueries();
            })
            .then(() => setShowAlert(false))
            .catch((e) => {
              console.log(e);
            });
        }}
      />

      <GestureHandlerRootView>
        <Swipeable renderLeftActions={leftSwipe}>
          <View
            style={{
              height: 80,
              width: SCREEN_WIDTH,
              padding: 16,
              paddingHorizontal: 30,
              flexDirection: "row",
              justifyContent: "space-between",
              elevation: 1,

              shadowColor: "#52006A",
            }}
          >
            <View>
              <Text style={{ fontWeight: "700", color: colors.primaryColor }}>
                {data.title}
              </Text>
              <Text style={{ fontSize: 12, color: colors.primaryColor }}>
                {data.description}
              </Text>
            </View>

            <View>
              <Text style={{ fontWeight: "600", color: colors.primaryColor }}>
                {formatDate(data.date)}
              </Text>
              <Text style={{ fontWeight: "600", color: colors.primaryColor }}>
                {getTime(data.date)}
              </Text>
            </View>
          </View>
        </Swipeable>
      </GestureHandlerRootView>
    </>
  );
};

export default SingleNotifItem;

const styles = StyleSheet.create({
  btn: {
    width: 100,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
