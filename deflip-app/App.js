import React, { useEffect, useState } from "react";
import { Text, AsyncStorage } from "react-native";
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

export default App = () => {
  // const [appIsReady, setAppIsReady] = useState(false);

  return (
    // <SafeAreaView>
    //   {/* <Provider store={store} > */}
    //     {/* <Layout /> */}
    //     <RedeemScreen/>
    //   {/* </Provider> */}
    // </SafeAreaView>

    // <ProductDetails></ProductDetails>
    <>
    <StatusBar hidden backgroundColor="white" />
    {/* <ProductDetails/> */}
    <CartScreen/>
    </>
  );

}
