import React, { useState, useEffect } from "react";
import { View, Text, ScrollView, TouchableOpacity, Image, ToastAndroid,
  Modal,
  Animated,
  StyleSheet,
  TextInput,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import CartItem from "../components/CartItems";
import { AntDesign } from "@expo/vector-icons";
import axios from 'axios';
import { getDataFromDB } from "../localStorage/getFromCart";
import { SafeAreaView } from "react-native-safe-area-context";
const URL = 'localhost'

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




const CartScreen = () => {
  const [product, setProduct] = useState();
  const [total, setTotal] = useState(0);
  const [visible, setVisible] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);
  
  const navigation = useNavigation();

  const placeOrder = async() =>{
    const order= product.map(item => {
      return {
      userID:6,
        productID: item.productID,
        quantity: item.quantity
      };
    });
    console.log("Order:",product);
    await axios.post(`http://${URL}:8000/purchase/cart`,{
      items: order,
      total: total,
      userID: 38
    })
  }

  useEffect( () => {

     getDataFromDB()
    .then((productData)=>{
      setProduct(productData);
      getTotal(productData);
    })
    .catch((error)=>{
      console.log(error);
    });
    

  }, [navigation]);


  //get total price of all items in the cart
  const getTotal = async(productData) => {
    let totalCalc = 0;
    console.log(total);
    for (let index = 0; index < productData.length; index++) {
      let productPrice = productData[index].cost* productData[index].quantity;
      totalCalc = totalCalc + productPrice;
    }
    setTotal(totalCalc);
  };

  //remove data from Cart

  const removeItemFromCart = async (id) => {
    let itemArray = await AsyncStorage.getItem("cartItems");
    itemArray = JSON.parse(itemArray);
    if (itemArray) {
      let array = itemArray;
      for (let index = 0; index < array.length; index++) {
        if (array[index] == id) {
          array.splice(index, 1);
        }

        await AsyncStorage.setItem("cartItems", JSON.stringify(array));
        getDataFromDB();
      }
    }
  };

  const checkOut = async () => {
    try {
      placeOrder();
      // await AsyncStorage.removeItem("cartItems");
      setVisible(true);
      setModalVisible(true); // Show the modal
      Animated.timing(opacityValue, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      });
      // .start();
      // setTimeout(() => {
      //   setModalVisible(false); // Hide the modal
      //   Animated.timing(opacityValue, {
      //     toValue: 0,
      //     duration: 300,
      //     useNativeDriver: true,
      //   }).start(() => {
      //     navigation.navigate('Home'); // Navigate to home screen
      //   });
      // }, 5000); // Wait for 5 seconds before navigating
    } catch (error) {
      return error;
    }
  };

  //checkout

  // const checkOut = async () => {

  // try {
  //   await AsyncStorage.removeItem('cartItems');
  //   setVisible(true);
  // } catch (error) {
  //   return error;
  // }

  // ToastAndroid.show('Items will be Deliverd SOON!', ToastAndroid.SHORT);

  // navigation.navigate('Home');
  // };

 

  const renderProducts = (data) => {
    // console.log("RenderData : ",data);
    return (
      <View>
        {/* {data.map((dat) => { */}
          <CartItem key={data.id} data={data}></CartItem>;
        {/* })} */}
      </View>
    );
  };

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
            onPress={() => navigation.goBack()}
          >
            <AntDesign name="arrowleft" color="black" size={25}></AntDesign>
          </TouchableOpacity>
          <Text style={styles.topName}>Cart</Text>
        </View>
      </View>
      <View style={styles.pinCode}>
        <Text style={styles.pin}>
          <Text style={{ fontWeight: "bold" }}>PinCode : </Text>
          400602
        </Text>
      </View>

      <ScrollView>
        <View style={{ paddingHorizontal: 16 }}>
          {/* {console.log("Productssss: ",product)} */}
          {product ? (
            product.map((data)=>(
              <CartItem key={data.id} data={data}/>
            ))  
          ) : (
            <Text>No Products in Cart</Text>
          )}
        </View>
        {/* <CartItem />
        <CartItem />
        <CartItem />
        <CartItem /> */}

        <View
          style={{
            paddingHorizontal: 16,
            marginTop: 6,
          }}
        >
          <View style={styles.couponTop}>
            <Text style={styles.sectionHeading}>Coupons</Text>
            <TouchableOpacity onPress={() => {}}>
              <Text style={styles.viewAll}>View All</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.box}>
            <Text style={styles.heading}>Enter Coupon Code</Text>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-around",
              }}
            >
              <TextInput style={styles.coupontxt} placeholder="COUPON CODE" />
              <TouchableOpacity style={styles.applyBtn}>
                <Text style={styles.applyBtnTxt}>Apply</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.billingTop}>
            <Text style={styles.sectionHeading}>Billing Details</Text>
          </View>

          <View style={[styles.box, { marginBottom: 20 }]}>
            <Text style={{ paddingLeft: 10, fontWeight: "bold" }}> PRICE</Text>
            <View style={styles.row}>
              <Text style={styles.tag}> Total Price</Text>
              <Text style={styles.amount}> ₹{7000}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.tag}> Total Discount</Text>
              <Text style={styles.amount}> ₹{500}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.tag}> Total Tax</Text>
              <Text style={styles.amount}> ₹{100}</Text>
            </View>
            <View style={styles.hr}></View>
            <View style={styles.row}>
              <Text style={[styles.tag, { fontWeight: "bold" }]}>
                {" "}
                Total Amount
              </Text>
              <Text style={styles.amount}> ₹{total}</Text>
            </View>
          </View>
        </View>
      </ScrollView>

      <View
        style={{
          bottom: 10,
          height: "8%",
          width: "100%",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <TouchableOpacity
          onPress={() => (total != 0 ? checkOut() : null)}
          style={styles.checkoutBtn}
        >
          <Text style={styles.checkoutBtnTxt}>
            PLACE ORDER ₹{total} 
          </Text>
        </TouchableOpacity>
      </View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={orderPlaced}
        onRequestClose={() => {
          setOrderPlaced(false);
        }}
      >
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
          }}
        >
          <View
            style={{ backgroundColor: "white", padding: 20, borderRadius: 10 }}
          >
            <Text>Your order has been placed!</Text>
            <Text>You will be redirected to the home screen shortly.</Text>
          </View>
        </View>
      </Modal>
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
  couponTop: {
    display: "flex",
    flexDirection: "row",
    padding: 10,
    justifyContent: "space-between",
  },
  sectionHeading: {
    fontSize: 14,
    fontWeight: "500",
    color: "gray",
    letterSpacing: 1,
  },
  viewAll: {
    color: "#3C096C",
    fontWeight: "500",
  },

  box: {
    backgroundColor: "#F1F1F1",
    borderRadius: 25,
    paddingHorizontal: 10,
    paddingVertical: 15,
  },
  heading: {
    fontSize: 15,
    fontWeight: "500",
    paddingHorizontal: 20,
    paddingBottom: 10,
    letterSpacing: 1,
  },
  coupontxt: {
    flex: 4,
    backgroundColor: "white",
    paddingVertical: 5,
    paddingHorizontal: 10,
    marginHorizontal: 20,
    borderRadius: 25,
    fontSize: 13,
  },
  applyBtn: {
    flex: 2,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#3C096C",
    borderRadius: 25,
    marginRight: 10,
  },
  applyBtnTxt: {
    fontSize: 13,
    color: "white",
    fontWeight: "900",
    letterSpacing: 1,
  },
  billingTop: {
    marginTop: 10,
    padding: 10,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 10,
  },
  tag: {
    fontWeight: "400",
  },
  amount: {
    fontWeight: "800",
  },
  hr: {
    marginTop: 10,
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.3)",
    marginBottom: 10,
  },
  checkoutBtn: {
    width: "86%",
    height: "90%",
    backgroundColor: "#3C096C",
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  checkoutBtnTxt: {
    fontSize: 14,
    fontWeight: "500",
    letterSpacing: 1,
    color: COLOURS.white,
    textTransform: "uppercase",
  },
  pinCode: {
    paddingLeft: 30,
    backgroundColor: "rgba(157,78,221,0.2)",
    paddingVertical: 10,
  },
  pin: {
    letterSpacing: 1,
  },
});

export default CartScreen;
