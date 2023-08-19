import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import {
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import CouponCard from "../components/CouponCard";
import { SafeAreaView } from "react-native-safe-area-context";

import { AntDesign } from "@expo/vector-icons";
import { useSelector } from "react-redux";

const URL = "192.168.251.35";



import { useIsFocused, useNavigation } from "@react-navigation/native";
import axios from "axios";

const RedeemScreen = () => {
  const userInfo = useSelector((state) => state.user.info);
  const navigation = useNavigation();

  const [selectedOption, setSelectedOption] = useState("inStore");

  const handleOptionChange = (option) => {
    setSelectedOption(option);
  };

  const [brandcoupons, setBrandCoupons] = useState([]);
  const [coupons, setCoupons] = useState([]);

  const isFocused = useIsFocused();
  useEffect(() => {
    if (isFocused) {
      axios
        .get(`http://${URL}:8000/coupon/fetchUnlocked/${userInfo.user_id}`)
        .then((response) => {
          console.log("Response : ", response.data);
          setBrandCoupons(response.data.brandCoupons);
          setCoupons(response.data.instoreCoupons);
        });
    }
  }, [isFocused]);

  const renderContent = () => {
    const data = selectedOption == "inStore" ? coupons : brandcoupons;
  
    return (
      <ScrollView style={{ paddingVertical: 10, paddingHorizontal: 20 }}>
        <View style={styles.cardContainer}>
          {data.map((dat) => (
            <CouponCard key={dat.couponID} coupon={dat} />
          ))}
        </View>
      </ScrollView>
    );
  };

  return (
    <SafeAreaView style={styles.maincontainer}>
      <View style={styles.topbar}>
        <View style={styles.topLeft}>
          <TouchableOpacity
            style={styles.back}
            onPress={() => navigation.goBack("Home")}
          >
            <AntDesign name="arrowleft" color="black" size={25}></AntDesign>
          </TouchableOpacity>
          <Text style={styles.topName}>Redeem Tokens</Text>
        </View>
      </View>

      <View style={styles.header}>
        <TouchableOpacity
          style={[
            styles.optionButton,
            selectedOption === "inStore" && styles.selectedOption,
          ]}
          onPress={() => handleOptionChange("inStore")}
        >
          <Text
            style={[
              styles.optionText,
              selectedOption === "inStore" && styles.selectedOptionText,
            ]}
          >
            In-Store
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.optionButton,
            selectedOption === "outStore" && styles.selectedOption,
          ]}
          onPress={() => handleOptionChange("outStore")}
        >
          <Text
            style={[
              styles.optionText,
              selectedOption === "outStore" && styles.selectedOptionText,
            ]}
          >
            Brand
          </Text>
        </TouchableOpacity>
      </View>

      {renderContent()}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  maincontainer: {
    height: "100%",
    backgroundColor: "white",
  },
  topbar: {
    display: "flex",
    paddingVertical: 20,
    flexDirection: "row",
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
  },
  topLeft: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  back: {
    paddingRight: 10,
  },
  topName: {
    color: "black",
    letterSpacing: 1,
    fontWeight: "600",
    fontSize: 16,
  },
  header: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    paddingHorizontal: 10,
    paddingVertical: 10,
    backgroundColor: "rgba(157,78,221,0.1)",
  },
  optionButton: {
    paddingHorizontal: 50,
    paddingVertical: 5,
    borderRadius: 20,
    backgroundColor: "rgba(157,78,221,0.2)",
  },
  selectedOption: {
    backgroundColor: "#3C096C",
  },
  optionText: {
    fontSize: 15,
    color: "rgba(157,78,221,1)",
    fontWeight: "bold",
    textAlign: "center",
  },
  selectedOptionText: {
    color: "white",
  },
  cardContainer: {
    flex: 1,
  },
});

export default RedeemScreen;
