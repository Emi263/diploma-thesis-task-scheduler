import React, { useEffect } from "react";
import { Text, Button } from "react-native";
import { clearAuthData } from "../../utils/tokenMgmt";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { isSessionActive } from "../../helper/helpers";
import { useRoute } from "@react-navigation/native";

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
    <>
      <Text style={{ marginTop: 400 }}>{user?.email}</Text>
      <Button
        onPress={() => {
          setUser(undefined);
          clearAuthData();
        }}
        title="Logout"
      />
    </>
  );
};

export default HomeScreen;
