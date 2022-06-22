import React, { useContext, useEffect } from "react";
import { Text, View, TouchableOpacity } from "react-native";
import { getUser } from "../../api/user";
import { AuthContext } from "../../context/AuthContext";
import { headerStyles } from "./styles";
import { clearAuthData } from "../../utils/tokenMgmt";
import { Surface, Button } from "react-native-paper";

const HomeHeader = () => {
  const { user, setUser } = useContext(AuthContext);

  return (
    <View style={headerStyles.container}>
      <View style={headerStyles.header}>
        <Button
          icon="logout"
          mode="contained"
          style={headerStyles.button}
          onPress={() => {
            setUser(undefined);
            clearAuthData();
          }}
        >
          <Text style={headerStyles.logout}>Logout</Text>
        </Button>
      </View>

      <View>
        <Text style={{ fontSize: 30 }}> {`Hello, \n ${user?.name}`}</Text>
      </View>
    </View>
  );
};

export default HomeHeader;
