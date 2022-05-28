import React, { useContext, useEffect } from "react";
import { Text, View, Button, TouchableOpacity } from "react-native";
import { getUser } from "../../api/user";
import { AuthContext } from "../../context/AuthContext";
import { headerStyles } from "./styles";
import { clearAuthData } from "../../utils/tokenMgmt";

const HomeHeader = () => {
  const { user, setUser } = useContext(AuthContext);

  return (
    <View style={headerStyles.container}>
      <View style={headerStyles.header}>
        <View>
          <Text>Welcome {user?.name}!</Text>
          <Text>Have a look at your tasks!</Text>
        </View>
        <TouchableOpacity
          style={headerStyles.button}
          onPress={() => {
            setUser(undefined);
            clearAuthData();
          }}
        >
          <Text>Logout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default HomeHeader;
