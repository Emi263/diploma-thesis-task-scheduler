import React from "react";
import { Text, View, Image } from "react-native";
import { styles } from "./styles";
import moment from "moment";
import { formatDate } from "../../helper/helpers";

interface SingleTaskProps {
  title: string;
  author: string;
  description: string;
  shouldNotify: boolean;
  date: Date;
}

const SingleTask: React.FunctionComponent<SingleTaskProps> = (props) => {
  const { title, author, description, date, shouldNotify = false } = props;

  return (
    <View style={styles.singleTask}>
      <View style={{ display: "flex", flexDirection: "row" }}>
        <Image
          source={require("../../assets/logoTest.png")}
          style={{ width: 40, height: 40 }}
        />
        <View>
          <Text>{title}</Text>
          <Text>{formatDate(date)}</Text>
        </View>
      </View>
      <View>
        <Text>{author}</Text>
        <Text>{description}</Text>
      </View>
    </View>
  );
};

export default SingleTask;
