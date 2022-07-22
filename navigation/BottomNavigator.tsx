import React, { useLayoutEffect, useRef } from "react";
import { Ionicons, Feather, FontAwesome5 } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../screens/home/HomeScreen";
import Settings from "../screens/settings/index";
import AllTasks from "../screens/tasks/AllTasks";
import Graphics from "../screens/Graphics/GraphicalValues";
import * as Animatable from "react-native-animatable";
import { TouchableRipple } from "react-native-paper";
const Tab = createBottomTabNavigator();

export const TabNavigator = () => {
  const bottomTabs = [
    {
      route: "Home2",
      component: HomeScreen,
      options: {},
    },
    {
      route: "Settings",
      component: Settings,
      options: {},
    },
    {
      route: "AllTasks",
      component: AllTasks,
      options: {},
    },
    {
      route: "Notifications",
      component: Graphics,
      options: {},
    },
  ];

  const TabButton = (props) => {
    const {
      tab,
      onPress,
      accessibilityState: { selected },
    } = props;
    const color = selected ? "#407BFF" : "black";
    const currentTabRef = useRef(null as any);

    useLayoutEffect(() => {
      if (selected && currentTabRef) {
        currentTabRef?.current.animate({ 0: { scale: 1 }, 1: { scale: 1.25 } });
      } else {
        currentTabRef?.current.animate({ 0: { scale: 1 }, 1: { scale: 1 } });
      }
    }, [selected, currentTabRef.current]);
    return (
      <TouchableRipple
        rippleColor="rgba(0, 0, 0, .1)"
        borderless={true}
        onPress={onPress}
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          height: 80,
          width: 20,
          borderRadius: 20,
        }}
      >
        <Animatable.View ref={currentTabRef} duration={500}>
          {yieldIcon(color, tab.route)}
        </Animatable.View>
      </TouchableRipple>
    );
  };

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarShowLabel: false,
        headerShown: false, //remove header on top
        tabBarStyle: {
          height: 80,
        },
      }}
    >
      {bottomTabs.map((tab) => {
        return (
          <Tab.Screen
            key={tab.route}
            component={tab.component}
            name={tab.route}
            options={{
              tabBarButton: (props) => <TabButton {...props} tab={tab} />,
              tabBarHideOnKeyboard: true,
            }}
          />
        );
      })}
    </Tab.Navigator>
  );
};

const yieldIcon = (color: string, route: string): React.ReactNode => {
  const icons = [
    {
      route: "Home2",
      icon: <Ionicons name="home-outline" size={30} color={color} />,
    },
    {
      route: "Settings",
      icon: <Feather name="settings" size={30} color={color} />,
    },
    {
      route: "AllTasks",
      icon: <FontAwesome5 name="tasks" color={color} size={30} />,
    },
    {
      route: "Notifications",
      icon: <Ionicons name="notifications-outline" color={color} size={30} />,
    },
  ];

  const icon = icons.find((ic) => ic.route === route);

  return icon?.icon;
};
