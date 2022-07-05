import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Dimensions,
  Animated,
} from "react-native";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { deleteTask, getAllTaks } from "../../api/task";
import {
  Swipeable,
  GestureHandlerRootView,
} from "react-native-gesture-handler";
import "react-native-gesture-handler";
import { RectButton } from "react-native-gesture-handler";
import { TouchableRipple } from "react-native-paper";
import AwesomeAlert from "react-native-awesome-alerts";

import { AntDesign } from "@expo/vector-icons";
import { Task } from "../../models/task";

const SCREEN_WIDTH = Dimensions.get("screen").width;
const NotificationList = () => {
  const { data: tasks, isLoading, isError } = useQuery("allTaks", getAllTaks);

  const [id, setID] = useState<null | number>(null);
  return (
    <View>
      <FlatList
        data={tasks}
        renderItem={({ item }) => {
          return <ItemBox data={item} />;
        }}
        ItemSeparatorComponent={() => {
          return <View style={styles.sep}></View>;
        }}
      />
    </View>
  );
};

export default NotificationList;

interface Props {
  data: Task;
}

const ItemBox: React.FC<Props> = ({ data }) => {
  const [showAlert, setShowAlert] = useState(false);
  const [id, setId] = useState<number | null>(null);

  const queryClient = useQueryClient();
  const { mutateAsync } = useMutation(deleteTask);

  const handleDelete = async () => {
    return;
  };

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
        title="AwesomeAlert"
        message="I have a message for you!"
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
              justifyContent: "center",
              paddingHorizontal: 20,
            }}
          >
            <Text>Hello {data.title}</Text>
          </View>
        </Swipeable>
      </GestureHandlerRootView>
    </>
  );
};

const styles = StyleSheet.create({
  sep: {
    height: 1,
    backgroundColor: "black",
  },
  btn: {
    width: 100,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
