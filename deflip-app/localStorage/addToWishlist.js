import AsyncStorage from "@react-native-async-storage/async-storage";
import { ToastAndroid } from "react-native";

export const addToWishlist = async (productData) => {
  try {
    const wishlistItems = await AsyncStorage.getItem("wishlistItems");
    let wishlistArray = wishlistItems ? JSON.parse(wishlistItems) : [];

    const itemIndex = wishlistArray.findIndex(item => item.id === productData.id);
    
    if (itemIndex === -1) {
      wishlistArray.push({
        ...productData,
        quantity: 1,
      });
    }
    await AsyncStorage.setItem("wishlistItems", JSON.stringify(wishlistArray));

    if (itemIndex === -1) {
      ToastAndroid.show("Item Added Successfully to wishlist", ToastAndroid.SHORT);
    } else {
      ToastAndroid.show("Item Already Present in wishlist", ToastAndroid.SHORT);
    }
  } catch (error) {
    console.error("Error adding to wishlist:", error);
  }
};

