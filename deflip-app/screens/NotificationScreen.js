import React, { useState } from 'react';
import { StyleSheet,Dimensions,Image, Text, SafeAreaView } from 'react-native';


const NotificationScreen = () => {
    return (
        <SafeAreaView style={styles.container}>
            <Image style={styles.image} source={require('../assets/notification.jpg')}/>
            <Text style={styles.noNoti}>No Notification Yet</Text>
            <Text style={styles.noNoti}>Simply browse, create a wishlist or make a purchase</Text>

        </SafeAreaView>
    );
}

export default NotificationScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent:'center'
    },
    image:{
        height:Dimensions.get('window').height/3,
        width:Dimensions.get('window').width,
        

    },
    noNoti: {
        fontSize: 25,
        fontWeight:'bold',
        paddingVertical:10
    }
})