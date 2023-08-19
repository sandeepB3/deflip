import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Dimensions,
  Image,
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import axios from "axios";
// const URL = "192.168.13.100"; // Rohan Wifi
const URL = '192.168.251.35'
// const URL = 'localhost'

const NotificationCard = ({ item }) => {
  // console.log("Notification item : ",item);
  return (
    <View style={styles.box}>
      <Text>
        <Text style={styles.heading}>Date : </Text>{" "}
        {new Date(item.createdAt).toLocaleString()}
      </Text>
      <Text style={styles.notificationData}>{item.content}</Text>
    </View>
  );
};

const NotificationScreen = () => {
  const navigation = useNavigation();
  const [notifications, setNotification] = useState([]);
  const isFocused = useIsFocused();
  useEffect(() => {
    if (isFocused) {
      axios
        .get(`http://${URL}:8000/notification/fetch/38`)
        .then((response) => {
          console.log("Notification ", response.data.notifications);
          setNotification(response.data.notifications);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [isFocused]);

  const NoNotification = () => {
    return (
      <View style={styles.innerContainer}>
        <Image
          style={styles.image}
          source={require("../assets/notification.jpg")}
        />
        <Text style={styles.noNoti}>No Notification Yet</Text>
        <Text style={styles.text}>
          Simply browse, create a wishlist or make a purchase
        </Text>
        <TouchableOpacity>
          <Text style={styles.btn} onPress={() => navigation.navigate("Home")}>
            Continue Shopping
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  const Notification = () => {
    return (
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.innerContainerNoti}>
          {notifications.map((notification) => (
            <NotificationCard key={notification.id} item={notification} />
          ))}
        </View>
      </ScrollView>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.topBar}>
        <Text
          style={{
            fontSize: 20,
            letterSpacing: 1,
            color: "white",
            fontWeight: "500",
          }}
        >
          Notifications
        </Text>
      </View>
      {notifications.length > 0 ? Notification() : NoNotification()}
    </SafeAreaView>
  );
};

export default NotificationScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
  },
  topBar: {
    backgroundColor: "rgba(60,9,108,1)",
    padding: 20,
    width: "100%",
  },
  innerContainer: {
    flex: 1,
    width: "85%",
    justifyContent: "center",
    alignItems: "center",
  },
  innerContainerNoti: {
    marginHorizontal: 20,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 10,
  },
  image: {
    height: Dimensions.get("window").height / 4,
    width: Dimensions.get("window").width / 2,
  },
  noNoti: {
    fontSize: 20,
    fontWeight: "bold",
    paddingVertical: 10,
  },
  text: {
    fontSize: 15,
    letterSpacing: 1,
  },
  btn: {
    fontSize: 13,
    fontWeight: "500",
    backgroundColor: "rgba(60,9,108,1)",
    color: "white",
    padding: 10,
  },
  box: {
    backgroundColor: "rgba(0,0,0,0.1)",
    width: "100%",
    paddingVertical: 10,
    // borderRadius:15,
    marginVertical: 10,
    paddingHorizontal: 20,
    elevation:1
  },
  heading: {
    fontWeight: "bold",
    letterSpacing: 1,
  },
  notificationData: {
    letterSpacing: 1,
  },
});
