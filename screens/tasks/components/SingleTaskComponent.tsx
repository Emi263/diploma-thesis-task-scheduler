import React from "react";
import { Text, View, Image, TouchableOpacity, Platform } from "react-native";
import { styles } from "../styles";
import { formatDate, getTime } from "../../../helper/helpers";
import { generateRandomColor } from "../../../helper/generateRandomColor";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParams } from "../../../ScreenIndex";
import { TouchableRipple } from "react-native-paper";

interface SingleTaskProps {
  title: string;
  id: number;
  description: string;
  shouldNotify: boolean;
  date: Date;
  image: string;
}

const SingleTask: React.FunctionComponent<SingleTaskProps> = (props) => {
  const { title, description, date, shouldNotify = false, id, image } = props;

  type introScreenProp = StackNavigationProp<RootStackParams>;
  const { background, color } = generateRandomColor();
  const nav = useNavigation<introScreenProp>();
  return (
    <View style={{ paddingHorizontal: 10 }}>
      <TouchableRipple
        rippleColor="rgba(0, 0, 0, .1)"
        style={{ borderRadius: 10, marginTop: 20 }}
        borderless={true}
        onPress={() => {
          nav.navigate("SingleTask", {
            id: id,
          });
        }}
      >
        <View
          style={[
            styles.singleTask,
            { backgroundColor: background, borderLeftColor: color },
          ]}
        >
          <>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <View style={styles.header}>
                <View style={styles.textContent}>
                  <Text
                    style={{
                      fontSize: 18,
                      color: color,
                      fontFamily: "poppinsBold",
                    }}
                  >
                    {title}
                  </Text>
                  <Text
                    style={{
                      fontSize: 14,
                      fontFamily: "poppins",
                      marginTop: Platform.OS === "ios" ? 0 : -10,
                    }}
                  >
                    {description}
                  </Text>
                </View>
                <View>
                  <Text
                    style={{
                      fontSize: 13,
                      fontFamily: "poppins",
                      color: "#5e5e5e",
                    }}
                  >
                    {formatDate(date)}
                  </Text>
                  <Text
                    style={{
                      fontSize: 12,
                      fontFamily: "poppinsBold",
                      paddingVertical: 5,
                    }}
                  >
                    {getTime(date)}
                  </Text>
                </View>
              </View>

              <Image
                source={{ uri: image }}
                style={{ width: 80, height: 80, borderRadius: 40 }}
              />
            </View>
          </>
        </View>
      </TouchableRipple>
    </View>
  );
};

export default SingleTask;
