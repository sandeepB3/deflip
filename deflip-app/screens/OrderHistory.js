import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
// const URL = '192.168.13.201'; // Rohan Wifi
const URL = '192.168.205.18'
// const URL = 'localhost'

const OrderHistory = () => {

    const [orders,setOrders] = useState([]);

    useEffect(()=>{
        axios.get(`http://${URL}:8000/product/getorders/31`)
        .then((response)=>{
            console.log("Orders in OrderHIstory Screen : ", response.data);
            // setOrders(response.data)
        })
        .catch((err) => {
            console.log("Error");
            
            console.log(err);
          });
    })

    return (
        <SafeAreaView style={styles.mainContainer}>
            <View>
                <Text>Order History</Text>
            </View>
            <View style={styles.container}>
                
            </View>
        </SafeAreaView>
    )
}

const styles=StyleSheet.create({
    mainContainer:{

    }
})
export default OrderHistory;