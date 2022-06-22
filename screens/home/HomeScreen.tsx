import React, { useEffect, useState } from "react";
import { Text, Button, View, TouchableOpacity } from "react-native";
import { clearAuthData } from "../../utils/tokenMgmt";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { isSessionActive } from "../../helper/helpers";
import { useRoute } from "@react-navigation/native";
import EventCalendar from "react-native-events-calendar";
import { Calendar, CalendarList, Agenda } from "react-native-calendars";
import { AgendaProps } from "react-native-calendars";
import Tasks from "../tasks/Tasks";
import HomeHeader from "./HomeHeader";
import { homeStyles } from "./styles";
import { getUser } from "../../api/user";
import AllTasks from "../tasks/AllTasks";
import CreateTask from "../tasks/CreateTask";
import ModalComponent from "../../common/Modal";
import BottomNavigation from "./BottomNavigation";

const HomeScreen = () => {
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

  return (
    <View style={homeStyles.container}>
      <HomeHeader />
      <AllTasks />
      <TouchableOpacity activeOpacity={0.7}>
        <Text
          style={{
            fontWeight: "600",
            textAlign: "right",
            paddingHorizontal: 26,
          }}
        >
          View all Tasks
        </Text>
      </TouchableOpacity>

      {/* <TouchableOpacity
        onPress={(e) => {
          setShowModal(true);
        }}
      >
        <Text>Open Modal</Text>
      </TouchableOpacity> */}
      <BottomNavigation />
      <ModalComponent visible={showModal} animationType="slide">
        <CreateTask setShowModal={setShowModal} />
      </ModalComponent>
    </View>
  );
};

export default HomeScreen;
