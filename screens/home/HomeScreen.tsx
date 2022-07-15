import React, { useEffect, useState } from "react";
import { StatusBar, Text, View } from "react-native";
import { clearAuthData } from "../../utils/tokenMgmt";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { isSessionActive } from "../../helper/helpers";
import { useRoute } from "@react-navigation/native";
import HomeHeader from "./HomeHeader";
import { homeStyles } from "./styles";
import TopTasks from "../tasks/MainTasks";
import CreateTask from "../tasks/CreateTask";
import ModalComponent from "../../common/Modal";
import { AntDesign } from "@expo/vector-icons";
import { TouchableRipple } from "react-native-paper";
import useTheme from "../../common/hooks/useTheme";

import ChangePassword from "../settings/ChangePassword";
import Notication from "../../common/Notifications";
import CreateTaskComponent from "./CreateTask";

const HomeScreen = () => {
  const { colors } = useTheme();

  const { setUserToken, user } = useContext(AuthContext);
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
  }, []);

  return (
    <>
      <Notication />
      <StatusBar backgroundColor={"#fff"} barStyle="dark-content" />
      <View
        style={[
          homeStyles.container,
          { backgroundColor: colors.primaryBg, paddingTop: 10 },
        ]}
      >
        <HomeHeader />
        <CreateTaskComponent />
        <TopTasks />

        <ModalComponent visible={user?.shouldChangePassword || false}>
          <View style={{ padding: 30 }}>
            <Text
              style={{
                paddingVertical: 30,
                fontWeight: "600",
                textTransform: "uppercase",
                textAlign: "center",
                marginBottom: 40,
              }}
            >
              Please, change your password
            </Text>
            <ChangePassword />
          </View>
        </ModalComponent>
      </View>
    </>
  );
};

export default HomeScreen;
