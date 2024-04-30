import React, { useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { FlatList, SafeAreaView, StyleSheet, Text } from "react-native";
import registerNNPushToken from "native-notify";
import { getNotificationInbox, } from "native-notify";
import ActivityComponent from "./components/activityComponent/activityComponent";

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
  });

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>Wi-Protect</Text>
      <FlatList
        data={data}
        renderItem={({ item }) => (
          <ActivityComponent header={item.title} content={item.message} time={item.date} />
        )}
        keyExtractor={(item) => item.notification_id}
      />
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  header: {
    fontSize: 24,
    paddingVertical: 20,
  },
});
