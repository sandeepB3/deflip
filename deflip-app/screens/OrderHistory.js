import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { FlatList, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import OrderCard from '../components/OrderCard';
const URL = '192.168.13.100'; // Rohan Wifi
// const URL = '192.168.205.18'
// const URL = 'localhost'

const OrderHistory = () => {

    const [orders,setOrders] = useState([]);

    useEffect(()=>{
        axios.get(`http://${URL}:8000/user/getOrders/38`)
        .then((response)=>{
            setOrders(response.data.orders);
        })
        .catch((err) => {
            console.log("Error");
            console.log(err);
        });
        // setOrders([...orders,{"orderDate": "2023-08-18T11:03:00.000Z", "orderID": 56, "total": 40000, "userID": "55"}])
        console.log("Orders in OrderHIstory Screen ssss : ", orders);
    },[])

    return (
        <SafeAreaView style={styles.mainContainer}>
            <View>
                <Text>Order History</Text>
            </View>
            <ScrollView style={styles.container}>
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

    }
})
export default OrderHistory;