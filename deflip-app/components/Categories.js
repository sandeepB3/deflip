import React from "react";
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Image, Dimensions, ScrollView} from "react-native";
import categories from "../jsondata/category";
import { useNavigation } from "@react-navigation/native";

// const navigateToProductList = (category) => {
//   console.log("Mens : ", category);
//   navigation.navigate("ProductList", { cat: category });
// };

const CategoryItem = ({ category }) => {
  // console.log("Category object : ", category.category)
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      style={styles.categoryItem}
      onPress={() =>  navigation.navigate("ProductList", { cat: category.category })}
    >
      <Image source={category.image} style={styles.cardImage} />
      <Text style={styles.cardText}>{category.category}</Text>
    </TouchableOpacity>

  );
}

const Categories = () => {
  return (
    <View style={styles.mainContainer}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {categories.map((category) => (
          <CategoryItem
            key={category.id}
            category={category}
          />
        ))}
      </ScrollView>
    </View>
  );

};

const styles = StyleSheet.create({
  mainContainer: {
    display: "flex",
    flexDirection: "column",
    width: Dimensions.get("window").width,
    paddingHorizontal: 15,
  },
  categoryItem: {
    padding: 10,
  },
  cardImage: {
    borderRadius: 50,
    width: Dimensions.get("window").width / 6,
    height: Dimensions.get("window").width / 6,
    resizeMode: "contain",
  },
  cardText: {
    fontSize: 12,
    padding: 10,
    textAlign: "center",
    fontWeight: "bold",
  },
});

export default Categories;
