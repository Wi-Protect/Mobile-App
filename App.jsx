import React, { useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { FlatList, SafeAreaView, StyleSheet, Text, Switch, View, TouchableOpacity, Modal, Button } from "react-native";
import registerNNPushToken from "native-notify";
import { getNotificationInbox, } from "native-notify";
import ActivityComponent from "./components/activityComponent/activityComponent";
import { turnDayModeOn, turnNightModeOn, systemTurnOff, systemTurnOn, caliberate } from "./services";

export default function App() {
  registerNNPushToken(21063, "Ddk9268wY7cmcRKQEcY5zI");

  const [data, setData] = useState([]);
  const [isDayTime, setIsDayTime] = useState(false);
  const [isActivated, setIsActivated] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [countdown, setCountdown] = useState(10); // 10 seconds countdown
  const [isCaliberating, setIsCaliberating] = useState(false);
  const [caliberateCountdown, setCaliberateCountdown] = useState(5); // 5 minutes countdown

  const caliberateButtonClicked = () => {
    // console.log("Caliberating");
    setShowPopup(true);
    setCountdown(10);
  }

  const doCaliberation = async () => {
    console.log("do calibration function called");
    setIsCaliberating(true);
    setCaliberateCountdown(5);
    await caliberate();
  }

  useEffect(() => {
    console.log("isCalibrating: ", isCaliberating);
    let caliberateInterval = null;
    if (isCaliberating && caliberateCountdown > 0) {
      caliberateInterval = setInterval(() => {
        setCaliberateCountdown(prevCountdown => prevCountdown - 1);
      }, 1000 * 60);
    } else if (caliberateCountdown === 0) {
      setIsCaliberating(false);
    }
    return () => clearInterval(caliberateInterval);
  }, [isCaliberating, caliberateCountdown]);



  useEffect(() => {
    let countdownInterval = null;
    if (showPopup && countdown > 0) {
      countdownInterval = setInterval(() => {
        setCountdown(prevCountdown => prevCountdown - 1);
      }, 1000);
    } else if (countdown === 0) {
      setShowPopup(false);
      doCaliberation();
    }
    return () => clearInterval(countdownInterval);
  }, [showPopup, countdown]);





  const toggleSwitch = () => {

    if (isDayTime) {
      // turn night mode on
      turnNightModeOn();
      console.log("Night Mode On");
    }
    else {
      // turn day mode on
      turnDayModeOn();
      console.log("Day Mode On");
    }

    setIsDayTime(previousState => !previousState);
  }

  const toggleOnOff = () => {
    if (isActivated) {
      // turn system off
      systemTurnOff();
      console.log("System Off");
    }
    else {
      // turn system on
      systemTurnOn();
      console.log("System On");
    }
    setIsActivated(previousState => !previousState);
  }

  useEffect(() => {
    async function fetchData() {
      let notifications = await getNotificationInbox(
        21063,
        "Ddk9268wY7cmcRKQEcY5zI"
      );
      // console.log("notifications: ", notifications);
      setData(notifications);
    }
    fetchData();
  });

  return (
    <SafeAreaView style={styles.container}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={showPopup}

      >
        <View style={styles.overlay} />
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Calibrating in {countdown} seconds</Text>
            <Button title="Close" onPress={() => setShowPopup(false)} />
          </View>
        </View>
      </Modal>

      <Modal

        animationType="slide"
        transparent={true}
        visible={isCaliberating}
      >
        <View style={styles.overlay} />
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Calibration will finish in {caliberateCountdown} minutes </Text>
          </View>
        </View>
      </Modal>

      <Text style={styles.header}>Wi-Protect</Text>
      <View style={{ flexDirection: "row", justifyContent: "center", alignItems: 'center', width: "90%", gap: 10 }}>
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

      <TouchableOpacity
        style={{
          backgroundColor: '#129022',
          alignItems: 'center',
          padding: 10,
          borderRadius: 5,
          marginTop: 20,

        }}
        onPress={caliberateButtonClicked}
      >
        <Text style={{ color: '#ffffff' }}>Calibrate</Text>
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
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  },
  overlay: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },

});
