import React, { useEffect, useState } from "react";
import { Text, AsyncStorage, StyleSheet } from "react-native";
import { Provider } from "react-redux";
import { SafeAreaView } from "react-native-safe-area-context";
import Layout from "./screens/Layout.js";
import WelcomeScreen from "./screens/WelcomeScreen.js";
import HomeScreen from "./screens/HomeScreen.js";
import RedeemScreen from "./screens/RedeemScreen.js";
import ProductList from "./screens/ProductList.js";
import ProductDetails from "./screens/ProductDetail.js";
import CartScreen from "./screens/CartScreen.js";
import { StatusBar } from "expo-status-bar";
import LoginScreen from "./screens/LoginScreen.js";
import RegisterScreen from "./screens/RegisterScreen.js";
import TransactionScreen from "./screens/TransactionScreen.js";
import FavouriteScreen from "./screens/Favourite.js";
import StackNavigator from "./navigation/StackNavigator.js";

export default App = () => {
  return (
    <>
      <StackNavigator />
    </>
  );

}

