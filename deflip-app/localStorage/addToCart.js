import AsyncStorage from "@react-native-async-storage/async-storage";
import { ToastAndroid } from "react-native";

export const addToCart = async (productData) => {
  try {
    const cartItems = await AsyncStorage.getItem("cartItems");
    let cartArray = cartItems ? JSON.parse(cartItems) : [];
    let itemIndex=-1;
    for(let i=0;i<cartArray.length;i++ ){
      if(cartArray[i].id===productData.productID){
        itemIndex=i;
        break;
      }
    }
    if (itemIndex === -1) {
      cartArray.push({
        ...productData,
        quantity: 1,
      });
      ToastAndroid.show("Item Added Successfully to cart", ToastAndroid.SHORT);
    } else {
      cartArray[itemIndex] = {
        ...cartArray[itemIndex],
        quantity: cartArray[itemIndex].quantity + 1,
      };

      ToastAndroid.show("Item quantity increased in cart", ToastAndroid.SHORT);
    }

    await AsyncStorage.setItem("cartItems", JSON.stringify(cartArray));
  } catch (error) {
    console.error("Error adding to cart:", error);
  }
};
