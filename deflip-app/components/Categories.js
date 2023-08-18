import React from "react";
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Image, Dimensions, ScrollView } from "react-native";

import categories from '../jsondata/category'



  const CategoryItem = ({ category, onPressCategory }) => (
    <TouchableOpacity
      style={styles.categoryItem}
      onPress={() => onPressCategory(category.category)}
    >
      <Image source={ category.image } style={styles.cardImage} />
      <Text style={styles.cardText}>{category.category}</Text>
    </TouchableOpacity>
  );



const Categories = ({  onPressCategory }) => {

    return (
        <View style={styles.mainContainer}>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {categories.map((category) => (
                    <CategoryItem key={category.id} category={category} onPressCategory={onPressCategory} />
                ))}
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
   mainContainer:{
    display:'flex',
    flexDirection:'column',
    width:Dimensions.get('window').width,
    paddingHorizontal:15
   },
  categoryItem:{
    padding: 10,
  },
  cardImage: {
    borderRadius:50,
    width:Dimensions.get('window').width/6,
    height: Dimensions.get('window').width/6,
    resizeMode:'contain'
  },
  cardText: {
    fontSize:12,
    padding: 10,
    textAlign: 'center',
    fontWeight: 'bold',
  },
});

export default Categories;
