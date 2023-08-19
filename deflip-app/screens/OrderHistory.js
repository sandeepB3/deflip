import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { FlatList, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import OrderCard from '../components/OrderCard';
// const URL = '192.168.13.100'; // Rohan Wifi
const URL = '192.168.251.35'
// const URL = 'localhost'
import { useIsFocused, useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";
import { Entypo } from '@expo/vector-icons';

const OrderHistory = () => {
    const userInfo = useSelector((state) => state.user.info);
  const isFocused = useIsFocused();
  const [orders,setOrders] = useState([]);

    useEffect(()=>{
        if (isFocused) {
        axios.get(`http://${URL}:8000/user/getOrders/${userInfo.user_id}`)
        .then((response)=>{
            setOrders(response.data.orders);
        })
        .catch((err) => {
            console.log("Error");
            console.log(err);
        });
        // setOrders([...orders,{"orderDate": "2023-08-18T11:03:00.000Z", "orderID": 56, "total": 40000, "userID": "55"}])
        console.log("Orders in OrderHIstory Screen ssss : ", orders);
 } },[isFocused])

    return (
        <SafeAreaView style={styles.mainContainer}>
           <View style={styles.topBar}>
           <TouchableOpacity style={{paddingRight:15}} onPress={()=>navigation.goBack()}>
          <Entypo name="chevron-left" size={25} color="white"  />
        </TouchableOpacity>
        <Text style={styles.topTxt}>Order Details</Text>
      </View>
            <ScrollView >
                {orders.length>0?orders.map((order)=>(
                    <OrderCard key={order.orderID} item={order}/>
                ))
                :
                <Text>No orders</Text>
            }
                {/* <FlatList
                data={orders}
                numColumns={1}
                showsVerticalScrollIndicator={false}
                renderItem = {orderCard}
                keyExtractor={keyExtractor}
                >
                </FlatList> */}
            </ScrollView>
        </SafeAreaView>
    )
}

const styles=StyleSheet.create({
    mainContainer:{

    },
    topBar:{
        display: "flex",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(60,9,108,1)",
    padding: 20,
    width: "100%",
    },
    topTxt: {
        fontSize: 20,
        letterSpacing: 1,
        color: "white",
        fontWeight: "500",
  
    },
})
export default OrderHistory;