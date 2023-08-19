import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  SafeAreaView,
  View,
  ScrollView,
  Image,
} from "react-native";
import { useIsFocused } from "@react-navigation/native";

import { AntDesign } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import axios from "axios";
const URL = '192.168.13.100'; // Rohan Wifi

const OrderDetails = ({route}) => {
  const { orderId } = route.params;
  const [data, setData] = useState([]);
  const isFocused = useIsFocused();

  useEffect(() => {
    // console.log(item);
    if (isFocused) {
    axios
      .get(`http://${URL}:8000/user/getPurchasedItems/${orderId}`)
      .then((response) => {
        console.log("OrderDetails : ",response.data.items);
        setData(response.data.items);
      })
      .catch((err) => {
        console.log("Error");
        
        console.log(err);
      });

    }
  }, [isFocused]);

  const orderDate = new Date(data.orderDate);
  const formattedDate = orderDate.toDateString();
console.log(data);
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.topBar}>
        <Entypo name="chevron-left" size={25} color="black" />
        <Text style={styles.topTxt}>Order Details</Text>
      </View>
      <ScrollView style={{ paddingHorizontal: 15, paddingVertical: 20 }}>
        <View style={styles.box}>
          <View style={styles.orderId}>
            <Text style={{ fontWeight: "bold", letterSpacing: 1 }}>
              Order ID :{" "}
            </Text>
            <Text>{data.quantity}</Text>
            <Text style={styles.status}>Delivered</Text>
          </View>
          <View style={styles.details}>
            <Text>
              <Text style={styles.headings}>Order Date : </Text>
              {formattedDate}
            </Text>
            <Text>
              <Text style={styles.headings}>Delivered Date : </Text>
              {formattedDate}
            </Text>
            <Text>
              <Text style={styles.headings}>Delivered At : </Text>123, ABC
              Residency, Thane
            </Text>
          </View>
          <View style={styles.orders}>
            {data.map((item)=>(

              <View style={styles.mainContainer}>
                <View style={styles.leftContainer}>
                  <Image
                    style={styles.productImage}
                    source={{
                      uri: "https://lp2.hm.com/hmgoepprod?set=format%5Bwebp%5D%2Cquality%5B79%5D%2Csource%5B%2F76%2F35%2F7635345bb9d4a9b7a34c30890447194f0d8928ac.jpg%5D%2Corigin%5Bdam%5D%2Ccategory%5B%5D%2Ctype%5BLOOKBOOK%5D%2Cres%5Bm%5D%2Chmver%5B1%5D&call=url%5Bfile%3A%2Fproduct%2Fmobilemain%5D",
                    }}
                  />
                </View>
                <View style={styles.rightContainer}>
                  <View style={styles.row}>
                    <View>
                      <Text style={styles.brandName}>{item.productName}</Text>
                      <Text style={styles.productName}>{item.brandName}</Text>
                    </View>
                  </View>
                  <Text style={styles.supplierName}>Sold by: ABC Retailer</Text>
                  <View style={styles.quantity}>
                    <Text
                      style={{
                        fontWeight: "bold",
                        fontSize: 15,
                        color: "rgba(0,0,0,0.5)",
                      }}
                    >
                      Qty :{" "}
                    </Text>
                    <Text
                      style={{
                        fontWeight: "500",
                        fontSize: 15,
                        color: "rgba(0,0,0,0.5)",
                      }}
                    >
                      {item.quantity}
                    </Text>
                  </View>
                  <View>
                    <Text style={styles.price}>₹{7000}</Text>
                  </View>
                </View>
              </View>
            ))
            }
              
            </View>
          </View>
      
      </ScrollView>
    </SafeAreaView>
  );
};

export default OrderDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
  },
  topBar: {
    display: "flex",
    flexDirection: "row",
    paddingHorizontal: 20,
    alignItems: "center",
    paddingVertical: 20,
    backgroundColor: "rgba(60,9,108,0.2)",
  },
  topTxt: {
    fontWeight: "500",
    fontSize: 20,
    padding: 10,
    letterSpacing: 1,
  },
  box: {
    backgroundColor: "rgba(0,0,0,0.1)",
    borderRadius: 25,
    paddingVertical: 15,
    paddingHorizontal:20
  },
  orderId: {
    display: "flex",
    flexDirection: "row",
    paddingBottom: 10,
alignItems:'center'
  },
  status: {
    backgroundColor: "#55B97D",
    paddingHorizontal: 10,
    paddingVertical: 2,
    borderRadius: 25,
    marginLeft: 10,
    letterSpacing: 1,
  },
  headings: {
    fontWeight: "500",
    letterSpacing: 1,
  },
  orders: {
    backgroundColor: "white",
    paddingHorizontal:10,
    paddingVertical:20,
    marginVertical:20,
    borderRadius:25
  },
  product: {
    display: "flex",
    flexDirection: "row",
  },

  mainContainer: {
    flex: 1,
    display: "flex",
    flexDirection: "row",
    paddingVertical: 10,
    paddingHorizontal: 20,
    gap: 20,
  },
  leftContainer: {
    flex: 1,
  },
  productImage: {
    height: "100%",
    width: "100%",
    borderRadius: 25,
    resizeMode: "contain",
  },
  rightContainer: {
    flex: 2,
  },
  row: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  brandName: {
    fontWeight: "900",
    fontSize: 15,
  },
  productName: {
    color: "rgba(0,0,0,0.5)",
    fontWeight: "400",
  },
  supplierName: {
    marginTop: 10,
    fontSize: 13,
    color: "rgba(0,0,0,0.3)",
  },
  quantity: {
    display: "flex",
    flexDirection: "row",
    marginBottom: 5,
  },
  price: {
    fontWeight: "900",
    fontSize: 16,
    letterSpacing: 1,
  },
});
