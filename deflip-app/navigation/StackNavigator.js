import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import HomeScreen from '../screens/HomeScreen';
import BottomNavigator from './TabNavigator';
import CartScreen from '../screens/CartScreen';
import ProductList from '../screens/ProductList';
import OrderHistory from '../screens/OrderHistory';
import OrderDetails from '../screens/OrderDetails';
import ProductDetails from '../screens/ProductDetail';
import RedeemScreen from '../screens/RedeemScreen';
import UnlockCoupon from '../screens/UnlockedCoupon';
const StackNavigator = () => {
    const Stack = createNativeStackNavigator();
    return (
        <NavigationContainer>
            <Stack.Navigator>

                <Stack.Screen name="Login" component={LoginScreen} options={{headerShown: false}}/>
                <Stack.Screen name="Register" component={RegisterScreen} options={{headerShown: false}}/> 

                <Stack.Screen name="Main" component={BottomNavigator} options={{headerShown: false}}/>
                <Stack.Screen name="ProductList" component={ProductList} options={{headerShown: false}}/>
                <Stack.Screen name="Cart" component={CartScreen} options={{headerShown: false}} />
                <Stack.Screen name="ProductDetails" component={ProductDetails} options={{headerShown: false}}/>
                <Stack.Screen name="OrderHistory" component={OrderHistory} options={{headerShown: false}}/>
                <Stack.Screen name="OrderDetails" component={OrderDetails} options={{headerShown: false}} />
                <Stack.Screen name="Offers" component={RedeemScreen} options={{headerShown: false}} />
                <Stack.Screen name="UnlockedCoupons" component={UnlockCoupon} options={{headerShown: false}} />
                

            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default StackNavigator
