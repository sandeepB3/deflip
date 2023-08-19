import React, { useState } from "react";
import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { AntDesign } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const OrderCard = ({ item }) => {
  console.log("Order in OrdrCard : ", item);

  const orderDate = new Date(item.orderDate);
  const formattedDate = orderDate.toDateString();
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      style={styles.mainContainer}
      onPress={() => {
        navigation.navigate("OrderDetails", { orderId: item.orderID });
      }}
    >
      <View style={styles.left}>
        <View style={styles.dateSection}>
          <Text style={styles.headings}>Delivered on :</Text>
          <View>
            <Text style={styles.date}>{formattedDate}</Text>
          </View>
          <View style={{ marginLeft: 5 }}>
            <Entypo name="check" size={20} color="green" />
          </View>
        </View>
        <Text style={styles.headings}>
          OrderID : <Text style={styles.orderid}>{item.orderID}</Text>
        </Text>
      </View>
      <View style={styles.right}>
        <AntDesign name="right" size={30} color="black" />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    display: "flex",
    flexDirection: "row",
    // backgroundColor: "rgba(0,0,0,0.07)",
    backgroundColor: "rgba(60,9,108,0.1)",

    justifyContent: "space-between",
    padding: 15,
    marginHorizontal: 20,
    marginVertical: 10,
    borderRadius: 15,
  },
  dateSection: {
    textAlignVertical: "center",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  date: {
    paddingVertical: 4,
    // backgroundColor: "rgba(0,0,0,0.1)",
    backgroundColor: "rgba(60,9,108,0.3)",

    borderRadius: 15,
    fontSize: 10,
    paddingHorizontal: 10,
  },
  orderid: {
    color: "black",
  },
  headings: {
    fontWeight: "bold",
    color: "rgba(0,0,0,0.7)",
    paddingRight: 10,
    fontSize: 15,
  },
  right: {
    justifyContent: "center",
  },
});

export default OrderCard;
