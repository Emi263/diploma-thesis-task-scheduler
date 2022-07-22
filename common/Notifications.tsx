import React, { useRef, useState, useEffect, useContext } from "react";
import { View, Platform, Text, Button, Alert } from "react-native";
import * as Notifications from "expo-notifications";
import * as Device from "expo-device";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParams } from "../ScreenIndex";
import { useNavigation } from "@react-navigation/native";
import { AuthContext } from "../context/AuthContext";
type introScreenProp = StackNavigationProp<RootStackParams, "Home">;

export default function Notication() {
  const [expoPushToken, setExpoPushToken] = useState("");
  const [notification, setNotification] = useState<any>(false);
  const { user } = useContext(AuthContext);
  const lastNotificationResponse = Notifications.useLastNotificationResponse();
  const nav = useNavigation<introScreenProp>();

  useEffect(() => {
    registerForPushNotificationsAsync().then((token) =>
      setExpoPushToken(token)
    );

    const notificationListener = Notifications.addNotificationReceivedListener(
      (notification) => {
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
      }
    );

    const responseListener =
      Notifications.addNotificationResponseReceivedListener((response) => {
        Alert.alert(response.notification.request.content.body || "");
      });

    return () => {
      Notifications.removeNotificationSubscription(notificationListener);
      Notifications.removeNotificationSubscription(responseListener);
    };
  }, []);

  React.useEffect(() => {
    if (lastNotificationResponse) {
      const { data } = lastNotificationResponse.notification.request.content;

      if (data.userId !== user?.id) {
        return;
      }
      const taskID = data.id as number;
      nav.navigate("SingleTask", {
        id: taskID,
      });
    }
  }, [lastNotificationResponse]);

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
    console.log(token);
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
