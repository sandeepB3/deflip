import AsyncStorage from "@react-native-async-storage/async-storage";

export const getDataFromDB = async () => {
    let items = await AsyncStorage.getItem("cartItems");
    // console.log("Items in Async Storage : ", items);
    items = JSON.parse(items);
    // console.log("Parsed Items : ", items);

    let productData = [];
    if (items) {
      items.forEach((data) => {
        console.log("item", data);
        productData.push(data);
      });
    //   console.log("Product Data : ", productData);
      return productData;
    //   setProduct(productData);
    //   getTotal(productData);
    //   console.log("Product  : ", productData);
    } else {
      setProduct(false);
      getTotal(false);
    }
  };