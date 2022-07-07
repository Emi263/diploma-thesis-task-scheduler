import React, { useRef, useState, useEffect } from "react";
import { View, Platform, Text, Button, Alert } from "react-native";
import * as Notifications from "expo-notifications";
import * as Device from "expo-device";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParams } from "../ScreenIndex";
import { useNavigation } from "@react-navigation/native";
type introScreenProp = StackNavigationProp<RootStackParams, "Home">;

export default function Notication() {
  const [expoPushToken, setExpoPushToken] = useState("");
  const [notification, setNotification] = useState<any>(false);
  const notificationListener = useRef() as any;
  const responseListener = useRef() as any;

  const nav = useNavigation<introScreenProp>();

  useEffect(() => {
    registerForPushNotificationsAsync().then((token) =>
      setExpoPushToken(token)
    );

    Notifications.addNotificationReceivedListener((notification) => {
      const { data, body, title } = notification.request.content;

      const taskId: number = data.id as number;
      setNotification(notification);
      Alert.alert(title || "", body || "", [
        {
          text: "View task",
          onPress: () => {
            nav.navigate("SingleTask", {
              id: taskId,
            });
          },
        },
      ]);
    });

    Notifications.addNotificationResponseReceivedListener((response) => {
      Alert.alert(response.notification.request.content.body || "dsf");
    });

    return () => {
      Notifications.removeNotificationSubscription(
        notificationListener.current
      );
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  return <View></View>;
}

async function registerForPushNotificationsAsync() {
  let token;
  if (Device.isDevice) {
    const { status: existingStatus } =
      await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== "granted") {
      alert("Failed to get push token for push notification!");
      return;
    }
    token = (await Notifications.getExpoPushTokenAsync()).data;
  } else {
    alert("Must use physical device for Push Notifications");
  }

  if (Platform.OS === "android") {
    Notifications.setNotificationChannelAsync("default", {
      name: "default",
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#FF231F7C",
    });
  }

  return token;
}
