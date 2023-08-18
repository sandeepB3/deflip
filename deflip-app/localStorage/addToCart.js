import AsyncStorage from "@react-native-async-storage/async-storage";
import { ToastAndroid } from "react-native";

export const addToCart = async (productData) => {
  try {
    const cartItems = await AsyncStorage.getItem("cartItems");
    let cartArray = cartItems ? JSON.parse(cartItems) : [];

    const itemIndex = cartArray.findIndex(item => item.id === productData.id);
    
    if (itemIndex === -1) {
      cartArray.push({
        ...productData,
        quantity: 1,
      });
    } else {
      cartArray[itemIndex] = {
        ...cartArray[itemIndex],
        quantity: cartArray[itemIndex].quantity + 1,
      };
    }

    await AsyncStorage.setItem("cartItems", JSON.stringify(cartArray));

    if (itemIndex === -1) {
      ToastAndroid.show("Item Added Successfully to cart", ToastAndroid.SHORT);
    } else {
      ToastAndroid.show("Item quantity increased in cart", ToastAndroid.SHORT);
    }
  } catch (error) {
    console.error("Error adding to cart:", error);
  }
};

