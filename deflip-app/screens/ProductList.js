import {
  View,
  Text,
  FlatList,
  Image,
  TextInput,
  TouchableOpacity,
  Modal,
  StyleSheet,
  ScrollView,
  Dimensions,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import ProductCard from "../components/ProductCard";
import SearchBar from "../components/Searchbar";
import axios from "axios";
import { SafeAreaView } from "react-native-safe-area-context";

const URL = '192.168.13.100'; // Rohan Wifi
// const URL = '192.168.205.18'
// const URL = 'localhost'
const ProductList = ( {route} ) => {

  const { cat } = route.params;

  const [data, setData] = useState([]);
  const [oldData, setOldData] = useState([]);
  const [selectedFilter, setSelectedFilter] = useState(0);
  const [visible, setVisible] = useState(false);
  const searchRef = useRef();

  useEffect(() => {
    console.log("Passed Category: ", cat);
    axios
      .get(`http://${URL}:8000/product/${cat}`)
      .then((response) => {
        console.log(response.data.products);
        setData(response.data.products);
        setOldData(response);
      })
      .catch((err) => {
        console.log("Error");
        
        console.log(err);
      });
  }, []);

  const handlePressFilter = () => {
    setVisible(true);
  };
  
  const handlePressSearch = () => {};

  const searchFilterFunction = (text) => {
    // if (text !== '') {
    //   let tempData = data.filter(item => {
    //     return item.title.toLowerCase().indexOf(text.toLowerCase()) > -1;
    //   });
    //   setData(tempData);
    // } else {
    //   setData(oldData);
    // }
  };

  const keyExtractor = (item) => item.id;

  const renderCard = ({ item }) => <ProductCard item={item}  />;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.body}>
        <ScrollView
          vertical={true}
          contentContainerStyle={{ width: Dimensions.get("window").width }}
        >
          <SearchBar
            bgColor="#3C096C"
            cartColor="#ffffff"
            searchbgColor="#9634EE"
          />

          <View style={styles.filterBar}>
            <Text style={styles.itemFound}>
              <Text style={{ fontWeight: "800" }}>{20}</Text> items found
            </Text>
            <TouchableOpacity style={styles.filter} onPress={handlePressFilter}>
              <Text>Filter</Text>
            </TouchableOpacity>
          </View>
          {/* <SearchBar onPressFilter={handlePressFilter} onPressSearch={handlePressSearch}></SearchBar> */}

          <FlatList
            data={data}
            numColumns={2}
            showsVerticalScrollIndicator={false}
            renderItem={renderCard}
            keyExtractor={keyExtractor}
          />

          <Modal
            animationType="slide"
            transparent={true}
            visible={visible}
            onRequestClose={() => {
              setVisible(!visible);
            }}
          >
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "rgba(0,0,0,.5)",
              }}
            >
              <View
                style={{
                  width: "80%",
                  height: 200,
                  borderRadius: 10,
                  backgroundColor: "#fff",
                }}
              >
                <TouchableOpacity
                  style={{
                    width: "100%",
                    height: 50,
                    borderBottomWidth: 0.5,
                    justifyContent: "center",
                    paddingLeft: 20,
                  }}
                  onPress={() => {
                    setSelectedFilter(1);
                    const strAscending = data.sort((a, b) =>
                      a.produc > b.title ? 1 : -1
                    );
                    setData(strAscending);
                    setVisible(false);
                  }}
                >
                  <Text style={{ fontSize: 18, color: "#000" }}>
                    {" "}
                    Sort By Name
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{
                    width: "100%",
                    height: 50,
                    borderBottomWidth: 0.5,
                    justifyContent: "center",
                    paddingLeft: 20,
                  }}
                  onPress={() => {
                    setSelectedFilter(2);
                    setData(data.sort((a, b) => a.cost - b.cost));
                    setVisible(false);
                  }}
                >
                  <Text style={{ fontSize: 18, color: "#000" }}>
                    Low to High Price
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{
                    width: "100%",
                    height: 50,
                    borderBottomWidth: 0.5,
                    justifyContent: "center",
                    paddingLeft: 20,
                  }}
                  onPress={() => {
                    setSelectedFilter(3);
                    setData(data.sort((a, b) => b.cost - a.cost));
                    setVisible(false);
                  }}
                >
                  <Text style={{ fontSize: 18, color: "#000" }}>
                    Hight to Low Price
                  </Text>
                </TouchableOpacity>
                {/* <TouchableOpacity
                  style={{
                    width: "100%",
                    height: 50,
                    borderBottomWidth: 0.5,
                    justifyContent: "center",
                    paddingLeft: 20,
                  }}
                  onPress={() => {
                    setSelectedFilter(4);
                    setData(data.sort((a, b) => a.rating.rate - b.rating.rate));
                    setVisible(false);
                  }}
                >
                  <Text style={{ fontSize: 18, color: "#000" }}>
                    {" "}
                    Sort By Rating
                  </Text>
                </TouchableOpacity> */}
              </View>
            </View>
          </Modal>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    width: "100%",
  },
  body: {
    paddingBottom: 20,
    width: "100%",
  },
  filterBar: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingBottom: 20,
  },
  filter: {
    backgroundColor: "lightgray",
    paddingHorizontal: 20,
    paddingVertical: 5,
    marginRight: 30,
    borderRadius: 25,
  },
  itemFound: {
    marginLeft: 20,
  },
});

export default ProductList;
