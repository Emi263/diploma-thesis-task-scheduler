import React, { useContext } from "react";
import { StyleSheet, View } from "react-native";
import Collapsible from "../../common/Collapsible";
import useTheme from "../../common/hooks/useTheme";
import { AuthContext } from "../../context/AuthContext";
import ChangePassword from "./ChangePassword";
import DisplaySettings from "./DisplaySettings";

const Index = () => {
  const { colors } = useTheme();
  const { user } = useContext(AuthContext);
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
