import React from "react";
import { Text, View, Image } from "react-native";
import { styles } from "./styles";
import moment from "moment";
import { formatDate } from "../../helper/helpers";
import { generateRandomColor } from "../../helper/generateRandomColor";

interface SingleTaskProps {
  title: string;
  author: string;
  description: string;
  shouldNotify: boolean;
  date: Date;
}

const SingleTask: React.FunctionComponent<SingleTaskProps> = (props) => {
  const { title, author, description, date, shouldNotify = false } = props;

  const { background, color } = generateRandomColor();

  return (
    <View style={[styles.singleTask, { backgroundColor: background }]}>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          width: "100%",
          alignItems: "center",
        }}
      >
        <Image
          source={require("../../assets/logoTest.png")}
          style={{ width: 36, height: 36 }}
        />
        <Text style={{ fontSize: 12 }}>{formatDate(date)}</Text>
      </View>
      <View style={styles.textContent}>
        <Text style={{ fontSize: 14, color: color }}>{title}</Text>
        <Text style={{ fontSize: 12 }}> {description}</Text>
      </View>

      {/* <View>
        <Text>{author}</Text>
        <Text>{description}</Text>
      </View> */}
    </View>
  );
};

export default SingleTask;
