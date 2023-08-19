import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
  import { Ionicons } from "@expo/vector-icons";


const CartItem = ({ data }) => {
  return (
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
            <Text style={styles.brandName}>{data.brand}</Text>
            <Text style={styles.productName}>{data.productName}</Text>
          </View>
          <View>
            <Ionicons name="trash-outline" size={30} color="black" />
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
            {data.quantity}
          </Text>
        </View>
        <View>
          <Text style={styles.price}>₹{data.productPrice}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
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
    maxWidth: "90%",
  },
  productName: {
    color: "rgba(0,0,0,0.5)",
    fontWeight: "400",
    maxWidth: "90%",
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
export default CartItem;
