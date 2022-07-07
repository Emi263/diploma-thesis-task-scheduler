import React from "react";
import { Ionicons, Feather, FontAwesome5 } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../screens/home/HomeScreen";
import Settings from "../screens/settings/index";
import AllTasks from "../screens/tasks/AllTasks";
import NotificationList from "../screens/Notifications/NotificationList";
import { useQuery } from "react-query";
import { getAllTaks } from "../api/task";
import { View } from "react-native";
import { TouchableRipple } from "react-native-paper";

const Tab = createBottomTabNavigator();

export const TabNavigator = () => {
  const { data: tasks } = useQuery("allTasks", getAllTaks);

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarShowLabel: false,
        headerShown: false, //remove header on top
        tabBarStyle: {
          paddingVertical: 20,
          height: 80,
          paddingBottom: 25,
        },
        tabBarIconStyle: {
          width: 100,
          height: 80,
          paddingVertical: 2,
        },
        tabBarInactiveTintColor: "purple", //inactive tabs,
        tabBarActiveTintColor: "orange", //active color
      }}
    >
      <Tab.Screen
        name="Home2"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home-outline" color={color} size={30} />
          ),
        }}
      />
      <Tab.Screen
        name="Settings"
        component={Settings}
        options={{
          tabBarIconStyle: {
            width: 100,
            height: 80,
            paddingVertical: 2,
          },
          tabBarIcon: ({ color, size }) => (
            <Feather name="settings" color={color} size={30} />
          ),
          headerShown: true,
        }}
      />

      <Tab.Screen
        name="All tasks"
        component={AllTasks}
        options={{
          headerShown: true,
          tabBarIconStyle: {
            width: 100,
            height: 80,
            paddingVertical: 2,
          },
          tabBarIcon: ({ color, size }) => (
            <TouchableRipple
              style={{
                width: 50,
                height: 50,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <FontAwesome5 name="tasks" color={color} size={30} />
            </TouchableRipple>
          ),
        }}
      />
      <Tab.Screen
        name="Notifications"
        component={NotificationList}
        options={{
          headerShown: true,
          tabBarBadge: tasks?.length,
          tabBarIconStyle: {
            width: 1,
            height: 80,
            paddingVertical: 2,
          },
          tabBarBadgeStyle: {
            backgroundColor: "orange",
          },
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="notifications-outline" color={color} size={30} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};
