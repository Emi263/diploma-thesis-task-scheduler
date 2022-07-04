import React, { useEffect, useState } from "react";
import {
  Text,
  Button,
  View,
  TouchableOpacity,
  Image,
  Pressable,
} from "react-native";
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
import Notifications from "../../common/Notifications";

import { AntDesign } from "@expo/vector-icons";
import { ThemeContext } from "../../context/ThemeContext";
import { TouchableRipple } from "react-native-paper";
import useTheme from "../../common/hooks/useTheme";

const HomeScreen = () => {
  const { colors } = useTheme();

  type introScreenProp = StackNavigationProp<RootStackParams>;

  const { setUserToken, userToken } = useContext(AuthContext);
  const { theme } = useContext(ThemeContext);
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

  return (
    <View style={[homeStyles.container, { backgroundColor: colors.primaryBg }]}>
      <HomeHeader />
      <AllTasks />
      <View
        style={{
          width: "100%",
          paddingVertical: 20,
          display: "flex",
          alignItems: "center",
        }}
      >
        <TouchableRipple
          style={{
            justifyContent: "center",
            alignItems: "center",
            paddingVertical: 10,
            paddingHorizontal: 20,
            borderRadius: 15,
          }}
          onPress={() => {
            setShowModal(true);
          }}
        >
          <>
            <AntDesign
              name="pluscircleo"
              size={40}
              color={colors.primaryColor}
            />
            <Text style={{ color: colors.primaryColor }}>
              Create a new task
            </Text>
          </>
        </TouchableRipple>
      </View>

      <ModalComponent visible={showModal} animationType="slide">
        <CreateTask setShowModal={setShowModal} />
      </ModalComponent>
    </View>
  );
};

export default HomeScreen;
