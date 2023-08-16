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

const RedeemScreen = () => {
  const [selectedOption, setSelectedOption] = useState("inStore");

  const handleOptionChange = (option) => {
    setSelectedOption(option);
  };

  const [coupons, setCoupons] = useState([]);

  useEffect(() => {
    //fetch the data from backend and store it in coupons
    const fakeApiData = [
      {
        id: 1,
        offer: "10% Off",
        limit: "Minimum shopping of 2500",
        brandImage:
          "https://media.licdn.com/dms/image/C560BAQF6H8gAs-JyFg/company-logo_200_200/0/1627543110554?e=2147483647&v=beta&t=8-XBSF4YBb0Jxbok0ztoN4N_l8VArFvim4q9HBIAxBM",
        coupon: "ABC",
      },
      {
        id: 2,
        offer: "₹500 Off",
        limit: "Description for Coupon 2",
        brandImage:
          "https://media.licdn.com/dms/image/C560BAQF6H8gAs-JyFg/company-logo_200_200/0/1627543110554?e=2147483647&v=beta&t=8-XBSF4YBb0Jxbok0ztoN4N_l8VArFvim4q9HBIAxBM",
        coupon: "ABC",
      },
      {
        id: 3,
        offer: "Coupon 3",
        limit: "Description for Coupon 3",
        brandImage:
          "https://media.licdn.com/dms/image/C560BAQF6H8gAs-JyFg/company-logo_200_200/0/1627543110554?e=2147483647&v=beta&t=8-XBSF4YBb0Jxbok0ztoN4N_l8VArFvim4q9HBIAxBM",
        coupon: "ABC",
      },
      {
        id: 4,
        offer: "Coupon 4",
        limit: "Description for Coupon 3",
        brandImage:
          "https://media.licdn.com/dms/image/C560BAQF6H8gAs-JyFg/company-logo_200_200/0/1627543110554?e=2147483647&v=beta&t=8-XBSF4YBb0Jxbok0ztoN4N_l8VArFvim4q9HBIAxBM",
        coupon: "ABC",
      },
      {
        id: 5,
        offer: "Coupon 5",
        limit: "Description for Coupon 3",
        brandImage:
          "https://media.licdn.com/dms/image/C560BAQF6H8gAs-JyFg/company-logo_200_200/0/1627543110554?e=2147483647&v=beta&t=8-XBSF4YBb0Jxbok0ztoN4N_l8VArFvim4q9HBIAxBM",
        coupon: "ABC",
      },
      {
        id: 6,
        offer: "Coupon 6",
        limit: "Description for Coupon 3",
        brandImage:
          "https://media.licdn.com/dms/image/C560BAQF6H8gAs-JyFg/company-logo_200_200/0/1627543110554?e=2147483647&v=beta&t=8-XBSF4YBb0Jxbok0ztoN4N_l8VArFvim4q9HBIAxBM",
        coupon: "ABC",
      },
    ];

    setCoupons(fakeApiData);
  }, []);

  const renderContent = () => {
    // if (selectedOption === 'inStore') {
    //   return (
    //     <View >
    //       <Text>In-Store Coupons Content</Text>
    //     </View>
    //   );
    // } else if (selectedOption === 'outStore') {
    //   return (
    //     <ScrollView style={{paddingVertical: 10, paddingHorizontal:20}} >
    //       <View style={styles.cardContainer}>
    //         {coupons.map((coupon) => (
    //           <CouponCard
    //             key={coupon.id}
    //             offer={coupon.offer}
    //             limit={coupon.limit}
    //             brandImage={coupon.brandImage}
    //             coupon={coupon.coupon}
    //           />
    //         ))}
    //       </View>
    //     </ScrollView>
    //   );
    // }.
    return (
      <ScrollView style={{ paddingVertical: 10, paddingHorizontal: 20 }}>
        <View style={styles.cardContainer}>
          {coupons.map((coupon) => (
            <CouponCard
              key={coupon.id}
              offer={coupon.offer}
              limit={coupon.limit}
              brandImage={coupon.brandImage}
              coupon={coupon.coupon}
            />
          ))}
        </View>
      </ScrollView>
    );
  };

  return (
    <View style={styles.maincontainer}>
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
    </View>
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
