import React, { useEffect } from "react";
import { Text, Button } from "react-native";
import { clearAuthData } from "../../utils/tokenMgmt";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { getUser } from "../../api/user";
import { isSessionActive } from "../../helper/helpers";
import { useRoute } from "@react-navigation/native";

const HomeScreen = () => {
  const { setUser, user } = useContext(AuthContext);

  const isLoggedIn = isSessionActive();

  const route = useRoute();

  useEffect(() => {
    if (!isLoggedIn) {
      clearAuthData();
      setUser(null);
    }
  }, [route.name]);

  return (
    <>
      <Text>{user?.email}</Text>
      <Button
        onPress={() => {
          setUser(null);
          clearAuthData();
        }}
        title="Logout"
      />
    </>
  );
};

export default HomeScreen;
