import React, { useEffect } from "react";
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
import { useIsFocused, useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
const URL = '192.168.251.35'

const ProfileScreen = () => {
  // console.log("Token setting : ",AsyncStorage.getItem("authToken"))
  const isFocused = useIsFocused();

  const navigation = useNavigation();

  const fetch = async() =>{
    const token = await AsyncStorage.getItem("authToken");
    // console.log(token);
    try {
      const { data } = await axios.get(`http://${URL}:8000/user/profile`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      console.log("Data:", data);
    } catch (err) {
      console.log("Error : ",err);
    }
  }
  useEffect(() => {

    fetch();

  }, [isFocused]);


  const deleteAsync = async (key) => {
    try {
      await AsyncStorage.removeItem(key);
      console.log("Logout Successful.");
      navigation.replace("Login");
  
    } catch (error) {
      console.error("Error deleting variable:", error);
    }
  };

  const userInfo = useSelector((state) => state.user.info);
  // console.log("userInfo : ", userInfo);

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
          <View style={styles.nameSec}>
            <Text style={styles.name}>{userInfo.name}</Text>
            <Text style={styles.phone}> +91 {userInfo.phone}</Text>
            <Text style={{ color: "white" }}>{userInfo.email}</Text>
          </View>
          <View style={styles.token}></View>
        </View>
      </View>
      <View style={styles.lowerContainer} onPress={() => {}}>
        <TouchableOpacity style={styles.box}>
          <AntDesign name="edit" size={30} color="rgb(60,9,108)" />
          <Text style={styles.txt}>Edit Profile</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.box}
          onPress={() => {
            navigation.navigate("OrderHistory");
          }}
        >
          <AntDesign name="edit" size={30} color="rgb(60,9,108)" />
          <Text style={styles.txt}>My Orders</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.box}
          onPress={() => {
            navigation.navigate("Offers");
          }}
        >
          <AntDesign name="edit" size={30} color="rgb(60,9,108)" />
          <Text style={styles.txt}>Offers</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.box} onPress={() => {navigation.navigate("UnlockedCoupons")}}>
          <AntDesign name="edit" size={30} color="rgb(60,9,108)" />
          <Text style={styles.txt}>Unlocked Coupons</Text>
        </TouchableOpacity>


        <TouchableOpacity style={styles.box} onPress={() => {}}>
          <AntDesign name="edit" size={30} color="rgb(60,9,108)" />
          <Text style={styles.txt}>Settings</Text>
        </TouchableOpacity>
        

        <TouchableOpacity
          style={styles.logout}
          onPress={() => {
            deleteAsync("authToken");
          }}
        >
          <MaterialIcons name="logout" size={30} color="white" />
          <Text style={[styles.txt, { color: "white" }]}>Logout</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: "rgba(157,78,221,0.8)",
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
    alignItems: "center",
  },
  left: {},
  right: {
    flex: 3,
    marginLeft: 20,
  },
  nameSec: {
    justifyContent: "flex-start",
  },
  name: {
    fontSize: 22,
    letterSpacing: 1,
    fontWeight: "600",
    color: "white",
  },
  phone: {
    color: "white",
    fontWeight: "400",
  },
  profileImg: {
    height: Dimensions.get("window").width / 5,
    width: Dimensions.get("window").width / 5,
    resizeMode: "contain",
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
    marginVertical: 10,
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
  txt: {
    fontWeight: "700",
    letterSpacing: 1,
    color: "rgba(0,0,0,0.6)",
  },
});

export default ProfileScreen;
