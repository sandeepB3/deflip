import React, { useState } from 'react';
import { Dimensions, Image, StyleSheet, Text, View } from 'react-native';


const   ProductCard = ({item}) => {
    return (
        <View style={styles.mainContainer}>
            <Image style={styles.pImage} source={{ uri : item.image}}/>
            <View style={styles.textContainer}>
                <Text style={styles.brand}>{item.title.substr(0,20)}</Text>
                {/* brands dalna hai */}
                <Text style={styles.description}>{item.description.substr(0,20)}</Text>
                <Text style={styles.price}>₹{item.price}</Text>
            </View>
        </View>
    )
}


const styles = StyleSheet.create({
    mainContainer:{
       backgroundColor:'white',
       flex:1,    
       paddingHorizontal:12,
       paddingBottom:20
    },
    textContainer:{
        paddingTop:10
    },
    pImage:{
        height:Dimensions.get('window').height/4,
        resizeMode:'contain',
        borderWidth:10,
        borderRadius:25
    },
    brand:{
        fontWeight:'400',
        fontSize:15,
        letterSpacing:1
    },
    description:{
        fontSize:13,
        color:'#9D9D9D',
        letterSpacing:0.5
    },
    price:{
        fontWeight:'900',
        fontSize:16
    }

})

export default ProductCard;