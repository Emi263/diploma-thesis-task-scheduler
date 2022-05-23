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
  const route = useRoute();

  useEffect(() => {
    let isMounted = true;
    const checkUserLoggedIn = async () => {
      const isLoggedIn = await isSessionActive();
      if (!isLoggedIn) {
        await clearAuthData();
        if (isMounted) setUser(null);
      }
    };
    checkUserLoggedIn();

    return () => {
      isMounted = false;
    };
  }, [route.name]);

  useEffect(() => {
    let isMounted = true;
    const userData = async () => {
      const currentUser = await getUser(user?.sub);
    };

    userData();
  }, []);
  return (
    <>
      <Text style={{ marginTop: 400 }}>{user?.email}</Text>
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
