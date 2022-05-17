import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import HomePage from "./components/HomePage";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Screens = () => {
  const Stack = createNativeStackNavigator();

  return (
    <View style={styles.container}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="home1" component={HomePage} />
        </Stack.Navigator>
      </NavigationContainer>
    </View>
  );
};

export default Screens;

const styles = StyleSheet.create({
  container: {
    paddingTop: 100,
    width: "100%",
  },
});
