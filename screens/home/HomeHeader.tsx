import React, { useContext, useEffect } from "react";
import { Text, View, TouchableOpacity, Image } from "react-native";
import { AuthContext } from "../../context/AuthContext";
import { headerStyles } from "./styles";
import { clearAuthData } from "../../utils/tokenMgmt";
import { Button } from "react-native-paper";

const HomeHeader = () => {
  const { user, setUser } = useContext(AuthContext);

  return (
    <View style={headerStyles.container}>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          width: "100%",
          justifyContent: "flex-end",
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
        <Text style={{ fontSize: 24 }}> {`Hello, \n ${user?.name}`}</Text>
        <Image
          source={require("../../assets/user-avatar.png")}
          style={{ width: 80, height: 80, borderRadius: 10 }}
        />
      </View>
    </View>
  );
};

export default HomeHeader;
