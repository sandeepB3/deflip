import AsyncStorage from "@react-native-async-storage/async-storage";
import { ToastAndroid } from "react-native";

export const addToCart = async (productData) => {
  // console.log("Prodcut data in passed : ", productData);
  try {
    const cartItems = await AsyncStorage.getItem("cartItems");
    let cartArray = cartItems ? JSON.parse(cartItems) : [];
// console.log("CartArray async : ",cartArray);
    let itemIndex=-1;
    for(let i=0;i<cartArray.length;i++ ){
      if(cartArray[i].id===productData.productID){
        itemIndex=i;
        break;
      }
    }
console.log("Item Index : ",itemIndex);
    if (itemIndex === -1) {
      // If the item doesn't exist in the cart, add it as a new entry
      cartArray.push({
        ...productData,
        quantity: 1,
      });
      console.log("pushed item : ", cartArray);
      ToastAndroid.show("Item Added Successfully to cart", ToastAndroid.SHORT);
    } else {
      // If the item already exists in the cart, increase its quantity
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
