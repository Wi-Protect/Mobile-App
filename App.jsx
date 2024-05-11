import React, { useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { FlatList, SafeAreaView, StyleSheet, Text, Switch, View, TouchableOpacity } from "react-native";
import registerNNPushToken from "native-notify";
import { getNotificationInbox, } from "native-notify";
import ActivityComponent from "./components/activityComponent/activityComponent";

export default function App() {
  registerNNPushToken(21063, "Ddk9268wY7cmcRKQEcY5zI");

  const [data, setData] = useState([]);
  const [isDayTime, setIsDayTime] = useState(false);
  const [isActivated, setIsActivated] = useState(false);
  const toggleSwitch = () => {

    setIsDayTime(previousState => !previousState);
  }

  const toggleOnOff = () => {
    setIsActivated(previousState => !previousState);
  }

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
      <View style={{ flexDirection: "row", justifyContent: "center", alignItems: 'center', width: "90%", gap: "10px" }}>
        <Text>Night Mode</Text>
        <Switch
          trackColor={{ false: "#767577", true: "#81b0ff" }}
          thumbColor={isDayTime ? "#f5dd4b" : "#f4f3f4"}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleSwitch}
          value={isDayTime}
        />
        <Text>Day Mode</Text>
      </View>

      <TouchableOpacity
        style={{
          backgroundColor: isActivated ? '#123456' : '#654321',
          alignItems: 'center',
          padding: 10,
          borderRadius: 5,
          marginTop: 20,

        }}
        onPress={toggleOnOff}
      >
        <Text style={{ color: '#ffffff' }}>{isActivated ? "Power Off" : "Power On"}</Text>
      </TouchableOpacity>


      <FlatList
        data={data}
        renderItem={({ item }) => (
          <ActivityComponent header={item.title} content={item.message} time={item.date} />
        )}
        keyExtractor={(item) => item.notification_id}
        style={{ marginTop: 20, width: "90%" }}
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
