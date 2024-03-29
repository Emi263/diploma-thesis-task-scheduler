import React, { useContext } from "react";
import { Platform, StyleSheet, Text, View } from "react-native";
import { Button } from "react-native-paper";
import Collapsible from "../../common/Collapsible";
import useTheme from "../../common/hooks/useTheme";
import { AuthContext } from "../../context/AuthContext";
import { clearAuthData } from "../../utils/tokenMgmt";
import ChangePassword from "./ChangePassword";
import DisplaySettings from "./DisplaySettings";
import { AntDesign } from "@expo/vector-icons";
const Index = () => {
  const { colors } = useTheme();
  const { user, setUser } = useContext(AuthContext);

  const handleLogout = async () => {
    await clearAuthData();
    setUser(undefined);
  };
  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: colors.primaryBg,
        },
      ]}
    >
      <Button
        style={{
          backgroundColor: "#407BFF",
          borderRadius: 10,
          marginTop: Platform.OS === "ios" ? 60 : 40,
          alignSelf: "flex-end",
        }}
        mode="contained"
        onPress={() => handleLogout()}
      >
        <Text
          style={{
            color: "white",
            fontFamily: "poppinsBold",
          }}
        ></Text>
        <Text style={{ marginLeft: 10 }}>
          <AntDesign name="logout" size={16} color="white" />
        </Text>
      </Button>
      <DisplaySettings />
      {!user?.isGoogleSignIn && (
        <Collapsible headerLabel="Change Password">
          <ChangePassword />
        </Collapsible>
      )}
    </View>
  );
};

export default Index;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flex: 1,
    padding: 20,
  },
});
