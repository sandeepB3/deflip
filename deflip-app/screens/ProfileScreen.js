import React from "react";
import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { AntDesign } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";

import { useSelector } from "react-redux";



const ProfileScreen = () => {

  const userInfo = useSelector((state) => state.user.info);
  console.log("userInfo : ", userInfo);

  return (
    <SafeAreaView style={styles.mainContainer}>
      <View style={styles.upperContainer}>
        <View style={styles.left}>
          <View style={styles.innerLeft}>
            <Image
              style={styles.profileImg}
              source={require("../assets/profile.png")}
            />
          </View>
        </View>
        <View style={styles.right}>
          <View style={styles.name}>
            <Text> Rohan Rane</Text>
            <Text> +91 8424008838</Text>
          </View>
          <View style={styles.token}></View>
        </View>
      </View>
      <View style={styles.lowerContainer}>
        <View style={styles.box}>
          <AntDesign name="edit" size={30} color="rgb(60,9,108)" />
          <Text style={styles.txt}>Edit Profile</Text>
        </View>
        <View style={styles.box}>
          <AntDesign name="edit" size={30} color="rgb(60,9,108)" />
          <Text style={styles.txt}>My Orders</Text>
        </View>
        <View style={styles.box}>
          <AntDesign name="edit" size={30} color="rgb(60,9,108)"/>
          <Text style={styles.txt}>Offers</Text>
        </View>
        <View style={styles.box}>
          <AntDesign name="edit" size={30} color="rgb(60,9,108)" />
          <Text style={styles.txt}>Settings</Text>
        </View>

        <TouchableOpacity style={styles.logout}>
          <MaterialIcons name="logout" size={30} color="white" />
          <Text style={[styles.txt,{color:'white'}]}>Logout</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: "rgba(60,9,108,0.6)",
  },
  upperContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    display: "flex",
    flexDirection: "row",
    paddingHorizontal: 50,
  },
  innerLeft: {
    height: Dimensions.get("window").width / 5 + 25,
    width: Dimensions.get("window").width / 5 + 25,
    borderRadius: 50,
    backgroundColor: "rgba(60,9,108,0.5)",
    justifyContent: "center",
    alignItems: "center", // Add this to center the image
  },
  left: {},
  right: {
    flex: 3,
    backgroundColor: "blue",
  },
  name: {
    justifyContent: "flex-start",
  },
  profileImg: {
    height: Dimensions.get("window").width / 5,
    width: Dimensions.get("window").width / 5,
    resizeMode: "contain",
    // Circular border
  },
  lowerContainer: {
    display: "flex",
    height: (Dimensions.get("window").height * 2) / 3,
    borderTopRightRadius: 25,
    borderTopLeftRadius: 25,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 30,
    paddingVertical: 40,
  },
  box: {
    display: "flex",
    flexDirection: "row",
    gap: 20,
    alignItems: "center",
    justifyContent: "flex-start",
    backgroundColor: "lightgray",
    width: "100%",
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 15,
    marginVertical: 25,
  },
  logout: {
    display: "flex",
    flexDirection: "row",
    gap: 20,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(60,9,108,1)",
    width: "100%",
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 15,
    marginVertical: 25,
  },
  txt:{
    fontWeight:'700',
    letterSpacing:1,
    color:'rgba(0,0,0,0.6)'
  }
});

export default ProfileScreen;
