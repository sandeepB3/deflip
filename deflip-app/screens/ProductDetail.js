import React, { useState, useEffect } from "react";
import {
  Dimensions,
  FlatList,
  Image,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  ToastAndroid,
  TouchableOpacity,
  View,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import Entypo from "react-native-vector-icons/Entypo";
import Icon from "react-native-vector-icons/FontAwesome";
import Ionicons from "react-native-vector-icons/Ionicons";
import { AntDesign } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { addToCart } from "../localStorage/addToCart";

const COLOURS = {
  white: "#ffffff",
  black: "#000000",
  green: "#00AC76",
  red: "#C04345",
  blue: "#0043F9",
  backgroundLight: "#F0F0F3",
  backgroundMedium: "#B9B9B9",
  backgroundDark: "#777777",
};

// const addToCart = async id => {
//   let itemArray = await AsyncStorage.getItem('cartItems');
//   itemArray = JSON.parse(itemArray);
//   if (itemArray) {
//     let array = itemArray;
//     array.push(id);

//     try {
//       await AsyncStorage.setItem('cartItems', JSON.stringify(array));
//       ToastAndroid.show(
//         'Item Added Successfully to cart',
//         ToastAndroid.SHORT,
//       );
//       // navigation.navigate('Home');
//     } catch (error) {
//       return error;
//     }
//   } else {
//     let array = [];
//     array.push(id);
//     try {
//       await AsyncStorage.setItem('cartItems', JSON.stringify(array));
//       ToastAndroid.show(
//         'Item Added Successfully to cart',
//         ToastAndroid.SHORT,
//       );
//       // navigation.navigate('Home');
//     } catch (error) {
//       return error;
//     }
//   }
// };

const ProductDetails = () => {
  const [item, setItem] = useState({
    id: 3,
    brand: "Clavin Klien",
    productName: "Mens Straight Fit Pants",
    description:
      "Lorem ipsum dolor sit amet. Qui galisum suscipit ut odio dolores quo assumenda delectus eum voluptas natus et veritatis dolor non libero mollitia! Sit necessitatibus asperiores ea obcaecati iure est rerum dolorem est quia molestias.",
    productPrice: 200,
    quantity: 20,
  });

  const addToFavourite = async () => {
    try {
      const cartItems = await AsyncStorage.getItem("FavItems");
      let cartArray = cartItems ? JSON.parse(cartItems) : [];

      // Check if the item is already in the cart
      if (!cartArray.includes(item.id)) {
        cartArray.push(item.id);

        await AsyncStorage.setItem("FavItems", JSON.stringify(cartArray));

        ToastAndroid.show(
          "Item Added Successfully to Wishlist",
          ToastAndroid.SHORT
        );
      } else {
        ToastAndroid.show("Item already in Wishlist", ToastAndroid.SHORT);
      }

      console.log(cartItems);
    } catch (error) {
      console.error("Error adding to Wishlist:", error);
    }
  };

  return (
    <View
      style={{
        width: "100%",
        height: "100%",
        backgroundColor: COLOURS.white,
        position: "relative",
      }}
    >
      <View style={styles.topbar}>
        <View style={styles.topLeft}>
          <TouchableOpacity
            style={styles.back}
            onPress={() => navigation.goBack("Home")}
          >
            <AntDesign name="arrowleft" color="white" size={25}></AntDesign>
          </TouchableOpacity>
          <Text style={styles.topName}>Item Name</Text>
        </View>

        <View style={styles.topRight}>
          <Icon name="shopping-cart" size={30} color="#3C096C" />
        </View>
      </View>

      <ScrollView>
        <View
          style={{
            width: "100%",
            backgroundColor: COLOURS.backgroundLight,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Image
            style={{
              width: "100%",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",

              height: Dimensions.get("window").height / 2,
              resizeMode: "cover",
            }}
            source={require("../assets/category/men.jpg")}
          />
        </View>
        <View
          style={{
            paddingHorizontal: 16,
            marginTop: 6,
          }}
        >
          <View style={styles.topSection}>
            <Text style={styles.itemBrand}>{item.brand}</Text>
            {/* <View style={{ flexDirection: "row" }}>
              <TouchableOpacity>
                <Text>-</Text>
              </TouchableOpacity>
              <View>
                <Text>{2}</Text>
              </View>
              <TouchableOpacity>
                <Text>+</Text>
              </TouchableOpacity>
            </View> */}
          </View>

          <Text style={styles.itemName}>{item.productName}</Text>

          <Text style={styles.itemPrice}>₹{7000}</Text>

          <View style={styles.box}>
            <Text style={styles.check}>CHECK DELIVERY AND SERVICES</Text>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <TextInput
                style={styles.pincode}
                keyboardType="number-pad"
                placeholder="Enter a pincode"
              />
              <Text
                onPress={() => {
                  AsyncStorage.clear();
                  ToastAndroid.show("Async Storaqge Cleared", ToastAndroid.SHORT);
                }}
                style={styles.checkbtn}
              >
                CHECK
              </Text>
            </View>
            <Text style={styles.misc}>
              Please enter PIN code to check delivery time & Pay on Delivery
              Availability
            </Text>
            <Text style={styles.locMisc}>
              Pay on Delivery migh be avialable
            </Text>
            <Text style={styles.locMisc}>
              Easy 14 days returns and exchanges
            </Text>
            {/* <MaterialCommunityIcons name="truck-delivery-outline" size={24} color="black" /> */}
          </View>

          <View style={styles.box}>
            <View style={{ display: "flex", flexDirection: "row" }}>
              <Text style={{ fontWeight: "500" }}>CARD OFFERS </Text>
              <MaterialIcons name="local-offer" size={24} color="black" />
            </View>
            <View style={styles.offer}>
              <Text style={styles.bankOffer}>
                {" "}
                ● 7.5% Instant Discount on Myntra Kotak Credit Card.
              </Text>
              <Text style={styles.bankOfferCond}>
                Max Discount Up to ₹750 on every spends.
              </Text>
            </View>
            <View style={styles.offer}>
              <Text style={styles.bankOffer}>
                {" "}
                ● 10.5% Instant Discount on Myntra ICICI Credit Card.
              </Text>
              <Text style={styles.bankOfferCond}>
                Max Discount Up to ₹750 on every spends.
              </Text>
            </View>
            <View style={styles.offer}>
              <Text style={styles.bankOffer}>
                {" "}
                ● 17.5% Instant Discount on Myntra HDFC Credit Card.
              </Text>
              <Text style={styles.bankOfferCond}>
                Max Discount Up to ₹750 on every spends.
              </Text>
            </View>
          </View>

          <View style={[styles.box, { marginBottom: 20 }]}>
            <Text>
              <Text style={{ fontWeight: "bold" }}> Best Price : </Text>{" "}
              <Text style={{ color: "#FF7C7C", fontWeight: 600 }}>₹{7000}</Text>
            </Text>
            <Text style={styles.itemDescription}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident,
              sunt in culpa qui officia deserunt mollit anim id est laborum.
            </Text>
          </View>
        </View>
      </ScrollView>

      <View style={styles.bottom}>
        <TouchableOpacity
          style={styles.addFavbtn}
          onPress={() => (item.quantity > 0 ? addToFavourite(item.id) : null)}
        >
          <AntDesign name="hearto" size={24} color="white" />
          <Text style={styles.addText}>Wishlist</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.addCartbtn}
          onPress={() => (item.quantity > 0 ? addToCart(item) : null)}
        >
          <AntDesign name="shoppingcart" size={24} color="white" />
          <Text style={styles.addText}>
            {item.quantity > 0 ? "Add to cart" : "Not Avialable"}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  topbar: {
    display: "flex",
    paddingVertical: 10,
    flexDirection: "row",
    backgroundColor: "#3C096C",
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
    color: "white",
    letterSpacing: 2,
  },
  topRight: {
    borderRadius: 20,
    backgroundColor: "white",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: 5,
  },
  topSection: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  itemBrand: {
    fontSize: 20,
    fontWeight: "600",
    letterSpacing: 1,
    maxWidth: "84%",
  },
  itemName: {
    fontSize: 13,
    color: COLOURS.black,
    fontWeight: "400",
    letterSpacing: 1,
    opacity: 0.5,
    maxWidth: "85%",
    maxHeight: 44,
    marginBottom: 10,
  },
  itemPrice: {
    fontSize: 20,
    fontWeight: "bold",
  },
  box: {
    marginTop: 20,
    backgroundColor: "#F1F1F1",
    borderRadius: 25,
    paddingHorizontal: 10,
    paddingVertical: 15,
  },
  check: {
    fontSize: 13,
    fontWeight: "600",
    paddingBottom: 20,
    letterSpacing: 1,
    paddingHorizontal: 10,
  },
  pincode: {
    backgroundColor: "white",
    borderTopLeftRadius: 50,
    borderBottomLeftRadius: 50,
    paddingHorizontal: 10,
    paddingVertical: 5,
    flex: 3,
  },
  checkbtn: {
    flex: 1,
    borderTopRightRadius: 50,
    borderBottomRightRadius: 50,
    backgroundColor: "#3C096C",
    height: "100%",
    textAlign: "center",
    textAlignVertical: "center",
    color: "white",
  },
  misc: {
    fontSize: 12,
    paddingHorizontal: 5,
    paddingVertical: 10,
  },
  locMisc: {
    paddingHorizontal: 5,
    color: "#A1A1A1",
  },
  bankOffer: {
    fontWeight: "500",
    fontSize: 13,
  },
  bankOfferCond: {
    fontSize: 12,
    color: "gray",
  },
  offer: {
    paddingVertical: 5,
  },
  itemDescription: {
    color: "gray",
  },
  bottom: {
    height: Dimensions.get("window").height / 15,
    width: "100%",
    display: "flex",
    flexDirection: "row",
  },
  addCartbtn: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    display: "flex",
    flexDirection: "row",
    backgroundColor: "black",
  },
  addText: {
    fontWeight: "bold",
    color: "white",
    paddingLeft: 10,
  },
  addFavbtn: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    display: "flex",
    flexDirection: "row",
    backgroundColor: "#5A189A",
  },
});

export default ProductDetails;
