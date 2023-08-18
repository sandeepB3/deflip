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
                

            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default StackNavigator
