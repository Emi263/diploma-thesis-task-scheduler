import React, { useContext, useEffect } from "react";
import { Text, View, TouchableOpacity, Image } from "react-native";
import { AuthContext } from "../../context/AuthContext";
import { headerStyles } from "./styles";
import { clearAuthData } from "../../utils/tokenMgmt";
import { Avatar, Button } from "react-native-paper";
import useTheme from "../../common/hooks/useTheme";

const HomeHeader = () => {
  const { user, setUser } = useContext(AuthContext);

  const { colors } = useTheme();
  return (
    <View style={headerStyles.container}>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          width: "100%",
          justifyContent: "flex-end",
          backgroundColor: colors.primaryBg,
        }}
      >
        <View
          style={{
            width: "20%",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Button
            icon="logout"
            mode="contained"
            onPress={() => {
              setUser(undefined);
              clearAuthData();
            }}
          >
            <Text></Text>
          </Button>
        </View>
      </View>
      <View style={headerStyles.header}></View>
      <View style={headerStyles.header}>
        <Text style={{ fontSize: 24, color: colors.primaryColor }}>
          {`Hello,\n${user?.name}`}
        </Text>
        <Avatar.Text
          label={user?.name.charAt(0) || ""}
          labelStyle={{ marginTop: -10 }}
        />
      </View>
    </View>
  );
};

export default HomeHeader;
