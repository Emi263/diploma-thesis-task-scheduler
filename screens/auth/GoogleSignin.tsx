import React, { useContext, useEffect, useState } from "react";
import { Button } from "react-native-paper";
import * as WebBrowser from "expo-web-browser";
import * as GoogleAuth from "expo-auth-session/providers/google";
import { googleLogin } from "../../api/auth";
import { useMutation } from "react-query";
import { AxiosResponse } from "axios";
import { setAuthToken } from "../../utils/tokenMgmt";
import { getUserPayload } from "../../helper/helpers";
import { getUser } from "../../api/user";
import { AuthContext } from "../../context/AuthContext";

WebBrowser.maybeCompleteAuthSession();

export function GoogleSignIn({ setLoading }) {
  const { user, setUser } = useContext(AuthContext);
  const handleLogin = async (res: AxiosResponse) => {
    try {
      setLoading(true);
      await setAuthToken(res.data.token).then(async () => {
        const userData = await getUserPayload();
        const userDt = await getUser(userData?.sub || 1);
        console.log(userDt);

        setUser(userDt);
        setLoading(false);
      });
    } catch (error) {
      setLoading(false);
    }
  };

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
  }, [response]);

  return (
    <>
      <Button
        disabled={!request}
        onPress={() => {
          promptAsync();
        }}
      >
        Login
      </Button>
    </>
  );
}
