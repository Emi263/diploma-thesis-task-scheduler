import React, { useContext, useEffect, useState } from "react";
import { Text, View, ImageBackground } from "react-native";
import { AuthContext } from "../../context/AuthContext";
import { headerStyles } from "./styles";
import { clearAuthData } from "../../utils/tokenMgmt";
import { ActivityIndicator, Button, TouchableRipple } from "react-native-paper";
import useTheme from "../../common/hooks/useTheme";
import { Feather } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { uploadImage } from "../../helper/firebase";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { getUser, updateUser } from "../../api/user";
import { greet } from "../../helper/helpers";
import { getTodayTasks } from "../../api/task";

const HomeHeader = () => {
  const { mutateAsync } = useMutation(updateUser);
  const { user, setUser } = useContext(AuthContext);
  const [selectedImage, setSelectedImage] = useState("");
  const { colors } = useTheme();
  const queryClient = useQueryClient();
  const [loading, setLoading] = useState(false);

  const { data: userData } = useQuery("user", () => getUser(user?.id || 0), {});
  const { data: todayTasks } = useQuery("todayTask", getTodayTasks);

  let openImagePickerAsync = async () => {
    let permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("Permission to access camera roll is required!");
      return;
    }

    let pickerResult = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (pickerResult.cancelled === true) {
      return;
    }
    setSelectedImage(pickerResult.uri);
    setLoading(true);
    const url: any = await uploadImage(pickerResult.uri);
    await mutateAsync({ profileImage: url });
    await queryClient.invalidateQueries("user");
    setLoading(false);
  };

  const imageSource = userData?.profileImage
    ? {
        uri: userData.profileImage,
      }
    : require("../../assets/user-avatar.png");
  return (
    <>
      <View style={headerStyles.container}>
        {/* <View
          style={{
            display: "flex",
            flexDirection: "row",
            width: "100%",
            justifyContent: "flex-end",
            backgroundColor: colors.primaryBg,
          }}
        >
          {/* <View
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
        </View> */}
        {/* </View> */}
        <View style={headerStyles.header}>
          <View style={{ justifyContent: "center" }}>
            <Text
              style={{
                fontSize: 16,
                color: colors.primaryColor,
                fontFamily: "poppins",
              }}
            >
              {greet()}
            </Text>
            <Text
              style={{
                fontSize: 20,
                fontFamily: "poppinsBold",

                color: colors.primaryColor,
              }}
            >
              {user?.name}
            </Text>
          </View>
          {userData && (
            <TouchableRipple
              rippleColor="rgba(0, 0, 0, .1)"
              borderless={true}
              style={{
                borderRadius: 40,
              }}
              onPress={!user?.isGoogleSignIn ? openImagePickerAsync : () => {}}
            >
              <ImageBackground
                style={{
                  opacity: loading ? 0.3 : 0.8,
                  height: 80,
                  width: 80,
                  justifyContent: "center",
                  alignItems: "center",
                }}
                resizeMethod="scale"
                resizeMode="cover"
                source={imageSource}
                borderRadius={40}
              >
                {loading && (
                  <View>
                    <ActivityIndicator size="small" />
                  </View>
                )}
                {!loading && !user?.isGoogleSignIn && (
                  <Feather name="camera" size={24} color="black" />
                )}
              </ImageBackground>
            </TouchableRipple>
          )}
        </View>
      </View>
    </>
  );
};

export default HomeHeader;
