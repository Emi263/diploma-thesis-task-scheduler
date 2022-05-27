import React from "react";
import { Text, View } from "react-native";
import CalendarStrip from "react-native-calendar-strip";

const Tasks = () => {
  return (
    <View>
      <CalendarStrip
        scrollable
        style={{ height: 200, paddingTop: 20, paddingBottom: 10 }}
        calendarColor={"#3343CE"}
        calendarHeaderStyle={{ color: "white" }}
        dateNumberStyle={{ color: "white" }}
        dateNameStyle={{ color: "white" }}
        iconContainer={{ flex: 0.1 }}
        onDateSelected={(e) => console.log(e)}
        datesBlacklist={[]} //use it dynamically
        markedDates={[
          {
            date: "2022-05-28",
            dots: [
              {
                color: "red",
                selectedColor: "white",
              },
            ],
          },
        ]}
      />
    </View>
  );
};

export default Tasks;
