import React from "react";

import { BottomNavigation, Text } from "react-native-paper";

const BottomNavigationComponent = () => {
  const MusicRoute = () => <Text>Music</Text>;

  const AlbumsRoute = () => <Text style={{ color: "white" }}>Albums</Text>;

  const RecentsRoute = () => <Text>Recents</Text>;
  const NotificationRoute = () => <Text>Notification</Text>;
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    {
      key: "music",
      title: "Favorites",
      focusedIcon: "heart",
      unfocusedIcon: "heart-outline",
    },
    { key: "albums", title: "Albums", focusedIcon: "album" },
    { key: "recents", title: "Recents", focusedIcon: "history" },
    {
      key: "notifications",
      title: "Notifications",
      focusedIcon: "bell",
      unfocusedIcon: "bell-outline",
    },
  ]);

  const renderScene = BottomNavigation.SceneMap({
    music: MusicRoute,
    albums: AlbumsRoute,
    recents: RecentsRoute,
    notifications: NotificationRoute,
  });

  return (
    <BottomNavigation
      inactiveColor="red"
      style={{ backgroundColor: "white" }}
      navigationState={{ index, routes }}
      onIndexChange={setIndex}
      renderScene={renderScene}
    />
  );
};

export default BottomNavigationComponent;
