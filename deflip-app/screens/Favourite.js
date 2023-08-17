import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  ToastAndroid,
  Modal,
  Animated,
  StyleSheet,
  TextInput,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SafeAreaView } from "react-native-safe-area-context";
import CartItem from "../components/CartItems";
import { AntDesign } from "@expo/vector-icons";

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

const FavouriteScreen = () => {
  return (
    <SafeAreaView
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
            <AntDesign name="heart" color="#3C096C" size={25}></AntDesign>
          </TouchableOpacity>
          <Text style={styles.topName}>WISHLIST</Text>
        </View>
      </View>

      <ScrollView>
        {/* <View style={{ paddingHorizontal: 16 }}>
              {product ? (
                product.map(renderProducts)
              ) : (
                <Text>No Products in Cart</Text>
              )}
            </View> */}
        <CartItem />
        <CartItem />
        <CartItem />
        <CartItem />
        <CartItem />
        <CartItem />
        <CartItem />
        <CartItem />

      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
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
  
  
  
});

export default FavouriteScreen;
