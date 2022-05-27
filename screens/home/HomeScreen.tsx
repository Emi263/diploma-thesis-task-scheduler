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
const HomeScreen = () => {
  const { setUser, user } = useContext(AuthContext);
  const route = useRoute();

  useEffect(() => {
    let isMounted = true;

    const checkUserLoggedIn = async () => {
      const isLoggedIn = await isSessionActive();
      if (!isLoggedIn) {
        await clearAuthData();
        if (isMounted) setUser(undefined);
      }
    };

    checkUserLoggedIn();

    //cleanup
    return () => {
      isMounted = false;
    };
  }, [route.name]);

  return (
    <View style={{ flex: 1 }}>
      <Text style={{ marginTop: 400 }}>{user?.email}</Text>
      <Button
        onPress={() => {
          setUser(undefined);
          clearAuthData();
        }}
        title="Logout"
      />
      <Tasks />
    </View>
  );
};

export default HomeScreen;
