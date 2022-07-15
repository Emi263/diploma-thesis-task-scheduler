import React from "react";
import { Text, View } from "react-native";
import ModalComponent from "../../common/Modal";
import CreateTask from "../tasks/CreateTask";
import { Ionicons } from "@expo/vector-icons";
import { TouchableRipple } from "react-native-paper";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParams } from "../../ScreenIndex";
import { useNavigation } from "@react-navigation/native";

type introScreenProp = StackNavigationProp<RootStackParams>;

const CreateTaskComponent: React.FC = ({}) => {
  const nav = useNavigation<introScreenProp>();

  return (
    <View style={{ paddingHorizontal: 10, paddingVertical: 20 }}>
      <TouchableRipple
        rippleColor="rgba(0, 0, 0, .1)"
        borderless={true}
        style={{ borderRadius: 20 }}
        onPress={() => nav.navigate("CreateTask")}
      >
        <View style={{ backgroundColor: "rgba(237, 237, 237, 0.8)" }}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              paddingHorizontal: 20,
              paddingVertical: 20,
            }}
          >
            <View>
              <Text style={{ fontFamily: "poppinsBold" }}>Create new task</Text>
              <Text style={{ fontFamily: "poppinsLight", fontSize: 12 }}>
                You can create new task here
              </Text>
            </View>
            <Ionicons name="md-add-circle" size={49} color="#407BFF" />
          </View>
        </View>
      </TouchableRipple>
    </View>
  );
};

export default CreateTaskComponent;
