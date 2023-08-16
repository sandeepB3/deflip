import React, { useState } from 'react';
import { Dimensions, Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import {grandGlobalBrands as brands} from '../jsondata/brand';

const GlobalBrands = () => {
    return (
        <View style={styles.mainContainer}>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} >
            {brands.map((brand, index) => (
                <Image
                key={index}
                source={brand}
                style={styles.image}
                />
            ))}
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    mainContainer:{
        marginVertical:20
    },
    image:{
        height:Dimensions.get("window").height/4,
        width:Dimensions.get("window").width/3,
        marginHorizontal:10,
        borderRadius:25
    }
})


export default GlobalBrands;