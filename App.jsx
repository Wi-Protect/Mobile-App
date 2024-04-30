import React, { useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import registerNNPushToken from "native-notify";
import { getNotificationInbox } from "native-notify";

export default function App() {
  registerNNPushToken(21063, "Ddk9268wY7cmcRKQEcY5zI");

  const [data, setData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      let notifications = await getNotificationInbox(
        21063,
        "Ddk9268wY7cmcRKQEcY5zI"
      );
      console.log("notifications: ", notifications);
      setData(notifications);
    }
    fetchData();
  }, [registerNNPushToken]);

  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      {data.map((item, index) => (
        <Text key={index}>{item.title}</Text>
      ))
      }
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
