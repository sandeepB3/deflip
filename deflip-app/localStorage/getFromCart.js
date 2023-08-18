import AsyncStorage from "@react-native-async-storage/async-storage";

export const getDataFromDB = async () => {
  let items = await AsyncStorage.getItem("cartItems");
  items = JSON.parse(items);

  let productData = [];
  if (items) {
    items.forEach((data) => {
      productData.push(data);
    });
    return productData;
  
  } else {
    setProduct(false);
    getTotal(false);
  }
};