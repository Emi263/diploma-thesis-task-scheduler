import { AntDesign, Feather } from "@expo/vector-icons";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useState } from "react";
import {
  Text,
  View,
  Pressable,
  StyleSheet,
  Alert,
  Image,
  Dimensions,
  ImageBackground,
} from "react-native";
import {
  Button,
  Card,
  Title,
  Paragraph,
  ActivityIndicator,
  TouchableRipple,
} from "react-native-paper";

import { useMutation, useQuery, useQueryClient } from "react-query";
import { deleteTask, getTask } from "../../../api/task";
import ModalComponent from "../../../common/Modal";
import { RootStackParams } from "../../../ScreenIndex";
import EditTask from "../components/EditTask";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import useTheme from "../../../common/hooks/useTheme";
import ImageBlurLoading from "react-native-image-blur-loading";
import { Ionicons } from "@expo/vector-icons";
import { formatDateAndTime } from "../../../helper/helpers";

type Props = NativeStackScreenProps<RootStackParams, "SingleTask">;
type introScreenProp = StackNavigationProp<RootStackParams, "Home">;

const SingleTaskScreen: React.FC<Props> = ({
  route: {
    params: { id },
  },
}) => {
  const {
    data: task,
    isLoading,
    isError,
  } = useQuery(["singleTask", id], () => getTask(id), {
    enabled: !!id,
  });

  const { colors } = useTheme();

  const nav = useNavigation<introScreenProp>();
  const { mutateAsync, isLoading: load } = useMutation(deleteTask);

  const [openModal, setOpenModal] = useState(false);

  const queryClient = useQueryClient();
  const handleOpenModal = () => {
    if (task) {
      nav.navigate("EditTask", {
        task: task,
      });
    }
  };

  const handleDelete = async () => {
    Alert.alert("Are you sure?", "Do you want to delete the selected task", [
      {
        text: "Yes",
        onPress: () => {
          if (task) {
            mutateAsync(task.id.toString())
              .then(async (res) => {
                await queryClient.invalidateQueries();
              })
              .then(() => {
                nav.navigate("Home");
                Alert.alert("Task Deleted", "Task was deleted succesfully");
              });
          }
        },
      },
      {
        text: "No",
      },
    ]);
  };

  if (isLoading || !task) {
    return (
      <View
        style={{
          flex: 1,

          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <View style={{ backgroundColor: "white", padding: 20, flex: 1 }}>
      <TouchableRipple
        style={{
          alignSelf: "flex-start",
          padding: 2,
          paddingLeft: 0,
        }}
        borderless={true}
      >
        <Feather
          onPress={() => nav.goBack()}
          name="chevron-left"
          size={32}
          color="black"
        />
      </TouchableRipple>

      <View style={{ paddingVertical: 20 }}>
        <Text
          style={{
            fontFamily: "poppinsBold",
            fontSize: 18,
            textAlign: "center",
          }}
        >
          {task?.title || ""}
        </Text>
        <Text
          style={{
            fontFamily: "poppins",
            fontSize: 16,
          }}
        >
          {task?.description || ""}
        </Text>
      </View>
      <View style={{ justifyContent: "center", alignItems: "center" }}>
        <Image
          style={{ height: 200, width: Dimensions.get("screen").width - 20 }}
          source={{ uri: task?.image || "" }}
        />
      </View>
      <View
        style={{
          paddingTop: 20,
          alignItems: "center",
          flexDirection: "row",
        }}
      >
        <Ionicons name="notifications" size={30} color="black" />
        <Text style={{ fontFamily: "poppins" }}>
          {" " + formatDateAndTime(task?.date.toString())}
        </Text>
      </View>

      <Button
        style={{
          marginTop: 20,
          width: "100%",
          backgroundColor: "#407BFF",
          borderRadius: 10,
        }}
        mode="contained"
        onPress={() => handleOpenModal()}
        loading={isLoading}
      >
        <Text style={{ color: "white", fontFamily: "poppinsBold" }}>Edit</Text>
      </Button>
      <Button
        style={{
          marginTop: 20,
          width: "100%",
          backgroundColor: "red",
          borderRadius: 10,
        }}
        mode="contained"
        onPress={() => handleDelete()}
        loading={load}
      >
        <Text style={{ color: "white", fontFamily: "poppinsBold" }}>
          Delete
        </Text>
      </Button>
    </View>
  );
};

export default SingleTaskScreen;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
  },
  closeBtn: {
    alignSelf: "flex-end",
    paddingHorizontal: 10,
    marginTop: 20,
    marginRight: 10,
  },
  cardActions: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
});
