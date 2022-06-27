import React, { useEffect, useState } from "react";
import { Text, Button, View, TouchableOpacity, Image } from "react-native";
import { clearAuthData } from "../../utils/tokenMgmt";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { isSessionActive } from "../../helper/helpers";
import { useNavigation, useRoute } from "@react-navigation/native";
import HomeHeader from "./HomeHeader";
import { homeStyles } from "./styles";
import AllTasks from "../tasks/MainTasks";
import CreateTask from "../tasks/CreateTask";
import ModalComponent from "../../common/Modal";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParams } from "../../ScreenIndex";

import { AntDesign } from "@expo/vector-icons";

const HomeScreen = () => {
  type introScreenProp = StackNavigationProp<RootStackParams>;

  const { setUserToken, userToken } = useContext(AuthContext);
  const route = useRoute();

  //local state
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    let isMounted = true;

    const checkUserLoggedIn = async () => {
      const isLoggedIn = await isSessionActive();

      if (!isLoggedIn) {
        await clearAuthData();
        if (isMounted) setUserToken(undefined);
      }
    };
    checkUserLoggedIn();
    //cleanup
    return () => {
      isMounted = false;
    };
  }, [route.name]);

  const nav = useNavigation<introScreenProp>();

  return (
    <View style={homeStyles.container}>
      <HomeHeader />
      <AllTasks />
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
              backgroundColor: "white",
              fontWeight: "600",
              textAlign: "right",
              paddingHorizontal: 40,
            }}
          >
            View all Tasks
          </Text>
        </TouchableOpacity>
      </View>
      <View
        style={{
          width: "100%",
          paddingVertical: 20,
          display: "flex",
          alignItems: "center",
        }}
      >
        <AntDesign
          onPress={() => {
            setShowModal(true);
          }}
          name="pluscircleo"
          size={40}
          color="purple"
        />
        <Text>Create a new task</Text>
      </View>
      {/* <TouchableOpacity
        onPress={(e) => {
          setShowModal(true);
        }}
      >
        <Text>Open Modal</Text>
      </TouchableOpacity> */}
      <ModalComponent visible={showModal} animationType="fade">
        <CreateTask setShowModal={setShowModal} />
      </ModalComponent>
    </View>
  );
};

export default HomeScreen;
