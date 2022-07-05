import { AntDesign } from "@expo/vector-icons";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useState } from "react";
import {
  Text,
  TouchableOpacity,
  View,
  Pressable,
  StyleSheet,
  Alert,
} from "react-native";

import {
  Avatar,
  Button,
  Card,
  Title,
  Paragraph,
  ActivityIndicator,
} from "react-native-paper";

import { useMutation, useQuery, useQueryClient } from "react-query";
import { deleteTask, getTask } from "../../../api/task";
import ModalComponent from "../../../common/Modal";
import { RootStackParams } from "../../../ScreenIndex";
import EditTask from "../components/EditTask";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";

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

  const nav = useNavigation<introScreenProp>();
  const { mutateAsync } = useMutation(deleteTask);

  const [openModal, setOpenModal] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const queryClient = useQueryClient();
  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleDelete = async () => {
    Alert.alert("Are you sure?", "Do you want to delete the selected task", [
      {
        text: "Yes",
        onPress: () => {
          if (task) {
            mutateAsync(task.id.toString())
              .then((res) => {
                queryClient.invalidateQueries();
              })
              .then(() => {
                Alert.alert("Task Deleted", "Task was deleted succesfully");
                nav.navigate("Home");
              });
          }
        },
      },
      {
        text: "No",
      },
    ]);
  };

  if (isLoading) {
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
    <View>
      <Card>
        <Card.Content>
          <Title>{task?.title}</Title>
          <Paragraph>
            {task?.description} Lorem ipsum dolor sit amet consectetur
            adipisicing elit. Ad, perferendis ullam? Voluptate ratione facere
            temporibus modi dolorem dicta et. Maiores beatae dolore amet
            consectetur! Non nisi vero quis cum, a blanditiis sequi. Labore,
            aut?
          </Paragraph>
        </Card.Content>
        <Card.Cover
          source={{ uri: task?.image || "https://picsum.photos/700" }}
        />
        <Card.Actions style={styles.cardActions}>
          <Button onPress={handleOpenModal}>Edit</Button>
          <Button onPress={handleDelete}>
            <Text style={{ color: "red" }}>Delete</Text>
          </Button>
        </Card.Actions>
      </Card>

      {task && (
        <ModalComponent visible={openModal}>
          <Pressable style={styles.closeBtn} onPress={handleCloseModal}>
            <AntDesign name="closecircle" size={30} color="black" />
          </Pressable>
          <EditTask task={task} setOpenModal={setOpenModal} />
        </ModalComponent>
      )}
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
