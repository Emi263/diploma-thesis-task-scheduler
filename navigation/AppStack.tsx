import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { RootStackParams } from "../ScreenIndex";
import { TabNavigator } from "./BottomNavigator";
import SingleTaskScreen from "../screens/tasks/screens/SingleTaskScreen";
import AllTasks from "../screens/tasks/AllTasks";

const AppStack = () => {
  const RootStack = createNativeStackNavigator<RootStackParams>();

  return (
    <RootStack.Group>
      <RootStack.Screen name="Home" component={TabNavigator} />
      <RootStack.Screen
        name="SingleTask"
        component={SingleTaskScreen}
        options={{
          headerShown: true,
        }}
      />
      <RootStack.Screen
        name="Tasks"
        component={AllTasks}
        options={{
          headerShown: true,
        }}
      />
    </RootStack.Group>
  );
};

export default AppStack;
