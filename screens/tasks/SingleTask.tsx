import React from "react";
import { Text, View } from "react-native";
import { styles } from "./styles";

interface SingleTaskProps {
  title: string;
  author: string;
  description: string;
  shouldNotify: boolean;
  date: string;
}

const SingleTask: React.FunctionComponent<SingleTaskProps> = (props) => {
  const { title, author, description, date, shouldNotify = false } = props;

  return (
    <View style={styles.singleTask}>
      <View>
        <Text>{title}</Text>
      </View>
      <Text>{author}</Text>
      <Text>{description}</Text>
      <Text>{date}</Text>
    </View>
  );
};

export default SingleTask;
