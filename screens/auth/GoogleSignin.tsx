import React, { useContext, useEffect, useState } from "react";
import { Button, Text } from "react-native-paper";
import { AppState, View } from "react-native";
import * as WebBrowser from "expo-web-browser";
import * as GoogleAuth from "expo-auth-session/providers/google";
import { googleLogin } from "../../api/auth";
import { AxiosResponse } from "axios";
import { setAuthToken } from "../../utils/tokenMgmt";
import { getUserPayload } from "../../helper/helpers";
import { getUser } from "../../api/user";
import { AuthContext } from "../../context/AuthContext";
import { AntDesign } from "@expo/vector-icons";
import useTheme from "../../common/hooks/useTheme";

WebBrowser.maybeCompleteAuthSession();

export function GoogleSignIn({ setLoading }) {
  const { user, setUser } = useContext(AuthContext);

  const handleLogin = async (res: AxiosResponse) => {
    try {
      setLoading(true);
      await setAuthToken(res.data.token).then(async () => {
        const userData = await getUserPayload();
        if (userData) {
          const userDt = await getUser(userData?.sub);
          setUser(userDt);
          setLoading(false);
        }
      });
    } catch (error) {
      setLoading(false);
    }
  };
  const { colors } = useTheme();

  const [request, response, promptAsync] = GoogleAuth.useAuthRequest({
    androidClientId:
      "509830665486-ektg1r1mc7uf81qup3ligauctdulo7c9.apps.googleusercontent.com",
    iosClientId:
      "509830665486-7bm9fcubl0lq3ervfnl9sdqp0jevd0fh.apps.googleusercontent.com",
    expoClientId:
      "509830665486-ae4adp4m0vanhnggnpei5lfmgenp6cbi.apps.googleusercontent.com",
    webClientId:
      "509830665486-gb3d6de2nikri88ufu9usgq2qtki8mmh.apps.googleusercontent.com",
  });

  React.useEffect(() => {
    if (response?.type === "success") {
      setLoading(true);
      const { authentication } = response;
      if (authentication?.accessToken) {
        googleLogin(authentication.accessToken)
          .then(async (res) => handleLogin(res))
          .catch((e) => {
            console.log(e);
          });
      }
    }
  }, [response, request]);

  return (
    <View
      style={{ padding: 10, justifyContent: "center", alignItems: "center" }}
    >
      <Text style={{ color: colors.primaryColor }}>Or</Text>
      <Text style={{ color: colors.primaryColor, fontWeight: "700" }}>
        Sign in with
      </Text>
      <Button
        disabled={!request}
        onPress={() => {
          promptAsync();
        }}
        style={{ flexDirection: "row", alignItems: "center" }}
      >
        <AntDesign name="google" size={20} color="black" />
      </Button>
    </View>
  );
}
