import React, { useContext } from "react";
import { StyleSheet, Text, View } from "react-native";
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
      <DisplaySettings />
      {!user?.isGoogleSignIn && (
        <Collapsible headerLabel="Change Password">
          <ChangePassword />
        </Collapsible>
      )}

      <View style={{ flex: 1 }}>
        <Button
          style={{
            marginTop: 20,
            width: "100%",
            backgroundColor: "#407BFF",
            borderRadius: 10,
            flexDirection: "row",
            justifyContent: "space-around",
          }}
          mode="contained"
          onPress={() => handleLogout()}
        >
          <Text
            style={{
              color: "white",
              fontFamily: "poppinsBold",
            }}
          >
            Logout
          </Text>
          <Text style={{ marginLeft: 10 }}>
            <AntDesign name="logout" size={16} color="white" />
          </Text>
        </Button>
      </View>
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
